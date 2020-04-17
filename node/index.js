
require('newrelic');

const http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
const server = http.createServer(function (request, response) {
  const date = new Date().toString();
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end(`<!doctype html><head></head><body><h1>All that money, he money is the motive</h1> \n
  <h2>The date according to Node.js is:</h2>
  <p>${date} </p></body></html>
  `);
});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(3000);

// Put a friendly message on the terminal
console.log(`> Server running at http://127.0.0.1:3000/`);

// newrelic.shutdown({ collectPendingData: true }, function(error) {
//   process.exit()
// })

