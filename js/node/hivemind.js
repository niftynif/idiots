var fs = require('fs');
var net = require('net');
var http = require('http');

var autocomplete = function(query) {
  var results = "";
  var options = {
    hostname: 'suggestqueries.google.com',
    path: '/complete/search?client=youtube&hl=en&query='+query,
    method: 'GET'
  }
  var req = http.request(options, function(res) {
    res.on('data', function() {
      results = res.pipe(fs.createWriteStream('f.txt'))
    })
  })
  req.end();
}

var hivemind = net.createServer(function(c) {
  c.on('end', function() {
    console.log('hivemind sleeping');
  })
}).on('error', function(err) {
  console.log(err);
})

hivemind.listen(8124, function() {
  console.log('hivemind awake');
  autocomplete('why is donald trump');
})
