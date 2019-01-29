const dbConn = require('knex');

let db;

if (process.env.NODE_ENV === 'test') {
  db = dbConn({
    client: 'pg',
    connection: {
      database: 'chattycathy',
      host: 'localhost',
      user: 'student',
      password: 'student'
    }
  });
} else {
  db = dbConn({
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    }
  });
}

// ///////////////////////////////
// ///  USERS QUERIES  ///////////
// ///////////////////////////////

const getUserData = userId =>
  db('users')
    .select()
    .where({ userId });

const createUser = ({ username, handle, numMessages, profilePic }) =>
  db('users')
    .insert({ username, handle, numMessages, profilePic })
    .returning('userId');

// ///////////////////////////////
// ///  MESSAGES QUERIES  ////////
// ///////////////////////////////

const getMessagesByRoom = roomId =>
  db('messages')
    .join('users', 'messages.userId', 'users.userId')
    .select(
      'messages.message',
      'messages.created_at',
      'messages.updated_at',
      'users.username',
      'users.handle'
    )
    .where({ roomId });

const getMessagesByUser = userId =>
  db('messages')
    .join('users', 'messages.userId', 'users.userId')
    .join('chatrooms', 'messages.roomId', 'chatrooms.roomId')
    .select(
      'messages.message',
      'messages.created_at',
      'messages.updated_at',
      'users.username',
      'users.handle',
      'chatrooms.roomname'
    )
    .where('messages.userId', userId);

const createMessage = ({ message, userId, roomId }) =>
  db('messages').insert({ message, userId, roomId });

// ///////////////////////////////
// ///////  ROOMS QUERIES  ///////
// ///////////////////////////////

const getChatrooms = () => db('chatrooms').select();

const createChatroom = ({ roomname }) => db('chatrooms').insert({ roomname });

module.exports = {
  db,
  getUserData,
  createUser,
  getMessagesByRoom,
  getMessagesByUser,
  createMessage,
  getChatrooms,
  createChatroom
};
