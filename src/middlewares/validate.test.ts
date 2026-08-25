import { Request, Response } from "express";
import z from "zod";
import HttpError from "../errors/HttpError";
import validate, { parseId } from "./validate";

describe("parseId", () => {
  test("양의 정수 문자열이면 number로 변환한다", () => {
    expect(parseId("1")).toBe(1);
  });

  test("숫자가 아니면 HttpError 400을 던진다", () => {
    expect(() => parseId("abc")).toThrow(HttpError);
    expect(() => parseId("abc")).toThrow("올바른 id가 아닙니다.");
  });

  test("0 이하이면 HttpError 400을 던진다", () => {
    expect(() => parseId("0")).toThrow(HttpError);
  });

  test("label을 넘기면 메시지에 반영된다", () => {
    expect(() => parseId("abc", "productId")).toThrow(
      "올바른 productId가 아닙니다.",
    );
  });
});

describe("validate", () => {
  const schema = z.object({ name: z.string() });
  const next = jest.fn();
  const res = {} as Response;

  test("스키마를 통과하면 req.body를 parse 결과로 교체하고 next()를 호출한다", () => {
    const req = { body: { name: "닉네임" } } as Request;

    validate(schema)(req, res, next);

    expect(req.body).toEqual({ name: "닉네임" });
    expect(next).toHaveBeenCalledWith();
  });

  test("스키마를 통과하지 못하면 HttpError 400을 next로 넘긴다", () => {
    const req = { body: {} } as Request;

    validate(schema)(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(HttpError));
    const error = next.mock.calls[0][0] as HttpError;
    expect(error.code).toBe(400);
  });
});
