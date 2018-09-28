/**
api
**/
var express = require('express'),
	router = express.Router(),
	config = require('../config');

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();


    res.redirect('/');
}

module.exports = router;
