exports.seed = function userSeeder(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('users').insert([
        {
          username: 'OG User',
          handle: '@whereIsEveryone?',
          numMessages: 1,
          profilePic: 'http://lorempixel.com/g/400/400/people/1/'
        }
      ])
    );
};
