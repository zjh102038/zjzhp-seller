<template>
   <div class="select">
       <div @click="()=>headelClick('title')" class="title">
           {{val?val:'没有数据'}} {{open?'▼':'▲'}}
       </div>
       <div v-if="open" class="opentionList">
           <span @click="()=>headelClick('span',index)" v-for="(item,index) in options" :key="index"> 
               {{item}}
           </span>
       </div>
   </div>
   
</template>
<script>
export default {
  props:['options'],
  data(){
      return {
          open:false,
          val:this.options[0]
      }
  },
  methods:{
    headelClick(type,index){
        if(type=="span"){
            this.val=this.options[index]
            this.$emit('selectChange',this.val)
        }
        this.open=!this.open
    }
  }
}
</script>
<style lang="scss" scoped>
.select{
    width: auto;
    padding: 2px 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    display: inline-block;
    position: relative;
}
.opentionList{
    position: absolute;
    width: 100%;
    border: 1px solid #ccc;
    border-top: none;
    display: flex;
    flex-direction: column;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    top: 25px;
    left: 0;
    span{
        border-bottom:1px solid #ccc;
        height: 25px;
        text-align: center;
        line-height: 25px;
    }
    span::hover{
        background: skyblue;
    }
}
</style>


