import { Request, Response } from "express";
import { ZodError } from "zod";
import HttpError from "../errors/HttpError";
import errorHandler from "./errorHandler";

function createRes() {
  const res = {
    status: jest.fn(),
    send: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;
  (res.status as jest.Mock).mockReturnValue(res);
  return res;
}

const req = { path: "/test", method: "GET" } as Request;
const next = jest.fn();

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

test("UnauthorizedError는 401과 고정 문구를 응답한다", () => {
  const res = createRes();
  const error = { name: "UnauthorizedError" };

  errorHandler(error, req, res, next);

  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.send).toHaveBeenCalledWith("invalid token...");
});

test("HttpError는 code와 message, data를 그대로 응답한다", () => {
  const res = createRes();
  const error = new HttpError("이미 존재하는 유저입니다.", 409, {
    email: "a@a.com",
  });

  errorHandler(error, req, res, next);

  expect(res.status).toHaveBeenCalledWith(409);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      path: "/test",
      method: "GET",
      message: "이미 존재하는 유저입니다.",
      data: { email: "a@a.com" },
      date: expect.any(Date),
    }),
  );
});

test("ZodError는 400과 issue 메시지를 합쳐서 응답한다", () => {
  const res = createRes();
  const zodError = new ZodError([
    { code: "custom", message: "이름은 필수입니다.", path: ["name"] },
    { code: "custom", message: "이메일 형식이 아닙니다.", path: ["email"] },
  ]);

  errorHandler(zodError, req, res, next);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      message: "이름은 필수입니다.,이메일 형식이 아닙니다.",
      data: undefined,
    }),
  );
});

test("그 외 에러는 500과 기본 메시지를 응답한다", () => {
  const res = createRes();
  const error = new Error("something broke");

  errorHandler(error, req, res, next);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      message: "Internal Server Error",
    }),
  );
});
