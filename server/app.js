const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('../db/db.js');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(express.static('dist'));

app.get('/messages', (req, res) => {
  console.log('Inside messages GET request');
  db.select()
    .from('messages')
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

app.post('/messages', (req, res) => {
  console.log('Inside messages POST request');
  console.log(req.body);
  const entry = Object.assign(req.body);
  //  entry.created_at = '2018-12-25 18:17:15.403787-06';
  console.log(entry);
  db('messages')
    .insert(entry)
    .then(result => {
      console.log('POST request successful');
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('Error inserting into database');
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

app.get('/users', (req, res) => {
  console.log('Inside users GET request');
  db.select()
    .from('users')
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

app.post('/users', (req, res) => {
  console.log('Inside users POST request');
  console.log(req.body);
  db('users')
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

module.exports = app;
