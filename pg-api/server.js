var compression = require('compression');
var express = require('express');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler')

var api = require('./routes/api');

const PORT =  3000;

// var index = require('./routes/index');
// var users = require('./routes/users');

// Security Application
// References: http://scottksmith.com/blog/2014/09/21/protect-your-node-apps-noggin-with-helmet/
var helmet = require('helmet');

var app = express();

app.use(compression());

app.use(helmet());
// HTTP access control (CORS)
// The Cross-Origin Resource Sharing (CORS) mechanism gives web servers cross-domain access controls,
//  which enable secure cross-domain data transfers. Modern browsers use CORS in an API container 
// - such as XMLHttpRequest or Fetch - to mitigate risks of cross-origin HTTP requests
app.use(cors())

// error handler
/*
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); */

// error handling middleware should be loaded after the loading the routes
if (app.get('env') === 'development') {
  app.use(errorHandler());
  console.log('errorHandle loaded!');
}

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))  // combined
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use( (req, res, next ) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', api);

app.listen( PORT, () => console.log('Listening on port' + PORT) );

module.exports = app;
