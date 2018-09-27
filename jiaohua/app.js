const express = require("express");
const path = require("path");
const pug = require('pug');
const app = express();
const bodyParser = require('body-parser')
const { exec } = require('child_process')
const config = require('./config')
const mongoose = require('mongoose')
const routes = require("./routes/index")
app.engine('pug', require('pug').__express)

app.set("view engine", "pug");
app.set("views", path.resolve(__dirname, "public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

app.engine("html", pug.renderFile);

/*mongoose.connect(config.database);
mongoose.connection.on('connected',function(){
      console.log('Database is connected: '+config.database);
});
mongoose.connection.on('error',function(error){
      console.log('Database error:'+error);
});
*/

app.use(function(req, res, next) {
    res.locals.userAgent = req.headers["user-agent"];
    next();
});


app.use("/",routes)

app.use(function(req, res) {
    res.status(404);
    res.render("404", {
        urlAttempted: req.url
    });
});
app.listen(3000);
