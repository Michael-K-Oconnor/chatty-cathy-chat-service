const db = require('knex')({
  client: 'pg',
  connection: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  }
});

// ///////////////////////////////
// ///  USERS QUERIES  ///////////
// ///////////////////////////////

const getUserData = userId =>
  db
    .select()
    .from('users')
    .where({ userId });

const createUser = ({ username, handle, numMessages, profilePic }) =>
  db
    .insert({ username, handle, numMessages, profilePic })
    .into('users')
    .returning('userId');

// ///////////////////////////////
// ///  MESSAGES QUERIES  ////////
// ///////////////////////////////

const getMessagesByRoom = roomId =>
  db
    .select()
    .from('messages')
    .where({ roomId });

const getMessagesByUser = userId =>
  db
    .select()
    .from('messages')
    .where({ userId });

const createMessage = ({ message, userId, roomId }) =>
  db.insert({ message, userId, roomId }).into('messages');

// ///////////////////////////////
// ///////  ROOMS QUERIES  ///////
// ///////////////////////////////

const getChatrooms = () => db.select().from('chatrooms');

const createChatroom = ({ roomname }) =>
  db.insert({ roomname }).into('chatrooms');

module.exports = {
  getUserData,
  createUser,
  getMessagesByRoom,
  getMessagesByUser,
  createMessage,
  getChatrooms,
  createChatroom
};
