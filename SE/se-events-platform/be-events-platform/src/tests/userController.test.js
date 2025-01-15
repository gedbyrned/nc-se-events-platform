const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const usersController = require("../controllers/userController");
const { authenticateJWT } = require("../controllers/authController");
const { getUserByUsername } = require("../models/userModel");

// Mock the model functions
jest.mock("../models/userModel");

const app = express();
app.use(express.json());

app.get("/api/me", authenticateJWT, usersController.getProfile);

// Mock JWT secret key
const secretKey = "yourSecretKey"; // must match the secret key in authController

// Mock the environment variable
beforeAll(() => {
  process.env.JWT_SECRET = secretKey;
});

// Error handling middleware for tests
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

describe("userController Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/me", () => {
    it("should return user profile for valid token", async () => {
      const mockUser = {
        user_id: 1,
        username: "user1",
        first_name: "First",
        last_name: "Last",
        email: "user1@example.com",
        user_type: "staff",
      };
      getUserByUsername.mockResolvedValue(mockUser);

      const token = jwt.sign({ username: "user1" }, secretKey, {
        expiresIn: "24h",
      });
      const response = await request(app)
        .get("/api/me")
        .set("Authorization", token);

      expect(response.status).toBe(200);
      const {
        password,
        category,
        location,
        entertainer_name,
        description,
        price,
        ...userWithoutPassword
      } = mockUser;
      expect(response.body).toMatchObject(userWithoutPassword);
      expect(getUserByUsername).toHaveBeenCalledWith("user1");
    });

    it("should return 404 if user not found", async () => {
      getUserByUsername.mockResolvedValue(null);

      const token = jwt.sign({ username: "nonexistent" }, secretKey, {
        expiresIn: "24h",
      });
      const response = await request(app)
        .get("/api/me")
        .set("Authorization", token);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error", "User not found");
      expect(getUserByUsername).toHaveBeenCalledWith("nonexistent");
    });

    it("should return 401 if no token is provided", async () => {
      const response = await request(app).get("/api/me");

      expect(response.status).toBe(401);
    });

    it("should return 403 if an invalid token is provided", async () => {
      const response = await request(app)
        .get("/api/me")
        .set("Authorization", "invalidtoken");

      expect(response.status).toBe(403);
    });
  });
});
