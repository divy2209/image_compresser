const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

class AWS {
    constructor(bucketName){
        this.s3Client = new S3Client({
            region: process.env.AWS_S3_REGION,
            credentials: {
              accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
            },
          });
          this.bucketName = bucketName ?? process.env.AWS_S3_BUCKET_NAME;
    }

    async send(originFileName, buffer) {
        const timeStamp = Date.now();
        const ref = `${timeStamp}-${originFileName}`;
        const params = {
            Bucket: this.bucketName,
            Key: ref,
            Body: buffer,
          };

        return await this.s3Client.send(new PutObjectCommand(params));
    }
}

module.exports = new AWS();