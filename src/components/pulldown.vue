<template>
  <div class="pulldown" :style='{width:width}' @click="addEvent">
    <div class="pulldown-option">
      {{text}}
    </div>
    <div class="pulldown-icon">
      <i class="icon iconfont icon-angle-down"></i>
    </div>
    <div class="pulldown-list" v-if='show' @click.stop>
      <li v-for="(v) in pulldownList" :key="v.cat_id" @click="addoption(v.cat_id)">{{v.cat_name}}</li>
      <!-- <li>
        哈哈
      </li> -->
    </div>
  </div>
</template>
<script>

export default {
  props:['width','pulldownList'],
  data(){
    return {
      show:false,
      list:[],
      text:'选择分类'
    }
  },
  methods:{
    addEvent(){
      this.show = !this.show
    },        
    addoption(id){
      console.log(id)
      let e = window.event;
      this.text = e.target.innerHTML;
      this.show = false;
      this.$emit('getcatid',id,this.text)
    }     
  },
}
</script>
<style lang="scss" scoped>
.pulldown{
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .pulldown-option{
    flex: 9;
  }
  i.icon{
    font-size: 20px;
  }
}
.pulldown-list{
  position: absolute;
  width: 100%;
  height: 150px;
  overflow-y: auto;
  top: 40px;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  li{
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
  }
}
</style>

