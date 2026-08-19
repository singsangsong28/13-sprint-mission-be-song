import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

//AWS S3 설정
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_PUBLIC_BUCKET_NAME;

if (!accessKeyId || !secretAccessKey || !bucketName) {
  throw new Error("AWS 환경변수가 누락되었습니다.");
}

const s3 = new S3Client({
  region: "ap-northeast-2", // region : 한국
  credentials: { accessKeyId, secretAccessKey },
});

// multer-s3 설정
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    key: (_req, file, cb) => {
      // 버킷이 분리되어 있으므로 폴더 구분 불필요
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

export default upload;
