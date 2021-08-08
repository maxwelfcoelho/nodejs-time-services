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

    timeOperation(time, operation, value, timeUnit) {
        const date = this.timeToDate(time);
    
        let newDate;
        if (operation === 'add') {
            newDate = this.addToDateTime(date, timeUnit, value);
        } else if (operation === 'sub') {
            newDate = this.subtractToDateTime(date, timeUnit, value);
        } else {
            throw new Error('Invalid operation');
        }

        return `${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
    }

    timeToDate(time) {
        const splittedTime = time.split(':');
        const hours = parseInt(splittedTime[0]);
        const minutes = parseInt(splittedTime[1]);
        const seconds = parseInt(splittedTime[2]);
        const today = new Date();
    
        return new Date(today.getFullYear(), today.getMonth(), today.getDay(), hours, minutes, seconds);
    }

    addToDateTime(date, timeUnit, value) {
        if (timeUnit === 'seconds') {
             date.setSeconds(date.getSeconds() + parseInt(value));
        } else if (timeUnit === 'minutes') {
            date.setMinutes(date.getMinutes() + parseInt(value));
        } else {
            throw new Error('Invalid time unit');
        }
        return date;
    }

    subtractToDateTime(date, timeUnit, value) {
        if (timeUnit === 'seconds') {
            date.setSeconds(date.getSeconds() - parseInt(value));
        } else if (timeUnit === 'minutes') {
            date.setMinutes(date.getMinutes() - parseInt(value));
        } else {
            throw new Error('Invalid time unit');
        }
        return date;
    }
}

module.exports = {
    TimeService,
    supportedTimezones
};