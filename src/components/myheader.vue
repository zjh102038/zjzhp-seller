<template>
  <header>
    <span @click="go">
      <i class="icon iconfont icon-angle-left"></i>
    </span>
    <h3>{{title}}</h3>
    <slot></slot>
  </header>
</template>
<script>
export default {
  props:['title'],
  methods:{
    go(){
      this.$router.go(-1)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../fonts/iconfont.css";
header {
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    background:white;
    z-index: 999;
    h3{
      font-size: 18px;
    }
    i.icon{
      font-size: 30px;
      font-weight: normal;
    }
  }
</style>


