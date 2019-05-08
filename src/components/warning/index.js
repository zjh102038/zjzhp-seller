import Vue from 'vue'
import warning from './warning.vue'
let Profile=Vue.extend(warning)
Profile.prototype.open=function(str='error'){
    this.visibilitiy=true
    this.of=false
    this.text=str
    setTimeout(()=>{
        this.visibilitiy=false
    },1500)
}
let warnings=new Profile({
    el:document.createElement('div'),
    watch:{
        visibilitiy(p){
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
        Object.defineProperty(Vue.prototype,'warning',{
            value:warnings
        }) 
    }
}

