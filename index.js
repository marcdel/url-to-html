exports.handler = function(event, context) {
  context.succeed({url: event.url, bucket: event.bucket});
}
