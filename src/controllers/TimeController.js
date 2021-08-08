const { TimeService, supportedTimezones } = require('../services/TimeService');

class TimeController {
    constructor() {}

    async get(req, res) {
        const timeService = new TimeService();
        const times = {
            'GMT': timeService.getGMTTime(),
            'Brazil': timeService.getTimeAtTimeZone(supportedTimezones.get('Brazil')),
            'Ireland': timeService.getTimeAtTimeZone(supportedTimezones.get('Ireland'))
        };

        res.status(200).json(times)
    }

    async timeOperation(req, res) {
        try {
            const timeService = new TimeService();
            const { operation, value, timeUnit } = req.params;
            const gmtTime = timeService.getGMTTime();
            const gmt3Time = timeService.getTimeAtTimeZone(supportedTimezones.get('Brazil'));
            const istTime = timeService.getTimeAtTimeZone(supportedTimezones.get('Ireland'));

            res.status(200).json({
                'GMT': timeService.timeOperation(gmtTime, operation, value, timeUnit),
                'GMT-3': timeService.timeOperation(gmt3Time, operation, value, timeUnit),
                'IST': timeService.timeOperation(istTime, operation, value, timeUnit)
            });
        } catch(err) {
            res.status(400).json(err.message);
        }
    }
}

module.exports = new TimeController();