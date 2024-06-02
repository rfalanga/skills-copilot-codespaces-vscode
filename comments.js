// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var comments = [];

http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    if (pathname == '/') {
        fs.readFile('./index.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (pathname == '/comment') {
        var comment = '';
        req.setEncoding('utf8');
        req.on('data', function (chunk) {
            comment += chunk;
        });
        req.on('end', function () {
            var params = querystring.parse(comment);
            comments.push(params.comment);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Success');
        });
    } else if (pathname == '/getComments') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(comments));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
}).listen(1337, '