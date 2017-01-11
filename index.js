var http = require('http');
var AWS = require('aws-sdk');

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
      var params = {
  			Bucket: event.bucket,
  			Key: event.fileName,
        Body: data
  		};

      var s3 = new AWS.S3();
      s3.putObject(params, function(err, data) {
        if (err) {
          context.fail({error: err})
        } else {
          context.succeed(params);
        }
      })
    });
  });

  req.on('error', function (e) {
    context.fail({error: e.message})
  });

  req.end();
}
