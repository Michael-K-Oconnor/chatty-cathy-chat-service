const express = require('express');
// const morgan = require("morgan");
const bodyParser = require('body-parser');
const db = require('../db/db.js');

const app = express();
const port = process.env.port || 3000;

// app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(express.static('dist'));

app.get('/', (req, res) => {
  console.log('Inside GET request');
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

app.post('/', (req, res) => {
  console.log('Inside POST request');
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

app.listen(port, () => console.log(`Listening on port ${port}!`));
