const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const { signupForEvent } = require("../controllers/signupController");
const { getExistingSignup, addSignup } = require("../models/signupModel");

// Mock the model functions
jest.mock("../models/signupModel");

const app = express();
app.use(express.json());

// Mock JWT middleware
const mockAuthenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).send({ error: "Forbidden" });
  }
};

app.post("/api/signup", mockAuthenticateJWT, signupForEvent);

// Mock JWT secret key
const secretKey = "yourSecretKey";
beforeAll(() => {
  process.env.JWT_SECRET = secretKey;
});

// Error handling middleware for tests
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

describe("signupController Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/signup", () => {
    it("should sign up a user for an event", async () => {
      const mockSignup = { event_id: 1, user_id: 2 };
      getExistingSignup.mockResolvedValue(null);
      addSignup.mockResolvedValue(mockSignup);

      const token = jwt.sign({ id: 2, user_type: "user" }, secretKey, { expiresIn: "24h" });
      const response = await request(app)
        .post("/api/signup")
        .set("Authorization", token)
        .send({ event_id: 1 });

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(mockSignup);
      expect(getExistingSignup).toHaveBeenCalledWith(1, 2);
      expect(addSignup).toHaveBeenCalledWith(1, 2);
    });

    it("should return 403 if user type is not 'user'", async () => {
      const token = jwt.sign({ id: 2, user_type: "admin" }, secretKey, { expiresIn: "24h" });
      const response = await request(app)
        .post("/api/signup")
        .set("Authorization", token)
        .send({ event_id: 1 });

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty("error", "Only regular users can sign up for events.");
      expect(getExistingSignup).not.toHaveBeenCalled();
      expect(addSignup).not.toHaveBeenCalled();
    });

    it("should return 409 if user is already signed up", async () => {
      const mockExistingSignup = { event_id: 1, user_id: 2 };
      getExistingSignup.mockResolvedValue(mockExistingSignup);

      const token = jwt.sign({ id: 2, user_type: "user" }, secretKey, { expiresIn: "24h" });
      const response = await request(app)
        .post("/api/signup")
        .set("Authorization", token)
        .send({ event_id: 1 });

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty("error", "User is already signed up for this event.");
      expect(getExistingSignup).toHaveBeenCalledWith(1, 2);
      expect(addSignup).not.toHaveBeenCalled();
    });

    it("should return 401 if no token is provided", async () => {
      const response = await request(app)
        .post("/api/signup")
        .send({ event_id: 1 });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Unauthorized");
    });

    it("should return 403 if an invalid token is provided", async () => {
      const response = await request(app)
        .post("/api/signup")
        .set("Authorization", "invalidtoken")
        .send({ event_id: 1 });

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty("error", "Forbidden");
    });

    it("should handle server errors", async () => {
      getExistingSignup.mockRejectedValue(new Error("Database error"));

      const token = jwt.sign({ id: 2, user_type: "user" }, secretKey, { expiresIn: "24h" });
      const response = await request(app)
        .post("/api/signup")
        .set("Authorization", token)
        .send({ event_id: 1 });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error", "Database error");
    });
  });
});
