const { set,reset } = require('mockdate');

const TimeService = require('../../../src/server/services/TimeService.js');

describe('time service', () => {
    const date = '2021-07-14T18:07:10.431Z';
    const timeService = new TimeService();

    beforeEach(() => {
        set(date);
    });

    afterEach(() => {
        reset();
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
});