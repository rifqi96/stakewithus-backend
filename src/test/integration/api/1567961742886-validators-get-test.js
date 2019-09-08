const expect = require('chai').expect;
const server = require('../../../app');
const request = require('supertest')(server);

describe('Validator GET API', () => {
    it('should get a validator', done => {
        const validatorAddress = '00B587BAA478C3FCD0A1AE34658764BCE01A2A41';
        request
            .get(`/api/v1/validators/${validatorAddress}`)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err) done(err);
                expect(response.body)
                    .to.be.an.instanceOf(Object)
                    .that.has.keys([ 'id', 'address', 'pubKey', 'proposerPriority', 'VotingPowers', 'createdAt', 'updatedAt' ]);
                expect(response.body.id).to.be.a('number');
                expect(response.body.address).to.be.a('string');
                expect(response.body.pubKey).to.be.an('object');
                expect(response.body.proposerPriority).to.be.a('number');
                expect(response.body.VotingPowers).to.be.an('array').that.is.not.empty;
                expect(response.body.VotingPowers[0]).to.have.keys([ 'id', 'value', 'createdAt', 'updatedAt', 'ValidatorId' ]);
                expect(response.body.VotingPowers[0].id).to.be.a('number');
                expect(response.body.VotingPowers[0].value).to.be.a('number');
                expect(response.statusCode).to.equal(200);
                done();
            });
    });
    it('should return 404 resource not found', done => {
        const validatorAddress = 'wrongAddress';
        request
            .get(`/api/v1/validators/${validatorAddress}`)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err) done(err);
                expect(response.body.message).to.equal('Resource is not found');
                expect(response.statusCode).to.equal(404);
                done();
            });
    });
});