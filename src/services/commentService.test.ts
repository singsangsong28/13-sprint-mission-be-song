import commentRepository from "../repositories/commentRepository";
import commentService from "./commentService";

jest.mock("../repositories/commentRepository");
const mockRepo = commentRepository as jest.Mocked<typeof commentRepository>;
const now = new Date();
const commentByProduct = [
  {
    id: 1,
    content: "내용",
    createdAt: now,
    updatedAt: now,
    productId: 1,
    articleId: 1,
    ownerId: 1,
    user: {
      id: 1,
      nickName: "닉네임",
      image: "example.com",
    },
  },
];
const commentByArticle = [
  {
    id: 1,
    content: "내용",
    createdAt: now,
    updatedAt: now,
    productId: 1,
    articleId: 1,
    ownerId: 1,
    user: {
      id: 1,
      nickName: "닉네임",
      image: "example.com",
    },
  },
];

const commentGetById = {
  id: 1,
  createdAt: now,
  updatedAt: now,
  content: "내용",
  productId: 1,
  articleId: 1,
  ownerId: 1,
  user: {
    id: 1,
    nickName: "닉네임",
    image: "example.com",
  },
};

const comment = {
  id: 1,
  content: "댓글",
  createdAt: now,
  updatedAt: now,
  productId: 1,
  articleId: 1,
  ownerId: 1,
};
const updatedComment = {
  id: 1,
  content: "수정된 댓글",
  createdAt: now,
  updatedAt: now,
  productId: 1,
  articleId: 1,
  ownerId: 1,
};

test("상품 아이디로 댓글 전체 조회 테스트", async () => {
  mockRepo.getAllByProduct.mockResolvedValue(commentByProduct);
  const result = await commentService.getAllByProduct(1, 3);
  expect(result.list[0].writer).toEqual({
    id: 1,
    nickname: "닉네임",
    image: "example.com",
  });
  expect(mockRepo.getAllByProduct).toHaveBeenCalledWith(1, 3);
});

test("자유게시판 게시글 아이디로 전체 게시글 댓글 조회 테스트", async () => {
  mockRepo.getAllByArticle.mockResolvedValue(commentByArticle);
  const result = await commentService.getAllByArticle(1, 3);
  expect(result.list[0].writer).toEqual({
    id: 1,
    nickname: "닉네임",
    image: "example.com",
  });
  expect(mockRepo.getAllByArticle).toHaveBeenCalledWith(1, 3);
});

test("아이디로 댓글 조회", async () => {
  mockRepo.getById.mockResolvedValue(commentGetById);
  await commentService.getById(1);
  expect(mockRepo.getById).toHaveBeenCalledWith(1);
});

test("댓글 조회 실패 테스트", async () => {
  mockRepo.getById.mockResolvedValue(null);
  await expect(commentService.getById(-1)).rejects.toMatchObject({
    code: 404,
    message: "댓글을 찾을 수 없습니다.",
  });
});

test("댓글 생성 테스트", async () => {
  mockRepo.save.mockResolvedValue(comment);
  await commentService.create(comment);
  expect(mockRepo.save).toHaveBeenCalledWith(comment);
});

test("댓글 수정 테스트", async () => {
  mockRepo.update.mockResolvedValue(updatedComment);
  await commentService.update(1, updatedComment);
  expect(mockRepo.update).toHaveBeenCalledWith(1, updatedComment);
});

test("댓글 삭제 테스트", async () => {
  mockRepo.deleteById.mockResolvedValue(comment);
  await commentService.deleteById(1);
  expect(mockRepo.deleteById).toHaveBeenCalledWith(1);
});

test("작성자 정보 없는 댓글 조회 테스트", async () => {
  mockRepo.getById.mockResolvedValue({
    ...commentGetById,
    user: null,
  } as any);
  const result = await commentService.getById(1);
  expect(result.writer).toBeNull();
});
