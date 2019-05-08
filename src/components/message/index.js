/*
 * @Author: mikey.zhaoqi 
 * @Date: 2019-04-23 14:37:38 
 * @Last Modified by: mikey.zhaoqi
 * @Last Modified time: 2019-04-23 14:40:17
 * @使用$message即可调用插件
 * @成功调用$message.success(),参数传入想显示的文本值即可
 * @失败调用$message.error(),参数传入想显示的文本值即可
 * @警告调用$message.warning(),参数传入想显示的文本值即可
 */

import Vue from 'vue';
import message from './message.vue';
let MessageObj = Vue.extend(message);
MessageObj.prototype.success = function (str = 'succsee') {
  this.show = true;
  this.issuccess = true;
  this.iserror = false;
  this.iswarning = false;
  this.text = str;
  setTimeout(() => {
    this.show = false
  }, 1500)
}
MessageObj.prototype.error = function (str = 'success') {
  this.show = true;
  this.issuccess = false;
  this.iserror = true;
  this.iswarning = false;
  this.text = str;
  setTimeout(() => {
    this.show = false
  }, 1500)
}
MessageObj.prototype.warning = function (str = 'success') {
  this.show = true;
  this.issuccess = false;
  this.iserror = false;
  this.iswarning = true;
  this.text = str;
  setTimeout(() => {
    this.show = false
  }, 1500)
}

let Message = new MessageObj({
  el: document.createElement('div'),
  watch: {
    show(p) {
      if (p) {
        document.body.appendChild(this.$el)
      }
    },
    of(p) {
      if (p) {
        document.body.removeChild(this.$el)
      }
    }
  }
})
// console.log(new MessageObj)
export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$message', {
      value: Message
    })
    // Vue.prototype.$message = Message;
  }
}