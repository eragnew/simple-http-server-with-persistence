'use strict';

var chai = require('chai');
var expect = chai.expect;
var chaiHTTP = require('chai-http');
var fs = require('fs');

require('../server');

chai.use(chaiHTTP);

var server_url = 'http://localhost:3000';

describe('POST requests', function() {

  it('should accept a POST request and save the request body to file', function(done) {
    chai.request(server_url)
      .post('/greet')
      .send({msg: 'hello world'})
      .end(function(res) {
        fs.readFile('./data/greet.json', function(err, data) {
          if (err) return console.log(err);
          expect(res).to.have.status(200);
          expect(JSON.parse(data)).to.eql({msg: 'hello world'});
          expect(JSON.stringify(res.body)).to.eql('{"response":"Ok"}');
          done();
        });
      });
  });

  // var res;

  // before(function(done) {
  //   chai.request(server_url)
  //     .post('/greet')
  //     .send({msg: 'hello world'})
  //     .end(function(response) {
  //       res = response;
  //       done();
  //     });
  // });

  // var fileData = fs.readFileSync('./data/greet.json');

  // it('should connect with a 200 status code', function() {
  //   expect(res).to.have.status(200);
  // });

  // it('should save request data to JSON file', function() {
  //   expect(JSON.parse(fileData)).to.eql({msg: 'hello world'});
  // });

  // it('should return an "Ok" response', function() {
  //   expect(JSON.stringify(res.body)).to.eql('{"response":"Ok"}');
  // });

});

describe('GET requests', function() {

  it('should accept a GET request and send back the contents of a file', function(done) {
    chai.request(server_url)
      .get('/greet')
      .end(function(res) {
        fs.readFile('./data/greet.json', function(err, data) {
          if (err) return console.log(err);
          expect(res).to.have.status(200);
          expect(JSON.stringify(res.body)).to.eql(JSON.stringify(JSON.parse(data)));
          done();
        });
      });
  });

  // var res;

  // before(function(done) {
  //   chai.request(server_url)
  //     .get('/greet')
  //     .end(function(response) {
  //       res = response;
  //       done();
  //     });
  // });

  // var fileData = fs.readFileSync('./data/greet.json');

  // it('should connect with a 200 status code', function() {
  //   expect(res).to.have.status(200);
  // });

  // it('should retrieve a JSON file based on request.url', function() {
  //   expect(JSON.stringify(res.body)).to.eql(JSON.stringify(JSON.parse(fileData)));
  // });

});


