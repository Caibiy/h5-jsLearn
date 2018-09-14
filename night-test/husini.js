const Nightmare = require('nightmare')
var nightmare = Nightmare({show: true})
var domainnames = {
	0:{
		'href':'http://www.28.com/',
		'selector':'.jin-fl.tuijian>ul>li',
		'input':'input.callPhone',
		'button':'#clickphone'
	},1:{
		'href':"http://bd.98r.cn",
		'selector':'dl.zoom>dd',
		'input':'#message_callPhoneNum',
		'button':'#message_callSubmit'
	},2:{
		'href':"http://www.redian360.com/",
		'selector':'.main_lf>ul>li',
		'input':'#message_callPhoneNum',
		'button':'#message_callSubmit'
	}
}
domainnames.getPropertyCount = function(){
	var n,count=0;
	var _ = this;
	for(n in _){
		if(_.hasOwnProperty(n)){
			count++
		}
	}
	return count;
}
console.log(domainnames.getPropertyCount()-1);
	husini(0,domainnames.getPropertyCount()-1);

function husini(index,length){
	nightmare.goto(domainnames[index%domainnames.getPropertyCount()].href)
			.evaluate(
				(domainnames,index,length)=>{
					//alert(index);
					return document.querySelectorAll(domainnames[index%length].selector)[index%document.querySelectorAll(domainnames[index%length].selector).length].querySelector('a').href}
					//return document.querySelectorAll(domainnames[index].selector)[0].querySelector('a').href;
				,domainnames,index,length
			)
			.then(href=>{
				console.log(href)
				nightmare.goto(href)
						  .wait(5000)
						  .evaluate((domainnames,index,length)=>{
									$(domainnames[index%length].input)[0].val("17326191153");
									$(domainnames[index%length].button)[0].trigger("click");
									return index+":"+length+":"+(index%length)
						  },domainnames,index,length)
			.then(va=>console.log(va))
				index++;
				husini(index,length);
			})
}