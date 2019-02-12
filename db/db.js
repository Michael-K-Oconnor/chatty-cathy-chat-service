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

const getMessagesByRoomId = roomId =>
  db('messages')
    .join('users', 'messages.userId', 'users.userId')
    .select(
      'messages.message',
      'messages.messageId',
      'messages.created_at',
      'messages.updated_at',
      'users.username',
      'users.handle'
    )
    .where({ roomId });

const getMessagesByUserId = userId =>
  db('messages')
    .join('users', 'messages.userId', 'users.userId')
    .join('chatrooms', 'messages.roomId', 'chatrooms.roomId')
    .select(
      'messages.message',
      'messages.created_at',
      'messages.updated_at',
      'messages.messageId',
      'users.username',
      'users.handle',
      'chatrooms.roomname'
    )
    .where('messages.userId', userId);

const getMessageByMessageId = messageId =>
  db('messages')
    .join('users', 'messages.userId', 'users.userId')
    .select(
      'messages.message',
      'messages.messageId',
      'messages.created_at',
      'messages.updated_at',
      'users.username',
      'users.handle'
    )
    .where({ messageId });

const createMessage = ({ message, userId, roomId }) =>
  db('messages')
    .insert({ message, userId, roomId })
    .returning('messageId');

// ///////////////////////////////
// ///////  ROOMS QUERIES  ///////
// ///////////////////////////////

const getChatrooms = () => db('chatrooms').select();

const createChatroom = ({ roomname }) =>
  db('chatrooms')
    .insert({ roomname })
    .returning('roomId');

const getChatroomByRoomId = roomId =>
  db('chatrooms')
    .select()
    .where({ roomId });

// ///////////////////////////////
// ///////     EXPORTS    ////////
// ///////////////////////////////

module.exports = {
  getUserData,
  createUser,
  getMessagesByRoomId,
  getMessagesByUserId,
  getMessageByMessageId,
  createMessage,
  getChatrooms,
  getChatroomByRoomId,
  createChatroom
};
