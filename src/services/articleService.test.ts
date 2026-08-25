import articleRepository from "../repositories/articleRepository";
import articleService from "./articleService";

jest.mock("../repositories/articleRepository");
const mockRepo = articleRepository as jest.Mocked<typeof articleRepository>;
const now = new Date();
const article = {
  id: 1,
  title: "제목",
  content: "내용",
  image: "example.com",
  likeCount: 1,
  ownerId: 1,
  createdAt: now,
  updatedAt: now,
};
const updatedarticle = {
  id: 1,
  title: "수정된 제목",
  content: "수정된 내용",
  image: "수정된 example.com",
  likeCount: 2,
  ownerId: 2,
  createdAt: now,
  updatedAt: now,
};
const articleGetById = {
  id: 1,
  title: "제목",
  content: "내용",
  likeCount: 0,
  image: null,
  ownerId: 1,
  createdAt: now,
  updatedAt: now,
  comments: [],
  likes: [
    { id: 1, userId: 1, productId: null, articleId: 1, createdAt: now },
  ],
  user: { id: 1, nickName: "닉네임", image: "example.com" },
};

test("자유 게시판 게시글 조회 테스트", async () => {
  mockRepo.getAll.mockResolvedValue({
    articles: [
      {
        id: 1,
        title: "제목",
        content: "내용",
        likeCount: 0,
        image: null,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: [
          {
            id: 1,
            userId: 1,
            productId: null,
            articleId: 1,
            createdAt: new Date(),
          },
        ],
        user: { id: 1, nickName: "닉네임", image: null },
      },
    ],
    totalCount: 1,
  });
  const result = await articleService.getAll(1, {
    page: 1,
    pageSize: 10,
    orderBy: "recent",
  });

  expect(result.totalCount).toBe(1);
  expect(result.list[0].isLiked).toBe(true);
  expect(result.list[0].writer).toEqual({
    id: 1,
    nickname: "닉네임",
    image: null,
  });
});

test("자유게시판 게시글 id로 조회 테스트", async () => {
  mockRepo.getById.mockResolvedValue(articleGetById);
  const result = await articleService.getById(1, 1);
  expect(result.isLiked).toBe(true);
  expect(result.writer).toEqual({
    id: 1,
    nickname: "닉네임",
    image: "example.com",
  });
});

test("좋아요 안 누른 게시글 조회 테스트", async () => {
  mockRepo.getById.mockResolvedValue({ ...articleGetById, likes: [] });
  const result = await articleService.getById(1, 1);
  expect(result.isLiked).toBe(false);
});

test("작성자 정보 없는 게시글 조회 테스트", async () => {
  mockRepo.getById.mockResolvedValue({
    ...articleGetById,
    likes: [],
    user: null,
  } as any);
  const result = await articleService.getById(1, 1);
  expect(result.writer).toBeNull();
});

test("자유게시판 게시글 조회 실패 테스트", async () => {
  mockRepo.getById.mockResolvedValue(null);
  await expect(articleService.getById(-1, -1)).rejects.toMatchObject({
    code: 404,
    message: "게시글을 찾을 수 없습니다.",
  });
});

test("자유게시판 게시글 작성 테스트", async () => {
  mockRepo.save.mockResolvedValue(article);
  await articleService.create(article);
  expect(mockRepo.save).toHaveBeenCalledWith(article);
});

test("자유게시판 게시글 수정 테스트", async () => {
  mockRepo.update.mockResolvedValue(updatedarticle);
  await articleService.update(updatedarticle);
  expect(mockRepo.update).toHaveBeenCalledWith(updatedarticle);
});

test("자유게시판 게시글 삭제 테스트", async () => {
  mockRepo.deleteById.mockResolvedValue(article);
  await articleService.deleteById(article.id);
  expect(mockRepo.deleteById).toHaveBeenCalledWith(article.id);
});
