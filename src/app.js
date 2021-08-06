const express = require('express');

const app = express();

const TimeController = require('./controllers/TimeController');

app.get('/time/current', TimeController.get);

module.exports = app;