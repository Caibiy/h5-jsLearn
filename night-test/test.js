/*
* @Author: Caibiy
* @Date:   2018-08-20 17:29:49
* @Last Modified by:   Caibiy
* @Last Modified time: 2018-08-20 18:10:15
*/
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true,dock:false })

nightmare
  .goto('https://www.baidu.com')
  .click('#u1 > a.lb')
  .wait('#TANGRAM__PSP_10__footerULoginBtn')
  .click('#TANGRAM__PSP_10__footerULoginBtn')
  .type('#TANGRAM__PSP_10__userName','17326191153')
  .type('#TANGRAM__PSP_10__password','111')
  .click('#TANGRAM__PSP_10__submit')
  .wait('#s_menu_mine > div.mine-text')
  .evaluate(() => document.querySelector('#s_menu_mine > div.mine-text').innerHTML)
  .end()
  .then(console.log)
  .catch(error => {
    console.error('Search failed:', error)
  })
