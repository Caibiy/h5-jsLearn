const mongoose = require('mongoose');

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
	},datetime:{
		type:String,
		required:true
	}
const Dht = mongoose.model("Dht",dhtSchema);
module.exports = Dht;
//插入一条数据
module.exports.insertData = function(nDht,callback){
	nDht.save(callback);
}
//根据日期查询数据
module.exports.queryDataByDate = function(date,callback){
	var query = {date:date};
	Dht.findOne(query,callback);
}
