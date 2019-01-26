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

app.get('/messages', (req, res) => {
  console.log('Inside messages GET request');
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

app.post('/messages', (req, res) => {
  console.log('Inside messages POST request');
  db.createMessage(req.body)
    .then(() => {
      console.log('POST request successful');
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('Error creating new message: ', err);
      res.send(500);
    });
});

app.get('/chatrooms', (req, res) => {
  console.log('Inside chatrooms GET request');
  db.select()
    .from('chatrooms')
    .then(result => {
      console.log(result);
      res.status(200);
      res.json(result);
    })
    .catch(err => {
      console.log('Error querying db');
      res.sendStatus(500);
    });
});

app.post('/chatrooms', (req, res) => {
  console.log('Inside chatrooms POST request');
  console.log(req.body);
  db('chatrooms')
    .insert(req.body)
    .then(result => {
      console.log('POST request successful');
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('Error inserting into database');
      res.send(500);
    });
});

app.get('/api/users/:userId', (req, res) => {
  console.log('Inside users GET request');
  db.getUserData(req.params.userId)
    .then(result => {
      console.log(result);
      res.status(200);
      res.json(result);
    })
    .catch(err => {
      console.log('Error getting user data: ', err);
      res.sendStatus(500);
    });
});

app.post('/api/users', (req, res) => {
  console.log('Inside users POST request');
  console.log(req.body);
  db.createUser(req.body)
    .then(result => {
      console.log('POST request successful', result);
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('Error creating user: ', err);
      res.send(500);
    });
});

module.exports = app;
