/*
* @Author: Caibiy
* @Date:   2018-08-20 17:29:49
* @Last Modified by:   Caibiy
* @Last Modified time: 2018-08-20 18:10:15
*/
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true,dock:false })
var storedCookies = {}
nightmare
  .goto('https://www.baidu.com')
  .click('#u1 > a.lb')
  .wait('#TANGRAM__PSP_10__footerULoginBtn')
  .click('#TANGRAM__PSP_10__footerULoginBtn')
  .type('#TANGRAM__PSP_10__userName','17326191153')
  .type('#TANGRAM__PSP_10__password','jiaDONG1234&')
  .click('#TANGRAM__PSP_10__submit')
  .wait(25000)
  .cookies.get()
  .then((cookies)=>{
   console.log(cookies)
  storedCookies = cookies;
}).end()
// Second instance:
var nightmare2 = Nightmare({show: true})

for(var i = 0; i < storedCookies.length; i++){
console.log("name: "+storedCookies[i].name+",value: "+storedCookies[i].value); 
   nightmare2.
        cookies.set(storedCookies[i].name, storedCookies[i].value);
}
/*
  .goto('http://tieba.baidu.com/f?kw=%E6%88%92%E8%89%B2&ie=utf-8')
  .wait('.col2_left j_threadlist_li_left:first-child a')
   .click('.col2_left j_threadlist_li_left:first-child a')
    .type('#j_editor_for_container','111')
  .end()
  .catch(error => {
    console.error('Search failed:', error)
  });
*/
