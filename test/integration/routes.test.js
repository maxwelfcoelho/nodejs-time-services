const supertest = require('supertest');
const sinon = require('sinon');

const app = require('../../src/app');

const TimeController = require('../../src/controllers/TimeController');

describe('get /time/current', () => {
    const date = '2021-07-14T18:07:10.431Z';
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date(date).getTime());
    });

    afterEach(() => {
        clock.restore();
    });

    test('should return a json', done => {
        supertest(app)
            .get('/time/current')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    test('should return a valid response', done => {
        supertest(app)
            .get('/time/current')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual({ GMT: '18:7:10', Brazil: '15:7:10', Ireland: '19:7:10' });
                done();
            })
            .catch(err => done(err));
    });

    test('should add seconds to the supported times', done => {
        const endpoint = `/time/add/12/seconds`;
        supertest(app)
            .get(endpoint)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual({ 'GMT': '18:7:22', 'GMT-3': '15:7:22', 'IST': '19:7:22' });
                done();
            })
            .catch(err => done(err));
    });

    test('should add minutes to the supported times', done => {
        const endpoint = `/time/add/36/minutes`;
        supertest(app)
            .get(endpoint)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual({ 'GMT': '18:43:10', 'GMT-3': '15:43:10', 'IST': '19:43:10' });
                done();
            })
            .catch(err => done(err));
    });

    test('invalid operation throws an error', done => {
        const endpoint = `/time/calculate/36/minutes`;
        supertest(app)
            .get(endpoint)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toEqual('Invalid operation');
                done();
            })
            .catch(err => done(err));
    });

    test('invalid time unit throws an error', done => {
        const endpoint = `/time/add/36/halfsecond`;
        supertest(app)
            .get(endpoint)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toEqual('Invalid time unit');
                done();
            })
            .catch(err => done(err));
    });

});