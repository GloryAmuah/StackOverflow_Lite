const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST } = require('../config');

const dialect = 'mysql';
const credentials = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  dialect,
};

module.exports = {
  development: {
    ...credentials,
  },
  test: {
    ...credentials,
  },
  production: {
    ...credentials,
  },
};
