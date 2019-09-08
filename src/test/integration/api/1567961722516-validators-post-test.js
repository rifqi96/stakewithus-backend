const expect = require('chai').expect;
const server = require('../../../app');
const request = require('supertest')(server);
const validatorsMock = require('../../fixtures/validators');

describe('Validators POST API', () => {
    it('should add/update validators', done => {
        request
            .post(`/api/v1/validators`)
            .set('Accept', 'application/json')
            .send(validatorsMock)
            .end((err, response) => {
                if (err) done(err);
                expect(response.statusCode).to.equal(201);
                done();
            });
    });
});