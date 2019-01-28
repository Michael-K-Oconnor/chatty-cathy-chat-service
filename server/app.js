const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('../db/db.js');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(express.static('dist'));

app.get('/api/messages', (req, res) => {
  if (req.query.userId) {
    db.getMessagesByUser(req.query.userId)
      .then(result => {
        res.status(200);
        res.json(result);
      })
      .catch(err => {
        console.log('Error getting messages from db: ', err);
        res.sendStatus(500);
      });
  } else if (req.query.roomId) {
    db.getMessagesByRoom(req.query.roomId)
      .then(result => {
        res.status(200);
        res.json(result);
      })
      .catch(err => {
        console.log('Error getting messages from db: ', err);
        res.sendStatus(500);
      });
  }
});

app.post('/api/messages', (req, res) => {
  db.createMessage(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('Error creating new message: ', err);
      res.send(500);
    });
});

app.get('/api/chatrooms', (req, res) => {
  db.getChatrooms()
    .then(result => {
      res.status(200);
      res.json(result);
    })
    .catch(err => {
      console.log('Error getting chatrooms: ', err);
      res.sendStatus(500);
    });
});

app.post('/api/chatrooms', (req, res) => {
  db.createChatroom(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('Error creating chatroom: ', err);
      res.send(500);
    });
});

app.get('/api/users/:userId', (req, res) => {
  db.getUserData(req.params.userId)
    .then(result => {
      res.status(200);
      res.json(result);
    })
    .catch(err => {
      console.log('Error getting user data: ', err);
      res.sendStatus(500);
    });
});

app.post('/api/users', (req, res) => {
  db.createUser(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('Error creating user: ', err);
      res.send(500);
    });
});

module.exports = app;
