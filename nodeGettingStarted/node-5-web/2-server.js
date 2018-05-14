var fs = require('fs');

var http = require('http');
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    if (req.url === '/file.txt') {
        fs.createReadStream(__dirname + '/file.txt').pipe(res);
    } else if (req.url === "/beans") {
        res.end("Baked");
    } else {              /// Directory current script is running in
        res.end("Hello World");
    }
}).listen(process.env.PORT || 3000, process.env.IP || '127.0.0.1');

console.log("Server running!");