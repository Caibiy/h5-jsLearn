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
const  arr = ['http://tieba.baidu.com/f?kw=%BA%BC%D6%DD&fr=ala0&tpl=5'];
	(function(){
			var nightmare2 = Nightmare({show: true})
		  nightmare2.goto('https://www.baidu.com')
		  .click('#u1 > a.lb')
		  .wait('#TANGRAM__PSP_10__footerULoginBtn')
		  .click('#TANGRAM__PSP_10__footerULoginBtn')
		  .wait(2000)
		  .type('#TANGRAM__PSP_10__userName','17326191153')
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
  .evaluate(()=>{return document.querySelectorAll("a.j_th_tit ")[Math.ceil((Math.random()*100)%4)+5].href})
  .then((href=>{
	  console.log(href);
	  nightmare2.goto(href)
	  //core_title_txt
	  /*
	  .click(document.querySelector('.lzl_link_unfold :nth-child(1)'))
	  .wait(".j_editor_for_container")
	  .type(".j_editor_for_container","希望可以帮助到迷茫的人http://www.9ilu.com/74.html")
	  .click(".lzl_panel_submit")
	  */
	  .wait("h1.core_title_txt")
	  .wait(10000)
	  .evaluate(()=>{
		  /*
		  $('.lzl_link_unfold :nth-child(1)').click();
		  $(".j_editor_for_container").text("http://www.9ilu.com/74.html");
		  $('.lzl_panel_submit').click();*/
		  var arr = $(".lzl_link_unfold");
		  for(var i=0;i<arr.length;i++){if(arr[i].innerText=="回复"){$(arr[i]).click();$(arr[i]).parent().parent().parent().find("#j_editor_for_container").text("aaa");$(arr[i]).parent().parent().parent().find(".lzl_panel_wrapper .lzl_panel_submit.j_lzl_p_sb").click();break;}}
	  })
	  .wait(1000)
	  .evaluate(()=>{
		   return document.querySelector('h1.core_title_txt').innerText;
	  })
	  .then((text)=>{
			 console.log(text);
			 tieba(nightmare2,index);
		  })

  }))
}


