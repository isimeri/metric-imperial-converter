const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../index');   //use this locally
// const server = 'https://metric-imperial-converter.isimeri.repl.co';  //use this when on replit

chai.use(chaiHttp);

suite('Functional Tests', function() {

  test('should convert a valid input such as 10L', function(done) {
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

  test('should not convert an invalid input such as 32g --- invalid unit', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=32g')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid unit");
        done();
      });
  });

  test('should not convert an invalid input such as 3/7.2/4kg --- invalid number', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number");
        done();
      });
  });

  test('should not convert an invalid input such as 3/7.2/4kilomegagram --- invalid number and unit', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number and unit");
        done();
      });
  });

  test('should convert an input with no number such as kg --- default to 1', function(done) {
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
