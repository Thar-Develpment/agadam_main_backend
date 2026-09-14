const {
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

const cloudpe =
  require("../config/cloudpay");

const crypto = require("crypto");

const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Images are required",
      });
    }

    const uploadedImages = [];

    for (const file of req.files) {

      const extension = file.originalname
        .split(".")
        .pop()
        .toLowerCase();

      const fileName =
        `images/${Date.now()}-${crypto
          .randomBytes(6)
          .toString("hex")}.${extension}`;

      await cloudpe.send(
        new PutObjectCommand({
          Bucket:
            "aadagam",

          Key: fileName,

          Body: file.buffer,

          ContentType: file.mimetype,
        })
      );

      const imageUrl =
        `https://s3.in-west3.purestore.io/aadagam/${fileName}`;

      uploadedImages.push({
        originalName: file.originalname,
        fileName,
        url: imageUrl,
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Images uploaded successfully",
      count: uploadedImages.length,
      images: uploadedImages,
    });

  } catch (error) {

    console.error(
      "CloudPe Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: error.message,
    });
  }
};

module.exports = {
  uploadImages,
};