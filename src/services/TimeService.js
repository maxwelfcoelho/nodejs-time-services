const supportedTimezones = new Map();
supportedTimezones.set('Ireland', 'Europe/Dublin');
supportedTimezones.set('Brazil', 'America/Sao_Paulo');

class TimeService {
    constructor() {}
    
    getGMTTime() {
        const time = new Date();
        return `${time.getUTCHours()}:${time.getUTCMinutes()}:${time.getUTCSeconds()}`;
    }

    getTimeAtTimeZone(timezone) {
        if (!timezone || typeof timezone !== 'string') {
            timezone = supportedTimezones.get('Brazil');
        }
        const time = new Date(new Date().toLocaleString('pt-BR', {timeZone: timezone}));
        return `${time.getHours()}:${time.getMinutes()}:${time.getUTCSeconds()}`;
    }
}

module.exports = {
    TimeService,
    supportedTimezones
};