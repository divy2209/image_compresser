const request = require("supertest");
const app = require("../app");

describe("Home ui", () => {
    it("should render the home with correct title", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.text).toContain("Upload Image");
    })
});