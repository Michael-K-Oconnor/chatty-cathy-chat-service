const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const redis = require('socket.io-redis');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { path: '/socket/messages/socket.io' });

const db = require('../db/db.js');

io.adapter(redis({ host: 'cache', port: 6379 }));

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.use(morgan('dev'));
app.use(helmet());
// app.use(cors());
// app.use(express.static('dist'));
app.use(bodyParser.json());

app.get('/healthz', (req, res) => {
  res.sendStatus(200);
});

const messagesNsp = io.of('/messages');
const chatroomsNsp = io.of('/chatrooms');

messagesNsp.on('connection', socket => {
  socket.on('joinChatroomChannel', roomId => {
    let rooms = Object.keys(socket.rooms);
    rooms.forEach(room => {
      if (room !== socket.id) {
        socket.leave(room);
      }
    });
    socket.join(`${roomId}`);
  });

  socket.on('chatMessageSubmitted', async msg => {
    const messageId = await db.createMessage(msg);
    const newMessage = await db.getMessageByMessageId(messageId[0]);
    messagesNsp.to(`${msg.roomId}`).emit('newMessageForClient', newMessage[0]);
  });
});

chatroomsNsp.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chatroomSubmitted', async roomname => {
    let roomId = await db.createChatroom(roomname);
    let newChatroom = await db.getChatroomByRoomId(roomId[0]);
    chatroomsNsp.emit('newChatroomForClient', newChatroom[0]);
  });
});

app.get(
  '/api/messages/messages',
  asyncMiddleware(async (req, res) => {
    if (req.query.userId) {
      const result = await db.getMessagesByUserId(req.query.userId);
      res.json(result);
    } else if (req.query.roomId) {
      const result = await db.getMessagesByRoomId(req.query.roomId);
      res.json(result);
    } else if (req.query.messageId) {
      const result = await db.getMessageByMessageId(req.query.messageId);
      res.json(result);
    }
  })
);

app.post(
  '/api/messages/messages',
  asyncMiddleware(async (req, res) => {
    await db.createMessage(req.body);
    res.sendStatus(201);
  })
);

app.get(
  '/api/messages/chatrooms',
  asyncMiddleware(async (req, res) => {
    const result = await db.getChatrooms();
    res.json(result);
  })
);

app.post(
  '/api/messages/chatrooms',
  asyncMiddleware(async (req, res) => {
    await db.createChatroom(req.body);
    res.sendStatus(201);
  })
);

app.get(
  '/api/messages/users/:userId',
  asyncMiddleware(async (req, res) => {
    const result = await db.getUserData(req.params.userId);
    res.json(result);
  })
);

app.post(
  '/api/messages/users',
  asyncMiddleware(async (req, res) => {
    await db.createUser(req.body);
    res.sendStatus(201);
  })
);

app.use((error, req, res, next) => {
  console.log(`Err with ${req.url}: \n`, error.message);
  res.sendStatus(500);
  next();
});

module.exports = server;
