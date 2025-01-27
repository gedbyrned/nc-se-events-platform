const request = require("supertest");
const express = require("express");
const registrationController = require("../controllers/registrationController");
const { addUser, isUsernameTaken } = require("../models/registrationModel");

jest.mock("../models/registrationModel");

const app = express();
app.use(express.json());

app.post("/api/register", registrationController.registerUser);
app.get("/api/check-username/:username", registrationController.checkUsername);

app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

describe("registrationController Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/register", () => {
    it("should register a new user", async () => {
      const newUser = {
        username: "new_user",
        password: "password123",
        email: "new_user@example.com",
        user_type: "staff",
      };
      isUsernameTaken.mockResolvedValue(false);
      addUser.mockResolvedValue({ user_id: 1, ...newUser });

      const response = await request(app).post("/api/register").send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newUser);
      expect(isUsernameTaken).toHaveBeenCalledWith("new_user");
      expect(addUser).toHaveBeenCalledWith(newUser);
    });

    it("should return 400 for missing required fields", async () => {
      const newUser = {
        username: "new_user",
        password: "password123",
        user_type: "Client",
      };

      const response = await request(app).post("/api/register").send(newUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Missing required fields");
    });

    it("should return 409 if username is already taken", async () => {
      const newUser = {
        username: "existing_user",
        password: "password123",
        email: "existing_user@example.com",
        user_type: "Client",
      };
      isUsernameTaken.mockResolvedValue(true);

      const response = await request(app).post("/api/register").send(newUser);

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty("error", "Username already taken");
      expect(isUsernameTaken).toHaveBeenCalledWith("existing_user");
    });
  });

  describe("GET /api/check-username/:username", () => {
    it("should return false if username is not taken", async () => {
      isUsernameTaken.mockResolvedValue(false);

      const response = await request(app).get("/api/check-username/new_user");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ usernameTaken: false });
      expect(isUsernameTaken).toHaveBeenCalledWith("new_user");
    });

    it("should return true if username is taken", async () => {
      isUsernameTaken.mockResolvedValue(true);

      const response = await request(app).get(
        "/api/check-username/existing_user"
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ usernameTaken: true });
      expect(isUsernameTaken).toHaveBeenCalledWith("existing_user");
    });
  });
});
