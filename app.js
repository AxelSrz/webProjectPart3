var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var quizzes = require('./routes/quizzes');

var app = express();

// view engine setup
app.set('port', process.env.PORT || 3003);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({resave: true,
                 saveUninitialized: true,
                 secret: 'SOMERANDOMSECRETHERE',
                 cookie: { maxAge: 3600000 }}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.index);
app.post('/startQuiz', quizzes.start);
app.post('/sendAnswer', quizzes.setAnswer);


var server = app.listen(3003, function() {
    console.log(new Date().toISOString() + ": server started on port 3003");
});

module.exports = app;
