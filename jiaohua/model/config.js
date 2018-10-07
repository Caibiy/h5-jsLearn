const mongoose = require('mongoose'),
	execSync = require('child_process').execSync;
/**
 * 读取温湿度频率
 * 读取植物状态频率
 * 拍照间隔
 */
var configSchema = mongoose.Schema({
	id:{
		type:Number,
		required:true
	},
	photo:{
		type:Number,
		required:true
	},dht:{
		type:Number,
		required:true
	},plant:{
		type:Number,
		requireed:true
	}
})

const config = mongoose.model("config",configSchema);

module.exports = config;

module.exports.queryDefault = function(obj,callback){
	var query = {id:1};
	config.findOne(query,callback)
}
