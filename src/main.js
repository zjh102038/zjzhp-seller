import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './utils/http'
import 'amfe-flexible';
import 'vconsole/dist/vconsole.min.js'
import 'echarts/dist/echarts.min.js'
import VConsole from 'vconsole'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import BScroll from 'better-scroll';
import message from './components/message/index';
import verify from './directive/verify';
import './index.scss';
import validator from './plugins/validator'
import loding from './components/loding'
import warning from './components/warning'
import {getCookie} from './utils/cookie'
//移动端调试工具
const vConsole = new VConsole()
//全局的 store_id 
Vue.prototype.store_id = 'b677754d0282970d81e285ef6297100d'
//全局的 uid 
Vue.prototype.uid = 'asdascxv123asd'

//挂载全局better-scroll
Object.defineProperty(Vue.prototype,'$BScroll',{
  value:BScroll
})
Vue.prototype.$store_id = 'b677754d0282970d81e285ef6297100d'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(http)
Vue.use(message)
Vue.use(verify,{
  classSuccess:'verify-success',
  classError:'verify-error',
  eventType:'blur',
  customValidRules:[
    {
      modifiers:'len',
      msg:'请输入小于10个字符的长度',
      valFn:function(value){
        return value.length > 0 && value.length <= 10
      }
    },
    {
      modifiers:'number',
      msg:'请输入正确的身份证号',
      valFn:function(value){
        return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
      }
    }
  ]
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
