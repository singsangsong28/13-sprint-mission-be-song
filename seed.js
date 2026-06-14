import prisma from "./db.js";

const seedProducts = [
  {
    id: "seed-product-dicaprio-01",
    name: "축구유니폼",
    description: "대한민국 홈 유니폼 새 상품입니다.",
    price: 135000,
    tags: ["축구", "유니폼", "스포츠"],
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2aa15d75-ec40-4907-ac7e-370870dd8f0a/AS+KOR+M+NK+DF+JSY+SS+STAD+HM.png",
    ],
    ownerId: 1,
    favoriteCount: 150,
  },
  {
    id: "seed-product-tomhanks-01",
    name: "맥북 에어 M2 13인치",
    description:
      "사용 6개월 된 맥북 에어 M2입니다. 박스, 충전기 모두 있습니다.",
    price: 1200000,
    tags: ["전자기기", "노트북", "애플"],
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8"],
    ownerId: 2,
    favoriteCount: 87,
  },
  {
    id: "seed-product-bradpitt-01",
    name: "원목 커피 테이블",
    description: "이사로 인해 판매합니다. 흠집 거의 없고 상태 매우 좋습니다.",
    price: 45000,
    tags: ["가구", "인테리어", "원목"],
    images: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c",
    ],
    ownerId: 1,
    favoriteCount: 23,
  },
  {
    id: "seed-product-johnnydepp-01",
    name: "나이키 런닝화 270mm",
    description: "두 번 신고 보관만 했습니다. 사이즈가 안 맞아서 판매해요.",
    price: 68000,
    tags: ["신발", "런닝", "스포츠"],
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff"],
    ownerId: 3,
    favoriteCount: 41,
  },
  {
    id: "seed-product-keanureeves-01",
    name: "캐논 EOS M50 미러리스 카메라",
    description:
      "입문용으로 좋은 카메라입니다. 렌즈 키트 포함, 가방 무료 증정.",
    price: 450000,
    tags: ["카메라", "전자기기", "취미"],
    images: [
      "https://images.unsplash.com/photo-1606980625264-d9aa78a3b738",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    ],
    ownerId: 2,
    favoriteCount: 112,
  },
  {
    id: "seed-product-parkjisung-01",
    name: "삼천리 로드자전거",
    description:
      "출퇴근용으로 사용했습니다. 타이어 최근에 새것으로 교체했어요.",
    price: 180000,
    tags: ["자전거", "스포츠", "운동"],
    images: ["https://images.unsplash.com/photo-1485965120184-e220f721d03e"],
    ownerId: 1,
    favoriteCount: 35,
  },
  {
    id: "seed-product-sonheungmin-01",
    name: "LED 스탠드 조명",
    description:
      "밝기 조절 가능한 LED 스탠드입니다. 책상 위 인테리어로도 예뻐요.",
    price: 22000,
    tags: ["조명", "인테리어", "가전"],
    images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c"],
    ownerId: 3,
    favoriteCount: 9,
  },
  {
    id: "seed-product-leeyoungpyo-01",
    name: "어쿠스틱 기타 (입문용)",
    description: "기타 배우다가 그만둬서 판매합니다. 케이스, 카포, 피크 포함.",
    price: 95000,
    tags: ["악기", "기타", "음악"],
    images: [
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1",
      "https://images.unsplash.com/photo-1525201548942-d8732f6617a0",
    ],
    ownerId: 2,
    favoriteCount: 58,
  },
  {
    id: "seed-product-chabumkun-01",
    name: "닌텐도 스위치 OLED",
    description: "게임 3개 포함해서 드립니다. 박스 풀구성입니다.",
    price: 320000,
    tags: ["게임", "전자기기", "닌텐도"],
    images: ["https://images.unsplash.com/photo-1578303512597-81e6cc155b3e"],
    ownerId: 3,
    favoriteCount: 134,
  },
  {
    id: "seed-product-hwangheechan-01",
    name: "캠핑 2인용 텐트",
    description: "한 번만 사용했습니다. 방수 잘 됩니다.",
    price: 75000,
    tags: ["캠핑", "아웃도어", "텐트"],
    images: ["https://images.unsplash.com/photo-1504280390367-361c6d9f38f4"],
    ownerId: 1,
    favoriteCount: 27,
  },
  {
    id: "seed-product-kimminjae-01",
    name: "에어프라이어 (5L)",
    description: "이사로 정리합니다. 사용감 적고 깨끗합니다.",
    price: 38000,
    tags: ["주방", "가전", "에어프라이어"],
    images: ["https://images.unsplash.com/photo-1612203985729-70726954388c"],
    ownerId: 2,
    favoriteCount: 19,
  },
  {
    id: "seed-product-leekangin-01",
    name: "아이패드 9세대 64GB",
    description: "애플펜슬 1세대 포함입니다. 액정 깨끗해요.",
    price: 380000,
    tags: ["전자기기", "태블릿", "애플"],
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"],
    ownerId: 3,
    favoriteCount: 96,
  },
  {
    id: "seed-product-kisungyueng-01",
    name: "여성 트렌치코트 (M)",
    description: "한 번 입고 드라이클리닝 후 보관했습니다.",
    price: 55000,
    tags: ["의류", "코트", "여성패션"],
    images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea"],
    ownerId: 1,
    favoriteCount: 14,
  },
  {
    id: "seed-product-parkjuyoung-01",
    name: "전동 킥보드",
    description: "배터리 교체한 지 얼마 안 됐습니다. 최대속도 25km/h.",
    price: 210000,
    tags: ["킥보드", "이동수단", "전동"],
    images: ["https://images.unsplash.com/photo-1604868189265-219ba7a5e4b8"],
    ownerId: 2,
    favoriteCount: 45,
  },
  {
    id: "seed-product-ahnjunghwan-01",
    name: "원두 그라인더",
    description: "수동 그라인더입니다. 캠핑용으로도 좋아요.",
    price: 18000,
    tags: ["커피", "주방", "원두"],
    images: ["https://images.unsplash.com/photo-1517256064527-09c73fc73e38"],
    ownerId: 3,
    favoriteCount: 8,
  },
  {
    id: "seed-product-morganfreeman-01",
    name: "책상 겸용 화이트보드",
    description: "재택근무용으로 구매했는데 사무실 출근하게 되어 판매합니다.",
    price: 65000,
    tags: ["가구", "사무", "화이트보드"],
    images: ["https://images.unsplash.com/photo-1517842645767-c639042777db"],
    ownerId: 1,
    favoriteCount: 11,
  },
  {
    id: "seed-product-angelinajolie-01",
    name: "블루투스 스피커",
    description: "방수 기능 있고 음질 좋습니다. 충전선 포함.",
    price: 32000,
    tags: ["전자기기", "스피커", "음향"],
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"],
    ownerId: 2,
    favoriteCount: 22,
  },
  {
    id: "seed-product-scarlettjohansson-01",
    name: "남성 데일리 백팩",
    description: "노트북 수납공간 있는 심플한 디자인입니다.",
    price: 28000,
    tags: ["가방", "백팩", "남성패션"],
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62"],
    ownerId: 3,
    favoriteCount: 17,
  },
  {
    id: "seed-product-tomcruise-01",
    name: "요가매트 + 블록 세트",
    description: "거의 새 제품입니다. 두께 8mm로 무릎에 편안해요.",
    price: 15000,
    tags: ["요가", "운동", "홈트"],
    images: ["https://images.unsplash.com/photo-1518611012118-696072aa579a"],
    ownerId: 1,
    favoriteCount: 6,
  },
  {
    id: "seed-product-robertdowneyjr-01",
    name: "전자레인지 (소형)",
    description: "1인 가구에 딱 좋은 사이즈입니다. 작동 잘 됩니다.",
    price: 25000,
    tags: ["주방", "가전", "전자레인지"],
    images: ["https://images.unsplash.com/photo-1574269909862-7e1d70bb8078"],
    ownerId: 2,
    favoriteCount: 12,
  },
];

