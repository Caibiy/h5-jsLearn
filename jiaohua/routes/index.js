const express = require('express');
const passport = require('passport');
const User = require('../model/user');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index', { user : req.user });
});

router.get('/signup', (req, res) => {
    res.render('signup', { user : req.user });
});

router.post('/signup', (req, res, next) => {
    User.register(new User({ username : req.body.username,root:false}), req.body.password	 ,(err, user) => {
        if (err) {
        	console.log(err.message);
          return res.render('signup', { error : err.message });
        }

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});


router.get('/login', (req, res) => {
	res.render('login', { user : req.user, error : req.flash('error')});

});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/ping', (req, res) => {
    res.status(200).send("pong!");
});

module.exports = router;
