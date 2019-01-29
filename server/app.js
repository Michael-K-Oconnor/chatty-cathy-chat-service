const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('../db/db.js');

const app = express();

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.use(morgan('dev'));
app.use(helmet());
app.use(express.static('dist'));
app.use(bodyParser.json());

app.get(
  '/api/messages',
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

app.post(
  '/api/messages',
  asyncMiddleware(async (req, res) => {
    await db.createMessage(req.body);
    res.sendStatus(201);
  })
);

app.get(
  '/api/chatrooms',
  asyncMiddleware(async (req, res) => {
    const result = await db.getChatrooms();
    res.json(result);
  })
);

app.post(
  '/api/chatrooms',
  asyncMiddleware(async (req, res) => {
    await db.createChatroom(req.body);
    res.sendStatus(201);
  })
);

app.get(
  '/api/users/:userId',
  asyncMiddleware(async (req, res) => {
    const result = await db.getUserData(req.params.userId);
    res.json(result);
  })
);

app.post(
  '/api/users',
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

module.exports = app;
