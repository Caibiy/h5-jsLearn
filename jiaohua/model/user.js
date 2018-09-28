const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    username: String,
    password: String,
    root:Boolean
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', User);
module.exports.generateHash=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};
module.exports.comparePassword=function(password,hashPassword,callback){
    bcrypt.compare(password,hashPassword,callback);
};


module.exports.addUser=function(newUser,callback){
    bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.getUserByName=function(name,callback){
    var query={name:name};
    User.findOne(query,callback)
}