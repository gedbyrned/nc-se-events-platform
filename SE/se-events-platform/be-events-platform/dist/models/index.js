import { Sequelize } from "sequelize";
const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 9090,
    username: "postgres",
    password: "password",
    database: "se_events_platform",
});
// Test the connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
testConnection();
export default sequelize;
