const db = require('knex')({
  client: 'pg',
  connection: {
    database: 'chattycathy'
  }
});

module.exports = db;
