    import { Pool } from "pg";
    import * as dotenv from "dotenv";

    const ENV = process.env.NODE_ENV || "development";

    // Load environment variables from a .env file
    dotenv.config({
    path: `${__dirname}/../../.env.${ENV}`,
    });

    // Ensure the environment variable for the database connection is set
    if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("PGDATABASE or DATABASE_URL not set");
    }

    // Configuration object for database connection
    const config: { [key: string]: any } = {};

    if (ENV === "production") {
    config.connectionString = process.env.DATABASE_URL;
    config.max = 2; // Set maximum connections for production environment
    } else {
    config.user = process.env.PGUSER;
    config.host = process.env.PGHOST;
    config.database = process.env.PGDATABASE;
    config.password = process.env.PGPASSWORD;
    config.port = parseInt(process.env.PGPORT || "9090", 10);
    config.max = 10; // Allow more connections for development environment
    }

    const pool = new Pool(config);

    export default pool;

    