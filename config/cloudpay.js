const cloudcredens = require('../config/production')

const cloudpay = {
  endpoint:cloudcredens.cloudpay.endpoint,
  accessKeyId: cloudcredens.cloudpay.accessKeyId,
  secretAccessKey: cloudcredens.cloudpay.secretAccessKey,
  region: cloudcredens.cloudpay.region
};

const {
  S3Client,
} = require("@aws-sdk/client-s3");

const cloudpe = new S3Client({
  endpoint: "https://s3.in-west3.purestore.io/",

  region: "S3-INWEST3",

  credentials: {
    accessKeyId:
      "8729cf427da7fe45F5T1",

    secretAccessKey:
      "JBGfkUewcZOaFNUHX3oXilHGPK4fdWHYwt8YonWl",
  },

  forcePathStyle: true,
});

module.exports = cloudpe;



// module.exports = cloudpay;