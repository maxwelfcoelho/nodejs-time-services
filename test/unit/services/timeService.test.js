const sinon = require('sinon');

const { TimeService } = require('../../../src/services/TimeService.js');

describe('time service', () => {
    const date = '2021-07-14T18:07:10.431Z';
    const timeService = new TimeService();

    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date(date).getTime());
    });

    afterEach(() => {
        clock.restore();
    });

    test('time GMT timezone', () => {
        const expected = '18:7:10';
        const result = timeService.getGMTTime();
        expect(result).toEqual(expected);
    });
    
    test('time GMT-3 timezone', () => {
        const expected = '15:7:10';
        const result = timeService.getTimeAtTimeZone('America/Sao_Paulo');
        expect(result).toEqual(expected);
    }); 

    test('time IST timezone', () => {
        const expected = '19:7:10';
        const result = timeService.getTimeAtTimeZone('Europe/Dublin');
        expect(result).toEqual(expected);
    });
    
    test('time with empty timezone paramater should return GTM-3', () => {
        const expected = '15:7:10';
        const result = timeService.getTimeAtTimeZone();
        expect(result).toEqual(expected);
    });

    // maybe I can throw an excpetion in the future.
    test('time with invalid timezone parameter should return GMT-3', () => {
        const expected = '15:7:10';
        const result = timeService.getTimeAtTimeZone(120192);
        expect(result).toEqual(expected);
    });

    test('add seconds to gmt timezone', () => {
        const time = timeService.getGMTTime();
        expect(timeService.timeOperation(time, 'add', 10, 'seconds')).toEqual('18:7:20');
        expect(timeService.timeOperation(time, 'add', 25, 'seconds')).toEqual('18:7:35');
    });

    test('add seconds to gmt-3 timezone', () => {
        const time = timeService.getTimeAtTimeZone('America/Sao_Paulo');
        expect(timeService.timeOperation(time, 'add', 10, 'seconds')).toEqual('15:7:20');
        expect(timeService.timeOperation(time, 'add', 25, 'seconds')).toEqual('15:7:35');
    });

    test('add seconds to ist timezone', () => {
        const time = timeService.getTimeAtTimeZone('Europe/Dublin');
        expect(timeService.timeOperation(time, 'add', 10, 'seconds')).toEqual('19:7:20');
        expect(timeService.timeOperation(time, 'add', 25, 'seconds')).toEqual('19:7:35');
    });

    test('subtract seconds to gmt timezone', () => {
        const time = timeService.getGMTTime();
        expect(timeService.timeOperation(time, 'sub', 10, 'seconds')).toEqual('18:7:0');
        expect(timeService.timeOperation(time, 'sub', 25, 'seconds')).toEqual('18:6:45');
    });

    test('subtract seconds to gmt-3 timezone', () => {
        const time = timeService.getTimeAtTimeZone('America/Sao_Paulo');
        expect(timeService.timeOperation(time, 'sub', 10, 'seconds')).toEqual('15:7:0');
        expect(timeService.timeOperation(time, 'sub', 25, 'seconds')).toEqual('15:6:45');
    });

    test('subtract seconds to ist timezone', () => {
        const time = timeService.getTimeAtTimeZone('Europe/Dublin');
        expect(timeService.timeOperation(time, 'sub', 10, 'seconds')).toEqual('19:7:0');
        expect(timeService.timeOperation(time, 'sub', 25, 'seconds')).toEqual('19:6:45');
    });

    test('add minutes to gmt timezone', () => {
        const time = timeService.getGMTTime();
        expect(timeService.timeOperation(time, 'add', 10, 'minutes')).toEqual('18:17:10');
        expect(timeService.timeOperation(time, 'add', 30, 'minutes')).toEqual('18:37:10');
    });

    test('add minutes to gmt-3 timezone', () => {
        const time = timeService.getTimeAtTimeZone('America/Sao_Paulo');
        expect(timeService.timeOperation(time, 'add', 10, 'minutes')).toEqual('15:17:10');
        expect(timeService.timeOperation(time, 'add', 25, 'minutes')).toEqual('15:32:10');
    });

    test('add minutes to ist timezone', () => {
        const time = timeService.getTimeAtTimeZone('Europe/Dublin');
        expect(timeService.timeOperation(time, 'add', 12, 'minutes')).toEqual('19:19:10');
        expect(timeService.timeOperation(time, 'add', 48, 'minutes')).toEqual('19:55:10');
    });

    test('should throw an error when given invalid operation', () => {
        const time = timeService.getGMTTime();
        expect(() => timeService.timeOperation(time, 'test', 12, 'minutes')).toThrow('Invalid operation');
    });

    test('should throw an error when given invalid time unit', () => {
        const time = timeService.getGMTTime();
        expect(() => timeService.timeOperation(time, 'add', 7, 'concat')).toThrow('Invalid time unit');
    });
});