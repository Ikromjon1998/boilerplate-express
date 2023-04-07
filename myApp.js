require('dotenv').config()
var bodyParser = require("body-parser");
let express = require('express');
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    let string = `${req.method} ${req.path} - ${req.ip}`;
    console.log(string)
    next()
});

app.get('/', function(req, res){
    res.sendFile(__dirname + "/views/index.html");
});

console.log("Hello World");

app.get('/json', function(req, res) {
    let responseObj = {"message": "Hello json"};
  
    if (process.env.MESSAGE_STYLE === 'uppercase') {
      responseObj.message = responseObj.message.toUpperCase();
    }
  
    res.json(responseObj);
});

app.get('/now', function(req, res, next){
    req.time = new Date().toString();
    console.log(req.time);
    next();
}, function (req, res) {
    res.json(
        {
            time: req.time
        }
    );
});

app.get('/:word/echo', function(req, res) {
    const { word } = req.params;
    res.json({
        echo: word
    });   
});

/*app.get('/name', function(req, res) {
    var { first: firstName, last: lastName } = req.query;

    res.json({
        name: `${firstName} ${lastName}`
    });
});*/

app.post('/name', function(req, res){
    var { first: firstName, last: lastName } = req.body;

    res.json({
        name: `${firstName} ${lastName}`
    });
});


 module.exports = app;
