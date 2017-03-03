//
// adapted from https://github.com/expressjs/serve-static
//

var httpRoot = 'app',
    portNumber = 8000,
    finalhandler = require('finalhandler'),
    http = require('http'),
    serveStatic = require('serve-static'),
    serve = serveStatic(httpRoot, {'index': ['index.html', 'index.htm']}),
    server = http.createServer(function onRequest (req, res) {
        serve(req, res, finalhandler(req, res))
    });

server.listen(portNumber);
console.log(`Server running at http://localhost:${portNumber}`);
