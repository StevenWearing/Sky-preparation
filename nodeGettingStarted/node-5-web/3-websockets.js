var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');

var handler = function(req, res) {
    fs.readFile(__dirname + "/index.html", function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        } else {
            res.writeHead(200);
            res.end(data);
        }
    });
};

var app = http.createServer(handler);
var io = socketio.listen(app);

// use this for vscode

io.sockets.on('connection', function(socket) {
    console.log("connection established...");

    socket.on('submit', function(data) {
        console.log("Submitted: " + data);
        socket.broadcast.emit('update-chat', data);
        socket.emit('update-chat', data);
    });
});

app.listen(8080);

console.log("Server running!");