import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../config/env";
import userRepository from "../repositories/userRepository";
import userService from "./userService";

jest.mock("../repositories/userRepository");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
const mockRepo = userRepository as jest.Mocked<typeof userRepository>;
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
const mockJwt = jwt as jest.Mocked<typeof jwt>;
const now = new Date();

const user = {
  id: 1,
  nickName: "닉네임",
  email: "example@email.com",
  encryptedpassword: "hashedpassword",
  refreshToken: "storedRefreshToken",
  image: "example.com",
  provider: null,
  providerId: null,
  createdAt: now,
  updatedAt: now,
};

function expectSensitiveFieldsStripped(result: object) {
  expect(result).not.toHaveProperty("encryptedpassword");
  expect(result).not.toHaveProperty("refreshToken");
}

test("회원가입 테스트", async () => {
  mockRepo.findByEmail.mockResolvedValue(null);
  mockBcrypt.hash.mockResolvedValue("hashedpassword" as never);
  mockRepo.save.mockResolvedValue({ ...user, refreshToken: null });

  const result = await userService.createUser({
    email: "example@email.com",
    nickName: "닉네임",
    encryptedpassword: "plainpassword",
  });

  expect(mockRepo.findByEmail).toHaveBeenCalledWith("example@email.com");
  expect(mockBcrypt.hash).toHaveBeenCalledWith("plainpassword", 10);
  expect(mockRepo.save).toHaveBeenCalledWith({
    email: "example@email.com",
    nickName: "닉네임",
    encryptedpassword: "hashedpassword",
  });
  expectSensitiveFieldsStripped(result);
});

test("이미 존재하는 유저면 회원가입에서 409 에러를 던진다", async () => {
  mockRepo.findByEmail.mockResolvedValue(user);

  await expect(
    userService.createUser({
      email: "example@email.com",
      nickName: "닉네임",
      encryptedpassword: "plainpassword",
    }),
  ).rejects.toMatchObject({
    code: 409,
    message: "이미 존재하는 유저입니다.",
    data: { email: "example@email.com" },
  });
  expect(mockRepo.save).not.toHaveBeenCalled();
});

test("로그인 테스트", async () => {
  mockRepo.findByEmail.mockResolvedValue(user);
  mockBcrypt.compare.mockResolvedValue(true as never);

  const result = await userService.getUser(
    "example@email.com",
    "plainpassword",
  );

  expect(mockBcrypt.compare).toHaveBeenCalledWith(
    "plainpassword",
    "hashedpassword",
  );
  expectSensitiveFieldsStripped(result);
});

test("존재하지 않는 이메일이면 401 에러를 던진다", async () => {
  mockRepo.findByEmail.mockResolvedValue(null);

  await expect(
    userService.getUser("nouser@email.com", "plainpassword"),
  ).rejects.toMatchObject({
    code: 401,
    message: "존재하지 않는 이메일 입니다",
  });
  expect(mockRepo.findByEmail).toHaveBeenCalledWith("nouser@email.com");
});

test("encryptedpassword가 없는 유저(소셜 로그인)면 401 에러를 던진다", async () => {
  mockRepo.findByEmail.mockResolvedValue({ ...user, encryptedpassword: null });

  await expect(
    userService.getUser("example@email.com", "plainpassword"),
  ).rejects.toMatchObject({
    code: 401,
    message: "존재하지 않는 이메일 입니다",
  });
});

test("비밀번호가 일치하지 않으면 401 에러를 던진다", async () => {
  mockRepo.findByEmail.mockResolvedValue(user);
  mockBcrypt.compare.mockResolvedValue(false as never);

  await expect(
    userService.getUser("example@email.com", "wrongpassword"),
  ).rejects.toMatchObject({
    code: 401,
    message: "비밀번호가 일치하지 않습니다.",
  });
});

test("리프레시 토큰 재발급 테스트", async () => {
  mockRepo.findById.mockResolvedValue(user);
  mockJwt.sign
    .mockReturnValueOnce("newAccessToken" as never)
    .mockReturnValueOnce("newRefreshToken" as never);

  const result = await userService.refreshToken(1, "storedRefreshToken");

  expect(mockRepo.findById).toHaveBeenCalledWith(1);
  expect(mockJwt.sign).toHaveBeenNthCalledWith(
    1,
    { userId: 1 },
    env.JWT_ACCESS_SECRET,
    { expiresIn: "1h" },
  );
  expect(mockJwt.sign).toHaveBeenNthCalledWith(
    2,
    { userId: 1 },
    env.JWT_REFRESH_SECRET,
    { expiresIn: "2w" },
  );
  expect(result).toEqual({
    newAccessToken: "newAccessToken",
    newRefreshToken: "newRefreshToken",
  });
});

test("유저가 없으면 리프레시 토큰 재발급에서 401 에러를 던진다", async () => {
  mockRepo.findById.mockResolvedValue(null);

  await expect(
    userService.refreshToken(1, "storedRefreshToken"),
  ).rejects.toMatchObject({ code: 401 });
});

test("저장된 리프레시 토큰과 다르면 401 에러를 던진다", async () => {
  mockRepo.findById.mockResolvedValue(user);

  await expect(
    userService.refreshToken(1, "다른토큰"),
  ).rejects.toMatchObject({ code: 401 });
});

test("내 정보 조회 테스트", async () => {
  mockRepo.findById.mockResolvedValue(user);

  const result = await userService.getMe(1);

  expect(mockRepo.findById).toHaveBeenCalledWith(1);
  expectSensitiveFieldsStripped(result);
});

test("존재하지 않는 유저면 내 정보 조회에서 404 에러를 던진다", async () => {
  mockRepo.findById.mockResolvedValue(null);

  await expect(userService.getMe(1)).rejects.toMatchObject({
    code: 404,
    message: "존재하지 않는 유저입니다",
  });
});

test("유저 정보 수정 테스트", async () => {
  mockRepo.update.mockResolvedValue({ ...user, nickName: "새닉네임" });

  const result = await userService.updateUser(1, { nickName: "새닉네임" });

  expect(mockRepo.update).toHaveBeenCalledWith(1, { nickName: "새닉네임" });
  expectSensitiveFieldsStripped(result);
});
