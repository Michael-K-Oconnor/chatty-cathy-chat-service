const db = require('../db/db.js');

db.db.migrate
  .rollback()
  .then(() => db.db.migrate.latest())
  .then(() => db.db.seed.run())
  .then(() => db.getUserData(1))
  .then(response => {
    console.log(response);
  });
