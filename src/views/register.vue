<template>
  <dir class="register">
      <input type="text" v-model="username" placeholder="请输入账号">
      <input type="password" v-model="password" placeholder="请输入密码">
      <input type="text" v-model="identity" placeholder="请输入身份证件号码">
      <button @click="register">
          注册
      </button>
      <router-link to="/login">已有账号，直接登录</router-link>
  </dir>
</template>

<script>
export default {
  name: 'register',
  components: {
    
  },
  data(){
    return {
        username:'',
        password:'',
        identity:'',
    }
  },
  mounted(){
  },
  methods:{
      register(){
          if(this.username&&this.password&&this.identity){

          }else{
              this.warning.open('账号、密码或证件号不能为空')
          }
      }
  },
}
</script>
<style lang="scss" scoped>
.register{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 30px;
    button{
        margin: 15px 0;
        width: 100%;
        height: 40px;
        background: rgb(69, 100, 240);
        border: none;
        font-size: 15px;
        border-radius: 5px;
        outline: none;
        color: #fff;
    }
    input{
        width: 100%;
        height: 40px;
        margin-top: 15px;
        font-size: 15px;
        border-radius: 5px;
        border: none;
        outline: none;
        background: #eee;
        box-sizing: border-box;
        padding-left: 15px;
    }
}
</style>