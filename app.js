'use strict';

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();

app.set('view engine', 'pug');

// Routes
app.get('/', function (req, res) {
  res.render('index', {
    title: 'Hey',
    message: 'Hello there, pug!'
  });
});

// Server
app.listen(PORT, function () {
  console.log('Running on http://localhost:' + PORT);
});
