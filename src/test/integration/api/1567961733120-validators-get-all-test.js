const expect = require('chai').expect;
const server = require('../../../app');
const request = require('supertest')(server);

describe('Validators list GET API', () => {
    it('should get validators list', done => {
        request
            .get('/api/v1/validators')
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err) done(err);
                expect(response.body).to.instanceOf(Array);
                expect(response.statusCode).to.equal(200);
                done();
            });
    });
});