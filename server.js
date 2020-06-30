

var http = require('http');



var comments = [{id: 0, comment: "hello"}, {id: 1, comment: "how do you do?"}];

var server = http.createServer(function (req, res) {
    // res.header("Access-Control-Allow-Origin", "*");

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    // res.setHeader('Access-Control-Allow-Headers', '*');


    console.log("request made");
    if (req.url == '/data') { //check the URL of the current request
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({comments}));
        res.end();
    }
});

server.listen(8080);

console.log('Node.js web server at port 8080 is running..');