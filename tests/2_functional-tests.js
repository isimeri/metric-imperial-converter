const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = 'https://metric-imperial-converter.isimeri.repl.co';

chai.use(chaiHttp);

suite('Functional Tests', function() {

  test('Valid GET request to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=10L')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        assert.approximately(res.body.returnNum, 2.64172, 0.1);
        assert.equal(res.body.returnUnit, "gal");
        done();
      });
  });

  test('Invalid Unit GET request to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=32g')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid unit");
        done();
      });
  });

  test('Invalid Number GET request to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number");
        done();
      });
  });

  test('Invalid Unit & Number GET request to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number and unit");
        done();
      });
  });

  test('No Numerical Input GET request to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=kg')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "kg");
        assert.approximately(res.body.returnNum, 2.20462, 0.1);
        assert.equal(res.body.returnUnit, "lbs");
        done();
      });
  });

});
