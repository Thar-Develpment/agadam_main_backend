const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  endpoint: "process.env.S3_ENDPOINT",
  region: "process.env.S3_REGION",
  credentials: {
    accessKeyId:"process.env.S3_ACCESS_KEY",
    secretAccessKey: "process.env.S3_SECRET_KEY",
  },
});


const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});
module.exports = { s3, PutObjectCommand };