const { TimeService, supportedTimezones } = require('../services/TimeService');

class TimeController {
    constructor() {}

    get(req, res) {
        const timeService = new TimeService();
        const times = {
            'GMT': timeService.getGMTTime(),
            'Brazil': timeService.getTimeAtTimeZone(supportedTimezones.get('Brazil')),
            'Ireland': timeService.getTimeAtTimeZone(supportedTimezones.get('Ireland'))
        };

        res.status(200).json(times)
    }
}

module.exports = new TimeController();