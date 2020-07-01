const express = require('express');
const app = express();
const port = 3000;
var path = require('path'); // built-in node module


bodyParser = require('body-parser');


// use applies middleware
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json());

// cors middleware: cross origin requests enabled on api
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


let comments = [{id: 0, comment: "hello pal"}, {id: 1, comment: "how are you?"}];


// app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.js'));
});






// app.get("/data", function(req, res){
//     console.log("ROUTE HIT");
//     res.json({message: "hello"})
// });

app.get("/data", function(req, res){
    console.log("ROUTE HIT");
    res.json({comments});
});

app.post("/data", function(req, res){
    console.log("posting comment route hit");
    var id= comments.reduce((accumComment, nextComment) => {
        return accumComment > nextComment.id ? accumComment : nextComment.id;
    }, 0) + 1;
    comments.push({id, comment: req.body.comment});
    console.log(comments);
    res.json({message: "comment posted successfully"});
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
