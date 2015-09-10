'use strict';

var chai = require('chai');
var expect = chai.expect;
var chaiHTTP = require('chai-http');
var fs = require('fs');

require('../server');

chai.use(chaiHTTP);

var server_url = 'http://localhost:3000';

describe('POST requests', function() {

  var res;

  before(function(done) {
    chai.request(server_url)
      .post('/greet')
      .send({msg: 'hello world'})
      .end(function(response) {
        res = response;
        done();
      });
  });

  var fileData = fs.readFileSync('./data/greet.json');

  it('should connect with a 200 status code', function() {
    expect(res).to.have.status(200);
  });

  it('should save request data to JSON file', function() {
    expect(JSON.parse(fileData)).to.eql({msg: 'hello world'});
  });

  it('should return an "Ok" response', function() {
    expect(JSON.stringify(res.body)).to.eql('{"response":"Ok"}');
  });

});

describe('GET requests', function() {

  var res;

  before(function(done) {
    chai.request(server_url)
      .get('/greet')
      .end(function(response) {
        res = response;
        done();
      });
  });

  var fileData = fs.readFileSync('./data/greet.json');

  it('should connect with a 200 status code', function() {
    expect(res).to.have.status(200);
  });

  it('should retrieve a JSON file based on request.url', function() {
    expect(JSON.stringify(res.body)).to.eql(JSON.stringify(JSON.parse(fileData)));
  });

});


