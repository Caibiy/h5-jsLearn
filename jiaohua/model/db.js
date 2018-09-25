var  sqlite3 = require("sqlite3");


var db = {
	DB_PATH: '../raspi_jiaohua.db',
	connection: null,
	connect: ()=>db.connection = new sqlite3.Database(db.DB_PATH),
	errorHandler: (err,res)=>{
		res.json({
			err:err.toString(),
			success:false}); 
	},
	getPast: function(){
		
	}

}