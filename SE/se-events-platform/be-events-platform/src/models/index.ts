import { Sequelize } from "sequelize";

// Initialize the Sequelize instance
const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 9090, // Your port number
  username: "postgres", // Your username
  password: "password", // Your password
  database: "se_events_platform", // Your database name
});

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();

export default sequelize;
