var nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
        host:"smtp.exmail.qq.com",
        port:465,
        secure: true,
        auth:{
            user:'admin@gxvps.net',
            pass:'jiaDONG1234$'
        }
})

var mailoptions = {
    from:"admin@gxvps.net",
    to:"279285839@qq.com",
    subject:"Sending Email use Node.js",
    text:"fuck the world"
}
transporter.sendMail(mailoptions,function(err,info){
    if(err)console.log(err)
    console.log('Email sent:'+info);
})