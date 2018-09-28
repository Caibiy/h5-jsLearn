// dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var server = require('http').Server(app)
var io = require('socket.io')(server)
var routes = require('./routes/index');
var jiaohua = require('./routes/jiaohua');

var app = express();
var config = require('./config')


app.set("view engine", "pug");
app.set("views", path.resolve(__dirname, "public"));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: config.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);


var User = require('./model/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// mongoose
mongoose.connect("mongodb://pi:pi1234@ds115753.mlab.com:15753/jiaohua");

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


io.on('connection',function(socket){
  socket.emit('news',{hello:'world'});
  socket.on('news2',function(data){
    console.log(data);
  })
})

app.listen(8080);
