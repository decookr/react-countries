var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var api = require('./routes/api');

const PORT = 3000;


var app = express();

app.use(cors()); // allows certain cross-origin requests (DELETE fails without this)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', api);

app.listen(PORT, () => console.log('Listening on port', PORT));

module.exports = app;
