<template>
  <div class="mark">
    <div class="pop">
      <h3>
        {{title}}
      </h3>
      <div class="pop-main">
        <slot></slot>
      </div>
      <div class="pop-footer">
        <button @click="addcancel">{{cancel}}</button>
        <button style='color:#F29434' @click="addconfirm">{{confirm}}</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['title','cancel','confirm'],
  methods:{
    addcancel(){
      this.$emit('addcancel')
    },
    addconfirm(){
      this.$emit('addconfirm')
    }
  }
}
</script>
<style lang="scss" scoped>
.mark{
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,.5);
  .pop{
    width: 280px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 5px;
    h3{
      width: 100%;
      height: 44px;
      text-align: center;
      line-height: 44px;
    }
    .pop-footer{
      width: 100%;
      height: 44px;
      display: flex;
      border-top: 1px solid #ccc;
      margin-top: 10px;
      button{
        flex: 1;
        border: 0;
        outline: none;
        background: white;
        border-right: 1px solid #ccc;
        color: #B1B1B1;
      }
    }
    .pop-main{
      padding: 10px;
      color: #B1B1B1;
      .classify{
        width:100%;
        height:40px;
        border-radius:5px;
        background:#eee;
        border:none;
        outline:none;
        font-size:15px;
        box-sizing:border-box;
        padding-left:15px
      }
    }
  }
}
</style>


