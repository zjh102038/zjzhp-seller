<template>
    <div>
        <input id="color-input-red" @click="headelClick" :checked="open" class="chat-button-location-radio-input" type="checkbox" name="color-input-red" value="#f0544d" />
        <label  for="color-input-red"></label >
    </div>
</template>
<script>
export default {
  data(){
      return {
          open:false
      }
  },
  methods:{
    headelClick(){
        this.open=!this.open
        this.$emit('checkboxChange',this.open)
    }
  }
}
</script>
<style lang="scss" scoped>

#color-input-red +label{
    display: block;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background: #59D9CF;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
}

#color-input-red:checked +label::before {
    display: block;
    content: "\2714";
    text-align: center;
    font-size: 16px;
    color: white
}
input[type=checkbox]{
	visibility: hidden;
}
</style>


