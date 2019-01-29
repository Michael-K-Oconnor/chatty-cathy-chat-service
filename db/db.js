const db = require('./knex');

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

// ///////////////////////////////
// ///////     EXPORTS    ////////
// ///////////////////////////////

module.exports = {
  getUserData,
  createUser,
  getMessagesByRoom,
  getMessagesByUser,
  createMessage,
  getChatrooms,
  createChatroom
};
