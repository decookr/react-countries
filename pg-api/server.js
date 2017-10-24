const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const api = require('./routes/api');

const PORT = 5000;

const app = express();

// allows certain cross-origin requests (DELETE fails without this)
app.use(cors());

// body parser creating req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// all of our api routes are in ./routes/api
app.use('/api', api);

app.listen(PORT, () => console.log('Listening on port', PORT));
