/**
api
**/
var express = require('express'),
	router = express.Router(),
	config = require('../config'),
	execSync = require('child_process').execSync,
	dht = require('../model/dht');
var mLed;
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();


    res.redirect('/');
}
router.get('/dht/test',function(req,res){
res.send("hello");
})
/**/
router.get('/dht/current',function(req,res){
	var result = dht.readCurrent();
	if(result[0] && result[0]!="error"){
		res.json({
			success:true,
			data:result[1]
		});
	}else{
	
		res.json({
			success:false,
			data:result[1]
		
		});
	
	}
})
/**/
router.get('/dht/data/today',function(req,res){
	let date = new Date();
	var today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
	dht.getAll(today,function(err,datas){
		res.json(datas);
	})
})
/**/
router.get('/led/current',function(req,res){
	res.json({data:mLed.readSync()});
})
/**/
router.get('/tu/current',function(req,res){
	var result = execSync('./scripts/tu/status.py').toString();
	res.json({data:result});
})
module.exports = router;
module.exports.initLED = function(led){
	mLed = led;
}