const seedArticles = [
  {
    title: "거래할 때 직거래 장소는 어디가 좋을까요?",
    content: "사람 많은 지하철 역이 좋을 것 같아요!",
    image: null,
    likeCount: 12,
    ownerId: 1,
  },
  {
    title: "택배 거래 전에 확인하면 좋은 것",
    content: "상품 상태 말고도 미리 체크하면 좋은 팁이 있을까요?",
    image: null,
    likeCount: 8,
    ownerId: 2,
  },
  {
    title: "요즘 많이 찾는 중고 물건",
    content: "계절이 바뀌면서 어떤 물건이 잘 팔리는지 궁금해요.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    likeCount: 34,
    ownerId: 3,
  },
  {
    title: "중고 전자기기 구매 시 주의사항",
    content:
      "전자제품은 외관만 봐서는 알기 어려운데, 어떤 부분을 꼭 확인해야 할까요?",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    likeCount: 56,
    ownerId: 1,
  },
  {
    title: "가격 협상은 어떻게 하시나요?",
    content: "너무 깎으면 실례인 것 같고, 적당한 협상 멘트가 궁금합니다.",
    image: null,
    likeCount: 19,
    ownerId: 2,
  },
  {
    title: "포장재 재사용, 다들 어떻게 생각하세요?",
    content: "택배 거래할 때 포장재를 재사용하는 것에 대한 의견이 궁금해요.",
    image: null,
    likeCount: 5,
    ownerId: 3,
  },
  {
    title: "중고거래 사기 예방법 공유해요",
    content: "최근에 사기 시도를 당했는데, 다들 어떻게 대처하시나요?",
    image: null,
    likeCount: 230,
    ownerId: 1,
  },
  {
    title: "직거래 시 안전한 시간대는?",
    content: "퇴근 후 저녁 시간에 직거래하는 거 괜찮을까요?",
    image: null,
    likeCount: 7,
    ownerId: 2,
  },
  {
    title: "택배비는 누가 부담해야 할까요?",
    content: "보통 반반 부담하는지, 구매자가 다 내는지 궁금해요.",
    image: null,
    likeCount: 41,
    ownerId: 3,
  },
  {
    title: "중고 가구 냄새 제거 꿀팁",
    content: "원목 가구에서 나는 냄새 어떻게 없애셨나요?",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267",
    likeCount: 15,
    ownerId: 1,
  },
  {
    title: "전자제품 박스 보관하시나요?",
    content:
      "재판매 가치 때문에 박스를 계속 보관 중인데 다들 어떻게 하시는지 궁금해요.",
    image: null,
    likeCount: 3,
    ownerId: 2,
  },
  {
    title: "중고 의류 세탁은 어떻게 하세요?",
    content:
      "받자마자 세탁하시는 분들 많으신가요? 드라이클리닝 비용이 부담돼서요.",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    likeCount: 22,
    ownerId: 3,
  },
  {
    title: "비대면 거래 후기 작성 꼭 하시나요?",
    content: "후기를 남기면 신뢰도가 올라간다고 하던데, 다들 잘 남기시나요?",
    image: null,
    likeCount: 9,
    ownerId: 1,
  },
  {
    title: "중고나라 예절, 이런 거 지켜주세요",
    content: "거래 전 매너 있는 대화법에 대한 생각 나눠봐요.",
    image: null,
    likeCount: 67,
    ownerId: 2,
  },
  {
    title: "가전제품 보증서 없이도 거래되나요?",
    content: "보증서나 영수증 없는 가전제품 구매해도 괜찮을까요?",
    image: null,
    likeCount: 14,
    ownerId: 3,
  },
  {
    title: "자전거 중고 구매 체크리스트",
    content: "타이어, 체인 외에 또 뭘 봐야 할까요?",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e",
    likeCount: 28,
    ownerId: 1,
  },
  {
    title: "반려동물 용품 중고거래 어떻게 생각하세요?",
    content: "위생 문제 때문에 꺼려지는데 다들 의견이 궁금해요.",
    image: null,
    likeCount: 18,
    ownerId: 2,
  },
  {
    title: "거래 취소했을 때 대처법",
    content: "약속 잡고 갔는데 갑자기 취소당했어요. 다들 이런 경험 있나요?",
    image: null,
    likeCount: 102,
    ownerId: 3,
  },
  {
    title: "중고 책 가격은 어떻게 책정하나요?",
    content: "정가 대비 몇 퍼센트가 적당한지 궁금합니다.",
    image: null,
    likeCount: 11,
    ownerId: 1,
  },
  {
    title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
    content: "사용감 거의 없고 박스, 충전기 다 있는데 적정 가격이 궁금해요.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    likeCount: 9999,
    ownerId: 2,
  },
];

