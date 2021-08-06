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
});