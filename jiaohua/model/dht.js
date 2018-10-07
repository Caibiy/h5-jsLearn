const mongoose = require('mongoose'),
	execSync = require('child_process').execSync;
/**
temp->温度
humidity->湿度
time->时间
date->日期
**/
var dhtSchema = mongoose.Schema({
	temp:{
		type:String,
		required:true
	},humidity:{
		type:String,
		required:true
	},timestamp:{
		type:Number,
		required:true
	},datetime:{
		type:String,
		required:true
	}
});

const Dht = mongoose.model("Dht",dhtSchema);
module.exports = Dht;
//插入一条数据
module.exports.insertData = function(nDht,callback){
	nDht.save(callback);
}
//根据日期查询数据
module.exports.queryDataByDate = function(date,callback){
	var query = {datetime:date};
	Dht.findOne(query,callback);
}
module.exports.getAll = function(date,callback){
	var query = {datetime:date};
	Dht.find(query).limit(7).exec(callback);
}
module.exports.readCurrent = function(){
	var result = execSync('./scripts/dht/current.py').toString().split('\n');
	return result;
}
