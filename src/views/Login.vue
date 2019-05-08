<template>
  <dir class="login">
      <input type="text" v-model="username" placeholder="请输入账号">
      <input type="password" v-model="password" placeholder="请输入密码">
      <div>
          <input type="text" v-model="captcha" placeholder="请输入图形验证码"> 
          <div >
              <div v-html="svg">

              </div>
          </div>
      </div>
      <button @click="login">
          登录
      </button>
      <router-link to="/register">没有账号，立即注册</router-link>
  </dir>
</template>
<script>
export default {
  name: 'login',
  components: {
  },
  created(){
      this.$http.get('/buyer/user/captcha').then(res=>{
          this.svg=res.data
      })
  },
  data(){
    return {
        username:'',
        password:'',
        captcha:'',
        svg:''
    }
  },
  methods:{
      login(){
          if(this.username&&this.password){
             this.loding.open()
             setTimeout(()=>{
                 this.loding.close()
             },2000)
          }else{
              this.$message.error("用户名或账号不能为空")
          }
      }
  },
}
</script>
<style lang="scss" scoped>
.login{
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
    &>div{
        height: 60px;
        margin: 15px 0;
        display: flex;
        align-items: center;
        input{
            width:40%;
            height: 40px;
            font-size: 12px;
            border-radius: 5px;
            border: none;
            outline: none;
            background: #eee;
            box-sizing: border-box;
            padding-left: 15px;
        }
        &>div{
            flex:1;
            display: flex;
            justify-content: center;
            align-items: center;
            &>div{
                width: 60%;
                height: 100%;
            }
        }
    }
    &>input{
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

