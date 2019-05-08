<template>
  <div class="footerpop">
    <div class="footerpop-wrap">
      <ul>
        <li v-for='(v,i) in list' :key='i' @click="addnav(i)">{{v}}</li>
      </ul>
      <button @click="close">关闭</button>
    </div>
  </div>
</template>
<script>
export default {
  props:['list'],
  methods:{
    addnav(i){
      this.$emit('addnav',i)
    },
    close(){
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.footerpop{
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  background: rgba(0,0,0,.5)
}
.footerpop-wrap{
  width:90%;
  position: absolute;
  bottom: 10px;
  left: 15px;
  ul{
    display: flex;
    flex-direction: column;
    background: white;
    margin-bottom: 10px;
    border-radius: 5px;
    li{
      height: 40px;;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items:center;
    }
  }
  button{
    width: 100%;
    height: 40px;
    border: 0;
    outline: none;
    background: white;
    border-radius: 5px;
  }
}
</style>


