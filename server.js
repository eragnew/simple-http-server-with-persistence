'use strict';

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {

  if (req.method === 'POST') {

    var parsed;
    if (req.url === '/') {
      var filename = 'index';
    } else {
      var filename = req.url.slice(1);
    }

    console.log('POST request received at ' + req.url + ' with data:');

    req.on('data', function(data) {
      parsed = JSON.parse(data);
      console.log(data.toString());
      fs.writeFile(__dirname + '/data/' + filename + '.json', JSON.stringify(parsed), function(err) {
        if (err) return console.log(err);
      });
    });
    req.on('end', function() {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify({response: 'Ok'}));
      console.log('data saved...');
      return res.end();
    });

  } else {

    if (req.url === '/') {
      var filename = 'index';
    } else {
      var filename = req.url.slice(1);
    }
    var fileData;

    console.log('GET request received at ' + req.url + '. data sent back:');

    try {
      fileData = fs.readFileSync(__dirname + '/data/' + filename + '.json');
    } catch (e) {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify({response: 'file not found :('}));
      console.log(JSON.stringify({response: 'file not found :('}));
      return res.end();
    }

    console.log(JSON.parse(fileData));

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(fileData);
    res.end();

  }

});

server.listen(3000, function() {
  console.log('Server running on 3000...\n\n');
});






