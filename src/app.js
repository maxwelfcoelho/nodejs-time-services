const express = require('express');

const app = express();

const TimeService = require('./services/TimeService');

app.get('/time/current', (req, res) => {
    const timeService = new TimeService();
    const times = {
        'GMT': timeService.getGMTTime(),
        'Brazil': timeService.getTimeAtTimeZone('America/Sao_Paulo'),
        'Ireland': timeService.getTimeAtTimeZone('Europe/Dublin')
    };

    res.status(200).json(times);
});

module.exports = app;