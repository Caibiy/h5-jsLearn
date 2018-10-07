// dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var routes = require('./routes/index');
var jiaohua = require('./routes/jiaohua');
var app = express();
var config = require('./config')
var server = require('http').Server(app);
var io = require('socket.io')(server);

var Gpio = require('onoff').Gpio;
var RaspiCam = require('raspicam');
var camera  = new RaspiCam({
	mode:"photo",
	output:"./photo/image.jpg",
	encoding:"jpg"
})
camera.start();
app.set("view engine", "pug");
app.set("views", path.resolve(__dirname, "public"));

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

app.use('/api/',jiaohua);
var User = require('./model/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// mongoose
mongoose.connect("mongodb://pi:pi1234@ds115753.mlab.com:15753/jiaohua");

//timestamp new Date().getTime()
//Date getFullYear() + getMoth()+1 +getDate()
console.log(new Date().getTime())
const dConfig = require('./model/config');
const dht = require('./model/dht')

dConfig.queryDefault({},function(err,obj){
	if(err)throw err;
	if(obj){
		setInterval(function(){
		var data = dht.readCurrent();
		if(data[0] && data[0]=='success'){
		const date = new Date();
		
		dht.insertData(new dht({
			temp:data[1].split(',')[0],
			humidity:data[1].split(',')[1],
			timestamp:date.getTime(),
			datetime:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
		}),function(err,obj){
			if(err)throw err;
		});}else{
			console.log("读取失败");
		}},obj.dht);
	}else{
		new dConfig({
			id:1,
			photo:1000*60*60,
			dht:1000*60*3,
			plant:1000*60*60*3
		}).save(function(err,obj){
		if(err) throw err})
	}
});


server.listen(8080);
var LED = new Gpio(23,'out');
jiaohua.initLED(LED);
io.on('connection',function(socket){
	var lightValue = LED.readSync();//LED status
	socket.on('light',function(data){
		lightValue = data;
		if(lightValue != LED.readSync()){
			LED.writeSync(lightValue);
		}
	})
	socket.emit('light',lightValue);
}
)

process.on('SIGINT',function(){
LED.writeSync(0);
LED.unexport();
process.exit();
})
