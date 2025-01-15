const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../../.env.${ENV}`,
});

console.log('PGDATABASE:', process.env.PGDATABASE);  

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('PGDATABASE or DATABASE_URL not set');
}

const config = {}

if (ENV === 'production') {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
} else {
  // Development environment configuration (using .env.development)
  config.user = process.env.DB_USER;        
  config.host = process.env.DB_HOST || 'localhost';
  config.database = process.env.PGDATABASE;  
  config.password = process.env.DB_PASSWORD; 
  config.port = process.env.DB_PORT || 5432;
  config.max = 10;                       
}

module.exports = new Pool(config);
