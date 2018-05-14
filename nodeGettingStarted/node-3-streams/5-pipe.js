var request = require('request');
var fs = require('fs');
var zlib = require('zlib');

//request('http://www.pluralsight.com/').pipe(fs.createWriteStream('C:/Users/steven/Documents/_ Sky/nodeGettingStarted/node-3-streams/pluralsight3.html'));
request('http://www.pluralsight.com/').pipe(zlib.createGzip()).pipe(fs.createWriteStream('C:/Users/steven/Documents/_ Sky/nodeGettingStarted/node-3-streams/pluralsight4.html'))
console.log("Done");