exports.up = function makeMessageTable(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('messages', table => {
      table.increments('messageId');
      table.string('message');
      table.integer('userId');
      table.integer('roomId');
      table.timestamps(false, true);
      table
        .foreign('userId')
        .references('userId')
        .inTable('users');
      table
        .foreign('roomId')
        .references('roomId')
        .inTable('chatrooms');
    })
  ]);
};

exports.down = function removeMessageTable(knex, Promise) {
  return Promise.all([knex.schema.dropTable('messages')]);
};
