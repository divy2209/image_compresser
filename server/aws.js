const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

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
        const putParams = {
            Bucket: this.bucketName,
            Key: ref,
            Body: buffer,
          };

        return this.s3Client.send(new PutObjectCommand(putParams));

        // const getParams = {
        //   Bucket: this.bucketName,
        //   Key: ref,
        // };

        // return this.s3Client.send(new GetObjectCommand(getParams)).then(async response => {
        //   // Construct the path to the Downloads folder
        //   const downloadsPath = path.join(__dirname, 'Downloads', `downloaded_image_${ref}`);

        //   const fileStream = fs.createWriteStream(downloadsPath);

        //   // Pipe the data from the S3 stream to the file stream
        //   response.Body.pipe(fileStream);

        //   // Wait for the stream to finish writing
        //   await new Promise((resolve, reject) => {
        //     fileStream.on('finish', resolve);
        //     fileStream.on('error', reject);
        //   });
        // });
    }
}

module.exports = new AWS();