const supertest = require('supertest');

const app = require('../../src/app');

describe('get /time/current', () => {
    test('should return a json', done => {
        supertest(app)
            .get('/time/current')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});