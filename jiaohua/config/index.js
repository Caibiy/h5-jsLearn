module.exports = {
	database:process.env.db||"mongodb://localhost:27017/test",
    secret:process.env.secret||"secret_jiadongyang",
	port:process.env.PORT||"80",
}