async function seed() {
  // 기존 데이터 정리
  await prisma.comment.deleteMany();
  await prisma.article.deleteMany();
  await prisma.product.deleteMany({
    where: {
      id: { in: seedProducts.map((p) => p.id) },
    },
  });

  // 상품 생성
  const products = [];
  for (const product of seedProducts) {
    products.push(
      await prisma.product.create({
        data: product,
      }),
    );
  }

  // 게시글 생성
  const articles = [];
  for (const article of seedArticles) {
    articles.push(
      await prisma.article.create({
        data: article,
      }),
    );
  }

  // 댓글 생성 - 게시글 + 상품에 다양하게 분포
  await prisma.comment.createMany({
    data: [
      // 게시글 댓글
      {
        content: "사람 많은 지하철역이나 카페 앞이 좋아요.",
        articleId: articles[0].id,
      },
      {
        content: "주차장이나 편의점 앞도 추천해요. CCTV가 있으면 더 안심돼요.",
        articleId: articles[0].id,
      },
      {
        content: "택배 거래는 포장 사진도 받아두면 좋아요.",
        articleId: articles[1].id,
      },
      {
        content: "배송 전후 사진을 비교해두면 분쟁이 생겼을 때 도움이 됩니다.",
        articleId: articles[1].id,
      },
      {
        content: "환절기에는 의류나 캠핑용품 거래가 많아지는 것 같아요.",
        articleId: articles[2].id,
      },
      {
        content: "배터리 사이클 수랑 충전 단자 상태를 꼭 확인하세요.",
        articleId: articles[3].id,
      },
      {
        content: "직거래로 전원 켜보고 작동 확인하는 게 가장 안전해요.",
        articleId: articles[3].id,
      },
      {
        content:
          "'혹시 가격 조정 가능할까요?' 정도로 부드럽게 물어보면 좋아요.",
        articleId: articles[4].id,
      },
      {
        content: "위생 문제가 있는 품목은 새 포장재를 쓰는 게 좋을 것 같아요.",
        articleId: articles[5].id,
      },
      {
        content: "저도 비슷한 일 겪었는데, 신고하고 거래내역 캡처해두세요.",
        articleId: articles[6].id,
      },
      {
        content: "저녁 시간보다는 낮 시간에 사람 많은 곳이 더 안전해요.",
        articleId: articles[7].id,
      },
      {
        content: "보통 구매자가 택배비 부담하는 경우가 많은 것 같아요.",
        articleId: articles[8].id,
      },
      {
        content: "베이킹소다랑 햇볕에 며칠 말리면 냄새 많이 빠져요.",
        articleId: articles[9].id,
      },
      {
        content: "박스 있으면 중고 판매할 때 가격 더 잘 받을 수 있어요.",
        articleId: articles[10].id,
      },
      {
        content: "받으면 바로 세탁하는 게 마음이 편해요.",
        articleId: articles[11].id,
      },
      {
        content: "후기 남기면 다음 거래할 때도 신뢰도가 올라가서 좋아요.",
        articleId: articles[12].id,
      },
      {
        content: "인사만 잘해도 거래 분위기가 훨씬 좋아지는 것 같아요.",
        articleId: articles[13].id,
      },
      {
        content: "보증서 없어도 직거래로 작동 확인하면 괜찮다고 봐요.",
        articleId: articles[14].id,
      },
      {
        content: "체인 녹슨 정도랑 브레이크 작동도 꼭 확인하세요.",
        articleId: articles[15].id,
      },
      {
        content: "세척 후 소독까지 해서 올리면 거래 잘 되더라고요.",
        articleId: articles[16].id,
      },
      {
        content: "저도 노쇼 당한 적 있는데 정말 속상하더라고요.",
        articleId: articles[17].id,
      },
      {
        content: "보통 정가의 30~50% 정도면 적당한 것 같아요.",
        articleId: articles[18].id,
      },
      {
        content: "사양 좋네요! 200만원 초반대도 가능할 것 같아요.",
        articleId: articles[19].id,
      },
      {
        content: "충전 사이클이랑 외관 상태 보고 가격 정해보세요.",
        articleId: articles[19].id,
      },

      // 상품 댓글
      { content: "상품 상태가 좋아 보여요.", productId: products[0].id },
      {
        content: "사이즈 표시도 같이 올려주실 수 있나요?",
        productId: products[0].id,
      },
      { content: "배터리 사이클 몇 번이나 되나요?", productId: products[1].id },
      {
        content: "직거래 가능한 지역이 어디인가요?",
        productId: products[1].id,
      },
      { content: "사진보다 실물이 더 예쁘네요!", productId: products[2].id },
      {
        content: "사이즈 270 정사이즈인가요, 크게 나오나요?",
        productId: products[3].id,
      },
      { content: "렌즈도 같이 판매하시는 건가요?", productId: products[4].id },
      { content: "셔터 수 확인 가능할까요?", productId: products[4].id },
      {
        content: "타이어 교체한 지 얼마 안 됐다니 안심이네요.",
        productId: products[5].id,
      },
      { content: "조도 단계가 몇 단계인가요?", productId: products[6].id },
      { content: "기타 줄 상태는 어떤가요?", productId: products[7].id },
      {
        content: "게임 타이틀이 어떤 거 포함인가요?",
        productId: products[8].id,
      },
      { content: "텐트 사이즈가 2인용 맞나요?", productId: products[9].id },
      { content: "에어프라이어 용량이 5L 맞죠?", productId: products[10].id },
      {
        content: "애플펜슬 충전은 정상적으로 되나요?",
        productId: products[11].id,
      },
      {
        content: "사이즈가 M이면 키 165 정도에 맞을까요?",
        productId: products[12].id,
      },
      {
        content: "최고속도 25km/h면 면허 필요 없나요?",
        productId: products[13].id,
      },
      {
        content: "그라인더 분쇄도 조절 가능한가요?",
        productId: products[14].id,
      },
      { content: "화이트보드 자석 잘 붙나요?", productId: products[15].id },
      { content: "방수 등급이 어느 정도인가요?", productId: products[16].id },
      { content: "노트북 15인치도 들어가나요?", productId: products[17].id },
      { content: "매트 두께가 충분한가요?", productId: products[18].id },
      { content: "용량이 어느 정도 되나요?", productId: products[19].id },
    ],
  });

  console.log("데이터 seed 성공!");
  console.log(`- 상품 ${products.length}개`);
  console.log(`- 게시글 ${articles.length}개`);
}

seed()
  .catch((error) => {
    console.error("Seed 작업 실패:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
