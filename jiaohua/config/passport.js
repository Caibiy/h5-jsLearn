var LocalStrategy   = require('passport-local').Strategy;
var User = require('../model/user');

module.exports = function(passport) {
	//序列化用户
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  //反序列化用户
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'name',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, name, password, done) {
    process.nextTick(function() {
      User.findOne({ 'local.name' :  name }, function(err, user) {
        if (err)
          return done(err);
        if (user) {
          console.log("Register");
          return done(null, false, {message:"该用户已经注册"});
        } else {
          var newUser = new User();
          newUser.local.name    = name;
          newUser.local.password = User.generateHash(password);
          newUser.local.root = false;
          newUser.save(function(err) {
            if (err)
            throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField : 'name',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, name, password, done) {
    User.findOne({ 'local.name' : name }, function(err, user) {
      if (err)
        return done(err);

      if (!user)
        return done(null, false, req.flash('loginMessage', '找不到该用户'));

      if (!user.validPassword(password))
        return done(null, false, req.flash('loginMessage', '密码错误.'));

      return done(null, user);
    });
  }));
};
