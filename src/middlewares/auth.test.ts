import { Request, RequestHandler } from "express";
import HttpError from "../errors/HttpError";
import articleRepository from "../repositories/articleRepository";
import commentRepository from "../repositories/commentRepository";
import productRepository from "../repositories/productRepository";
import auth, { getUserId } from "./auth";

jest.mock("../repositories/productRepository");
jest.mock("../repositories/articleRepository");
jest.mock("../repositories/commentRepository");

const mockProductRepo = productRepository as jest.Mocked<
  typeof productRepository
>;
const mockArticleRepo = articleRepository as jest.Mocked<
  typeof articleRepository
>;
const mockCommentRepo = commentRepository as jest.Mocked<
  typeof commentRepository
>;

const res = {} as any;
const authReq = (id: string, userId = 1) =>
  ({ params: { id }, auth: { userId } }) as unknown as Request;

describe("getUserId", () => {
  test("req.auth가 있으면 userId를 반환한다", () => {
    expect(getUserId({ auth: { userId: 1 } } as Request)).toBe(1);
  });

  test("req.auth가 없으면 HttpError 401을 던진다", () => {
    const req = {} as Request;
    expect(() => getUserId(req)).toThrow(HttpError);
    expect(() => getUserId(req)).toThrow("권한이 없습니다");
  });
});

const cases: { name: string; handler: RequestHandler; repo: any }[] = [
  { name: "verifyProductAuth", handler: auth.verifyProductAuth, repo: mockProductRepo },
  { name: "verifyArticleAuth", handler: auth.verifyArticleAuth, repo: mockArticleRepo },
  { name: "verifyCommentAuth", handler: auth.verifyCommentAuth, repo: mockCommentRepo },
];

describe.each(cases)("$name", ({ handler, repo }) => {
  test("대상이 없으면 404 에러로 next를 호출한다", async () => {
    repo.getById.mockResolvedValue(null);
    const next = jest.fn();

    await handler(authReq("1"), res, next);

    expect(next).toHaveBeenCalledWith(expect.any(HttpError));
    expect((next.mock.calls[0][0] as HttpError).code).toBe(404);
  });

  test("소유자가 아니면 403 에러로 next를 호출한다", async () => {
    repo.getById.mockResolvedValue({ ownerId: 2 });
    const next = jest.fn();

    await handler(authReq("1"), res, next);

    expect(next).toHaveBeenCalledWith(expect.any(HttpError));
    expect((next.mock.calls[0][0] as HttpError).code).toBe(403);
  });

  test("소유자면 인자 없이 next()를 호출한다", async () => {
    repo.getById.mockResolvedValue({ ownerId: 1 });
    const next = jest.fn();

    await handler(authReq("1"), res, next);

    expect(next).toHaveBeenCalledWith();
  });
});

test("id가 숫자가 아니면 400 에러로 next를 호출한다", async () => {
  const next = jest.fn();

  await auth.verifyProductAuth(authReq("abc"), res, next);

  expect(next).toHaveBeenCalledWith(expect.any(HttpError));
  expect((next.mock.calls[0][0] as HttpError).code).toBe(400);
});
