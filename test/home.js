// Test Case for Home API
process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const chai = require('chai');
const app = require('../app');

const request = supertest(app);

const { expect } = chai;

describe('Home API test cases', () => {
  before((done) => {
    app.on('appStarted', () => {
      done();
    });
  });
  after(() => {
    process.exit();
  });

  it('should return 404 page', (done) => {
    request
      .get('/random-url')
      .expect(404, done);
  });

  it('should return 400 when params are missing', (done) => {
    request
      .post('/')
      .expect(400, done);
  });

  it('should return error when validation of startDate fail', (done) => {
    request
      .post('/')
      .send({
        startDate: 0,
        endDate: '2018-02-02',
        minCount: 2700,
        maxCount: 3000,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.be.eq('startDate:Invalid value');
        done();
      });
  });

  it('should return error when validation of endDate fail', (done) => {
    request
      .post('/')
      .send({
        startDate: '2018-02-02',
        endDate: 'x',
        minCount: 2700,
        maxCount: 3000,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.be.eq('endDate:Invalid value');
        done();
      });
  });

  it('should return error when validation of minCount fail', (done) => {
    request
      .post('/')
      .send({
        startDate: '2018-02-02',
        endDate: '2019-02-02',
        minCount: true,
        maxCount: 3000,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.be.eq('minCount:Invalid value');
        done();
      });
  });

  it('should return error when validation of maxCount fail', (done) => {
    request
      .post('/')
      .send({
        startDate: '2018-02-02',
        endDate: '2019-02-02',
        minCount: 0,
        maxCount: false,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.be.eq('maxCount:Invalid value');
        done();
      });
  });

  it('should return error when startDate > endDate', (done) => {
    request
      .post('/')
      .send({
        startDate: '2019-01-26',
        endDate: '2018-02-02',
        minCount: 2700,
        maxCount: 3000,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.be.eq('endDate:End Date cannot be less than start date');
        done();
      });
  });

  it('should return error when maxCount < minCount', (done) => {
    request
      .post('/')
      .send({
        startDate: '2016-01-26',
        endDate: '2018-02-02',
        minCount: 3100,
        maxCount: 3000,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.be.eq('maxCount:Max count cannot be less than min count');
        done();
      });
  });

  it('should return records when correct params are passed', (done) => {
    request
      .post('/')
      .send({
        startDate: '2016-01-26',
        endDate: '2018-02-02',
        minCount: 2700,
        maxCount: 3000,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.records.length).to.be.greaterThan(0);
        expect(Object.keys(res.body.records[0])).to.be.eql(['key', 'createdAt', 'totalCount']);
        done();
      });
  });
});
