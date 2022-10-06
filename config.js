require('dotenv').config();

module.exports = {
  DB_USERNAME: process.env.DB_DEV_USERNAME,
  DB_PASSWORD: process.env.DB_DEV_PASSWORD,
  DB_NAME: process.env.DB_DEV_NAME,
  DB_HOST: process.env.DB_DEV_HOST,
  JWT_KEY: process.env.JWT_KEY,
  PORT: process.env.PORT
};
