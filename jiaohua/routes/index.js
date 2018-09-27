
var express = require('express'),
	router = express.Router(),
	config = require('../config');

	router.get("/",function(req,res){
		res.render("index", {
				data:"Let's fuck the world"
		});
	})

module.exports = router;
