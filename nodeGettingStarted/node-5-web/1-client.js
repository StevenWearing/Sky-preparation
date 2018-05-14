var http = require('http');

var options = {
    host: 'www.google.com',
    port: 80,
    path: '/',
    method: 'GET'
}

console.log("Going to make a request...");

http.get(options, function(response) {
    console.log(response.statusCode);
    response.pipe(process.stdout);
})

//req.end(); <--  need to close if you don't use http.get