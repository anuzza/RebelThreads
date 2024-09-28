const { S3 } = require("@aws-sdk/client-s3");
const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

module.exports = s3;
