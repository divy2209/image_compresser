const sharp = require("sharp");

module.exports = {
    compress: async originalFileBuffer => {
        try {
            const img = sharp(originalFileBuffer);
            const meta = await img.metadata();
            const {format} = meta;
            const config = {
                jpeg: {quality: 40, progressive: true},
                webp: {quality: 40},
                png: {compressionLevel: 4, adaptiveFiltering: true},
                gif: {quality: 40},
                tiff: {quality: 40},
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