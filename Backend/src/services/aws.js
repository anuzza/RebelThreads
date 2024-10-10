const AWS = require("@aws-sdk/client-s3");

const s3 = new AWS.S3({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

module.exports = s3;
