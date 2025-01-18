const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const usersController = require("../controllers/userController");
const { authenticateJWT } = require("../controllers/authController");
const { getUserByUsername } = require("../models/userModel");

jest.mock("../models/userModel");

const app = express();
app.use(express.json());

app.get("/api/me", authenticateJWT, usersController.getProfile);

const secretKey = "yourSecretKey";

beforeAll(() => {
  process.env.JWT_SECRET = secretKey;
});

beforeEach(() => {
  getUserByUsername.mockResolvedValue({
    user_id: 1,
    username: "testUser",
    email: "test@example.com",
  });
});

app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

describe("userController Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/me", () => {
    it("should return user profile for valid token", async () => {
      const validToken = jwt.sign(
        { id: 1, username: "testUser" },
        secretKey,
        { expiresIn: "24h" }
      );

      const response = await request(app)
        .get("/api/me")
        .set("Authorization", `Bearer ${validToken}`);

      expect(response.status).toBe(200);
    });

    it("should return 404 if user not found", async () => {
      getUserByUsername.mockResolvedValue(null);

      const validToken = jwt.sign(
        { id: 1, username: "nonexistentUser" },
        secretKey,
        { expiresIn: "24h" }
      );

      const response = await request(app)
        .get("/api/me")
        .set("Authorization", `Bearer ${validToken}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("User not found");
    });

    it("should return 401 if invalid token is provided", async () => {
      const response = await request(app)
        .get("/api/me")
        .set("Authorization", "Bearer invalid-token");

      expect(response.status).toBe(401);
    });
  });
});
