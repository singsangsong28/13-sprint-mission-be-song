import prisma from "../config/prisma";
import likeRepository from "../repositories/likeRepository";
import likeService from "./likeService";

jest.mock("../repositories/likeRepository");
const mockRepo = likeRepository as jest.Mocked<typeof likeRepository>;

jest.mock("../config/prisma.js", () => ({
  __esModule: true,
  default: {
    like: { create: jest.fn(), delete: jest.fn() },
    product: { update: jest.fn() },
    article: { update: jest.fn() },
    $transaction: jest.fn((ops) => Promise.all(ops)),
  },
}));

const mockPrisma = prisma as unknown as {
  like: { create: jest.Mock; delete: jest.Mock };
  product: { update: jest.Mock };
  article: { update: jest.Mock };
  $transaction: jest.Mock;
};

const user = {
  id: 1,
  userId: 1,
  productId: 1,
  articleId: null,
  createdAt: new Date(),
};

test("상품 좋아요 생성 테스트", async () => {
  mockRepo.findByUserAndProduct.mockResolvedValue(null);
  await likeService.likeProduct(1, 1);
  expect(mockPrisma.like.create).toHaveBeenCalledWith({
    data: {
      userId: 1,
      productId: 1,
    },
  });
});

test("상품 좋아요 중복 테스트", async () => {
  mockRepo.findByUserAndProduct.mockResolvedValue(user);
  await expect(likeService.likeProduct(1, 1)).rejects.toMatchObject({
    code: 409,
    message: "이미 좋아요를 누른 상품입니다.",
  });
  expect(mockRepo.findByUserAndProduct).toHaveBeenCalledWith(1, 1);
});

test("상품 좋아요 취소 테스트", async () => {
  mockRepo.findByUserAndProduct.mockResolvedValue(user);
  await expect(likeService.unlikeProduct(1, 1)).resolves.toBeUndefined();
  expect(mockPrisma.like.delete).toHaveBeenCalledWith({
    where: {
      userId_productId: {
        userId: 1,
        productId: 1,
      },
    },
  });
  expect(mockPrisma.product.update).toHaveBeenCalledWith({
    where: { id: 1 },
    data: { favoriteCount: { decrement: 1 } },
  });
});

test("상품 게시글에 좋아요를 누르지 않은 상품이면 Not Found 에러를 던진다.", async () => {
  mockRepo.findByUserAndProduct.mockResolvedValue(null);
  await expect(likeService.unlikeProduct(1, 1)).rejects.toMatchObject({
    code: 404,
    message: "좋아요를 누르지 않은 상품입니다.",
  });
});

test("자유게시판 게시글 좋아요 생성 테스트", async () => {
  mockRepo.findByUserAndArticle.mockResolvedValue(null);
  await likeService.likeArticle(1, 1);
  expect(mockPrisma.like.create).toHaveBeenCalledWith({
    data: {
      userId: 1,
      articleId: 1,
    },
  });
});

test("자유게시판 게시글좋아요 중복 테스트", async () => {
  mockRepo.findByUserAndArticle.mockResolvedValue(user);
  await expect(likeService.likeArticle(1, 1)).rejects.toMatchObject({
    code: 409,
    message: "이미 좋아요를 누른 게시글입니다.",
  });
  expect(mockRepo.findByUserAndArticle).toHaveBeenCalledWith(1, 1);
});

test("자유게시판 게시글 좋아요 취소 테스트", async () => {
  mockRepo.findByUserAndArticle.mockResolvedValue(user);
  await expect(likeService.unlikeArticle(1, 1)).resolves.toBeUndefined();
  expect(mockPrisma.like.delete).toHaveBeenCalledWith({
    where: {
      userId_articleId: {
        userId: 1,
        articleId: 1,
      },
    },
  });
  expect(mockPrisma.article.update).toHaveBeenCalledWith({
    where: { id: 1 },
    data: { likeCount: { decrement: 1 } },
  });
});

test("자유게시판 게시글에 좋아요를 누르지 않은 상품이면 Not Found 에러를 던진다.", async () => {
  mockRepo.findByUserAndArticle.mockResolvedValue(null);
  await expect(likeService.unlikeArticle(1, 1)).rejects.toMatchObject({
    code: 404,
    message: "좋아요를 누르지 않은 게시글입니다.",
  });
});
