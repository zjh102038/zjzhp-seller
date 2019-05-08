import Vue from 'vue'
import warning from './loding.vue'
let Profile=Vue.extend(warning)
Profile.prototype.open=function(){
    this.loding=true
    this.of=false
}
Profile.prototype.close=function(){
    this.loding=false
}

let loding=new Profile({
    el:document.createElement('div'),
    watch:{
        loding(p){
            if(p){
                document.body.appendChild(this.$el)
            }
        },
        of(p){
            if(p){
                document.body.removeChild(this.$el)
            }
        }
    }
})

export default {
    install(Vue){
        Object.defineProperty(Vue.prototype,'loding',{
            value:loding
        }) 
    }
}

