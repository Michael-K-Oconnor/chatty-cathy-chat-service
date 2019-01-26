exports.seed = function roomSeeder(knex) {
  // Deletes ALL existing entries
  return knex('chatrooms')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('chatrooms').insert([{ roomname: 'Lobby' }])
    );
};
