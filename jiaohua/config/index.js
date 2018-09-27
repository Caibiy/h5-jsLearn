module.exports = {
	database:process.env.db||"mongodb://pi:pi1234@ds115753.mlab.com:15753/jiaohua",
    secret:process.env.secret||"secret_jiaohua",
	port:process.env.PORT||"80",
}