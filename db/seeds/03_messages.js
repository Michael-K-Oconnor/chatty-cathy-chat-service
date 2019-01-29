exports.seed = function messageSeeder(knex) {
  // Deletes ALL existing entries
  return knex('messages')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('messages').insert([
        {
          message: 'First message!',
          userId: 1,
          roomId: 1
        }
      ])
    );
};
