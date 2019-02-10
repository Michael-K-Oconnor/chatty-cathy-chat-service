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

io.on('connection', socket => {
  socket.join('messages');
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chatMessageSubmitted', async msg => {
    // await db.createMessage(msg);
    console.log('Message created');
    io.emit('newMessageForClient', msg);
  });
});

app.get(
  '/api/messages/messages',
  asyncMiddleware(async (req, res) => {
    if (req.query.userId) {
      const result = await db.getMessagesByUser(req.query.userId);
      res.json(result);
    } else if (req.query.roomId) {
      const result = await db.getMessagesByRoom(req.query.roomId);
      res.json(result);
    }
  })
);

// TODO - function might not be necessary,
// but would need to remove tests as we
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
