/*
* @Author: Caibiy
* @Date:   2018-08-20 17:29:49
* @Last Modified by:   YJD
* @Last Modified time: 2018-08-20 18:10:15
*/
/*
nightmare
  .goto('https://www.baidu.com')
  .click('#u1 > a.lb')
  .wait('#TANGRAM__PSP_10__footerULoginBtn')
  .click('#TANGRAM__PSP_10__footerULoginBtn')
  .wait(20000)
  .click('#TANGRAM__PSP_10__submit')
  .wait(25000)
  .cookies.get()
  .then((cookies)=>{
   console.log(cookies)
  storedCookies = cookies;
})*/
// Second instance:
const Nightmare = require('nightmare')
const  arr = ['http://tieba.baidu.com/f?kw=%E8%A3%85%E4%BF%AE&ie=utf-8'
			  ,'http://tieba.baidu.com/f?kw=%D5%E3%BD%AD&fr=ala0&tpl=5'];
	(function(){
			var nightmare2 = Nightmare({show: true})
		  nightmare2.goto('https://www.baidu.com')
		  .click('#u1 > a.lb')
		  .wait('#TANGRAM__PSP_10__footerULoginBtn')
		  .click('#TANGRAM__PSP_10__footerULoginBtn')
		  .wait(2000)
		  .type('#TANGRAM__PSP_10__userName','279285839@qq.com')
		  .type('#TANGRAM__PSP_10__password','jiaDONG1234&')
		  .click('#TANGRAM__PSP_10__submit')
		  .wait(10000)
		  /**
		  
		  */
		tieba(nightmare2,1)
	})()

function tieba(nightmare2,index){
console.log(index%arr.length);
index++;
nightmare2
  .goto(arr[index%arr.length])
  .wait('a.j_th_tit ')
  .evaluate(()=>{return document.querySelectorAll("a.j_th_tit ")[Math.ceil((Math.random()*100)%4)+4].href})
  .then((href=>{
	  console.log(href);
	  nightmare2.goto(href)
	  //core_title_txt
	  .wait("h1.core_title_txt")
	  .type("#ueditor_replace","希望可以帮助到迷茫的人http://9ilu.com/zhuangx")
	  .click(".ui_btn_m")
	  .wait(15000)
	  .evaluate(()=>{
		  return document.querySelector('h1.core_title_txt').innerText;
	  })
	  .then((text)=>{
			 console.log(text);
			 tieba(nightmare2,index);
		  })

  }))
}


