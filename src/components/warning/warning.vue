<template>
    <transition name="warning" @after-leave="endTransition">
        <div v-if="visibilitiy">
            {{text}}
        </div>
    </transition>
</template>

<script>
export default {
  name: 'warning',
  data(){
      return {
          visibilitiy:false,
          text:'',
          of:false
      }
  },
  methods:{
      endTransition(){
          this.of=true
      }
  }
}
</script>
<style lang="scss" scoped>
.warning-enter,.warning-leave-to{
    opacity: 0;
}
.warning-enter-to,.warning-leave{
    opacity: 1;
}
.warning-enter-active,.warning-leave-active{
    transition: opacity .5s
}
    div{
        box-sizing: border-box;
        padding: 0px 15px;
        line-height: 30px;
        position: fixed;
        top: 5px;
        left: 30px;
        width: 84%;
        height: 30px;
        border: 2px solid red;
        border-radius: 5px;
        color: red;
        background: rgb(184, 21, 143);
        z-index: 999;
    }
</style>

