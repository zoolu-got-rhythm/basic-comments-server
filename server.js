

var http = require('http');



var comments = [{id: 0, comment: "hello"}, {id: 1, comment: "how do you do?"}];

var server = http.createServer(function (req, res) {
    // res.header("Access-Control-Allow-Origin", "*");

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        'Content-Type': 'application/json'
    };
    // /** add other headers as per requirement */


    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    // if (['GET', 'POST'].indexOf(req.method) > -1) {
    //     res.writeHead(200, headers);
    //     res.end('Hello World');
    //     return;
    // }


    console.log("request made");
    if (req.url == '/data') { //check the URL of the current request
        res.writeHead(200, headers);
        res.write(JSON.stringify({comments}));
        res.end();
    }
});

server.listen(8080);

console.log('Node.js web server at port 8080 is running..');