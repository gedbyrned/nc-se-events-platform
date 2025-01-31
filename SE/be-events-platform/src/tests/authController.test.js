const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/authController");
const { getUserByUsername } = require("../models/userModel");

jest.mock("../models/userModel");

const app = express();
app.use(express.json());

app.post("/api/auth", authController.authenticate);

app.get("/api/protected", authController.authenticateJWT, (req, res) => {
  res.json({ message: "You have access", user: req.user });
});

describe("authController Tests", () => {
  const secretKey = "yourSecretKey";

  beforeAll(() => {
    process.env.JWT_SECRET = secretKey;
  });

  describe("POST /api/auth", () => {
    it("should return a token for valid credentials", async () => {
      const mockUser = { user_id: 1, username: "user1", password: "password1" };
      getUserByUsername.mockResolvedValue(mockUser);

      const response = await request(app)
        .post("/api/auth")
        .send({ username: "user1", password: "password1" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      const decodedToken = jwt.verify(response.body.token, secretKey);
      expect(decodedToken).toMatchObject({ id: 1, username: "user1" });
    });

    it("should return 401 for invalid credentials", async () => {
      const mockUser = { user_id: 1, username: "user1", password: "password1" };
      getUserByUsername.mockResolvedValue(mockUser);

      const response = await request(app)
        .post("/api/auth")
        .send({ username: "user1", password: "wrongpassword" });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid username or password"
      );
    });

    it("should return 401 if user does not exist", async () => {
      getUserByUsername.mockResolvedValue(null);

      const response = await request(app)
        .post("/api/auth")
        .send({ username: "nonexistent", password: "password" });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Invalid username or password"
      );
    });
  });

  describe("GET /api/protected", () => {
    it("should return 401 if invalid token is provided", async () => {
      const response = await request(app)
        .get("/api/protected")
        .set("Authorization", "Bearer invalid-token");
      expect(response.status).toBe(401);
    });

    it("should return 200 if a valid token is provided", async () => {
      const secretKey = process.env.JWT_SECRET || "yourSecretKey";
      const validToken = jwt.sign({ id: 1, username: "user1" }, secretKey, {
        expiresIn: "1h",
      });
    
      const response = await request(app)
        .get("/api/protected")
        .set("Authorization", `Bearer ${validToken}`);
    
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("You have access");
    });    
  });
});
