const express = require('express');

const app = express();

const TimeController = require('./controllers/TimeController');

app.get('/time/current', TimeController.get);
app.get('/time/:operation/:value/:timeUnit', TimeController.timeOperation);
app.get('/test/:id', (req, res) => {
    res.status(200).json(req.params.id);
});

module.exports = app;