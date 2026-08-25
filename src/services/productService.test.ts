import productRepository from "../repositories/productRepository";
import productService from "./productService";

jest.mock("../repositories/productRepository");
const mockRepo = productRepository as jest.Mocked<typeof productRepository>;
const product = {
  id: 1,
  name: "테스트",
  description: "테스트",
  price: 100,
  tags: [],
  images: [],
  ownerId: 1,
  favoriteCount: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
const updatedProduct = {
  id: 1,
  name: "수정된 테스트",
  description: "수정된 테스트",
  price: 101,
  tags: [],
  images: [],
  ownerId: 1,
  favoriteCount: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

test("상품 정렬 테스트", async () => {
  mockRepo.getAll.mockResolvedValue({ products: [], totalCount: 0 });
  await productService.getAll(undefined, {
    page: 1,
    pageSize: 10,
    orderBy: "favorite",
    keyword: undefined,
  });
  expect(mockRepo.getAll).toHaveBeenCalledWith(
    undefined,
    expect.objectContaining({ orderBy: { favoriteCount: "desc" } }),
  );
});

test("상품이 없으면 404 에러를 던진다.", async () => {
  mockRepo.getById.mockResolvedValue(null);
  await expect(productService.getById(-1)).rejects.toMatchObject({
    code: 404,
    message: "상품을 찾을 수 없습니다.",
  });
});

test("상품이 있으면 isLiked / ownerNickname을 매핑해서 반환한다.", async () => {
  mockRepo.getById.mockResolvedValue({
    user: {
      id: 1,
      nickName: "가짜",
      image: "example.com",
    },
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "가짜 상품",
    description: "가짜 상품입니다",
    favoriteCount: 1,
    price: 100,
    tags: ["가짜"],
    images: ["example.com"],
    ownerId: 1,
    comments: [],
    likes: [
      { id: 1, userId: 1, productId: 1, articleId: 1, createdAt: new Date() },
    ],
  });
  await expect(productService.getById(1)).resolves.toMatchObject({
    isLiked: true,
    ownerNickname: "가짜",
  });
});

test("정렬 기본 값 테스트", async () => {
  mockRepo.getAll.mockResolvedValue({ products: [], totalCount: 0 });
  await productService.getAll(undefined, {
    page: 1,
    pageSize: 10,
    orderBy: "recent",
    keyword: undefined,
  });
  expect(mockRepo.getAll).toHaveBeenCalledWith(
    undefined,
    expect.objectContaining({ orderBy: { createdAt: "desc" } }),
  );
});

test("상품 생성 테스트", async () => {
  mockRepo.save.mockResolvedValue(product);
  const result = await productService.create(product);
  expect(mockRepo.save).toHaveBeenCalledWith(product);
  expect(result).toBe(product);
});

test("상품 수정 테스트", async () => {
  mockRepo.update.mockResolvedValue(updatedProduct);
  const result = await productService.update(updatedProduct);
  expect(mockRepo.update).toHaveBeenCalledWith(updatedProduct);
  expect(result).toBe(updatedProduct);
});

test("상품 삭제 테스트", async () => {
  mockRepo.deleteById.mockResolvedValue(product);
  const result = await productService.deleteById(1);
  expect(mockRepo.deleteById).toHaveBeenCalledWith(1);
  expect(result).toBe(product); //삭제 되기 전 상품 데이터 스냅샷 리턴
});

test("getAll 결과에 isLiked / ownerNickname을 매핑하고 totalCount를 그대로 반환한다.", async () => {
  const products = [
    {
      id: 1,
      name: "가짜 상품1",
      description: "설명1",
      price: 100,
      tags: [],
      images: [],
      ownerId: 1,
      favoriteCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: { id: 1, nickName: "가짜1", image: "example.com" },
      likes: [
        { id: 1, userId: 1, productId: 1, articleId: 1, createdAt: new Date() },
      ],
    },
    {
      id: 2,
      name: "가짜 상품2",
      description: "설명2",
      price: 200,
      tags: [],
      images: [],
      ownerId: 2,
      favoriteCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: { id: 2, nickName: "가짜2", image: "example.com" },
      likes: [],
    },
  ];
  mockRepo.getAll.mockResolvedValue({ products, totalCount: 2 });

  const result = await productService.getAll(1, {
    page: 1,
    pageSize: 10,
    orderBy: "recent",
    keyword: undefined,
  });

  expect(result.totalCount).toBe(2);
  expect(result.list).toEqual([
    expect.objectContaining({ id: 1, isLiked: true, ownerNickname: "가짜1" }),
    expect.objectContaining({ id: 2, isLiked: false, ownerNickname: "가짜2" }),
  ]);
});

test("limit 없으면 page/pageSize로 skip을 계산한다.", async () => {
  mockRepo.getAll.mockResolvedValue({ products: [], totalCount: 0 });
  await productService.getAll(undefined, {
    page: 3,
    pageSize: 10,
    orderBy: "recent",
    keyword: undefined,
  });
  expect(mockRepo.getAll).toHaveBeenCalledWith(
    undefined,
    expect.objectContaining({ skip: 20, take: 10 }),
  );
});

test("limit이 있으면 skip은 0이고 take는 limit 값을 쓴다.", async () => {
  mockRepo.getAll.mockResolvedValue({ products: [], totalCount: 0 });
  await productService.getAll(undefined, {
    page: 3,
    pageSize: 10,
    limit: 5,
    orderBy: "recent",
    keyword: undefined,
  });
  expect(mockRepo.getAll).toHaveBeenCalledWith(
    undefined,
    expect.objectContaining({ skip: 0, take: 5 }),
  );
});
