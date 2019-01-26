exports.up = function migrateUp(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('userId');
      table.string('username');
      table.string('handle');
      table.string('numMessages');
      table.string('profilePic');
      table.timestamps(false, true);
    }),
    knex.schema.createTable('chatrooms', table => {
      table.increments('roomId');
      table.string('roomname');
      table.timestamps(false, true);
    })
  ]);
};

exports.down = function migrateDown(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('chatrooms')
  ]);
};
