var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: 'myhashsecret' })

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)

  var execOptions = {
      maxBuffer: 1024 * 1024 // Increase max buffer to 1mb
  };

  var child = execFile('deploy.sh', execOptions, function(error, stdout, stderr) {
      if ( error ) {
          console.log(error)
      }
  });
})