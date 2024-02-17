const request = require('supertest');
const app = require("../app");
const fs = require('fs');


describe("Image Upload Tests", () => {
    it('should upload an image successfully', async () => {
        const response = await request(app)
          .post('/upload')
          .attach('image', fs.readFileSync("./test/supported_sample.png"), "supported_sample.png"); // Replace with an actual image file
    
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Image uploaded');
      });

      it('should filter unsupported image format', async () => {
        const response = await request(app)
          .post('/upload')
          .attach('image', fs.readFileSync("./test/unsupported_sample.svg"), "unsupported_sample.svg"); // Replace with an actual image file
    
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Unsupported image format');
      });
    
      it('should handle missing image file', async () => {
        const response = await request(app)
          .post('/upload');
    
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Image file is required');
      });
});