var http = require('http');

exports.handler = function(event, context) {
  var options = {
    host: event.host,
    path: event.path
  };

  var req = http.request(options, function (res) {
    var data = '';
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function () {
      context.succeed({url: event.host + event.path, data: data, bucket: event.bucket});
    });
  });

  req.on('error', function (e) {
    context.fail({error: e.message})
  });

  req.end();
}
