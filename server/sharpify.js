const sharp = require("sharp");

module.exports = {
    compress: async originalFileBuffer => {
        try {
            const img = sharp(originalFileBuffer);
            const meta = await img.metadata();
            const {format} = meta;
            const config = {
                jpeg: {quality: 80, progressive: true},
                webp: {quality: 80},
                png: {compressionLevel: 9, adaptiveFiltering: true},
                gif: {quality: 80},
                tiff: {quality: 80},
            }
            if(config[format]==null){
                throw new Error();
            }
            const newFileBuffer = await img[format](config[format]).toBuffer();
            return newFileBuffer;
          } catch (err) {
            throw new Error(err);
          }
    }
}