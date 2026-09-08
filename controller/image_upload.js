const crypto = require("crypto");
const { s3, PutObjectCommand } = require("../helper/s3");


exports.imageUpload = async (req, res) => {
  try {
    if (!req.files?.length)
      return res.status(400).json({
        success: false,
        message: "Images are required",
      });

    const urls = [];

    for (const file of req.files) {
      const ext =
        file.mimetype === "image/jpeg" ? "jpg" : file.mimetype.split("/")[1];

      const key = `images/${crypto.randomUUID()}.${ext}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: "public-read",
        }),
      );

      urls.push(`${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${key}`);
    }

    res.json({
      success: true,
      message: "Images uploaded successfully",
      urls,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
