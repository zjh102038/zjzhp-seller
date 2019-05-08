<template>
  <transition name="message" @after-leave="endTransition">
    <div class="message" v-if="show">
      <svg class="icon svg-icon" aria-hidden="true" v-if='issuccess'>
        <use xlink:href="#icon-chenggong"></use>
      </svg>
      <svg class="icon svg-icon" aria-hidden="true" v-if='iserror'>
        <use xlink:href="#icon-cuowu"></use>
      </svg>
      <svg class="icon svg-icon" aria-hidden="true" v-if='iswarning'> 
        <use xlink:href="#icon-jinggao"></use>
      </svg>
      <p>{{text}}</p>
    </div>
  </transition>
</template>
<script>
import '../../font/font_jo0q7nxzjr/iconfont.js';
export default {
  data() {
    return {
      show: false,
      text: "",
      issuccess:true,
      iserror:false,
      iswarning:false,
      of:false
    };
  },
  methods:{
    endTransition(){
        this.of=true
    }
  }
};
</script>
<style lang="scss" scoped>
@import url("../../font/font_jo0q7nxzjr/iconfont.css");
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.message-enter,
.message-leave-to {
  opacity: 0;
}
.message-enter-to,
.message-leave {
  opacity: 1;
}
.message-enter-active,
.message-leave-active {
  transition: opacity 0.5s;
}
.message{
  height: 30px;
  min-width: 50px;
  max-width: 100%;
  // text-align: center;
  padding:0 5px;
  border-radius: 5px;
  background: white;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 10px;
  left: 50%;
  transform: translate(-50%,0);
  margin: auto;
  z-index: 999;
  border: 1px solid #ccc;
  .svg-icon{
    font-size: 25px;
    margin-right: 5px;
  }
}
</style>


