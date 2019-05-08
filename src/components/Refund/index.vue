<template>
  <div class="refundBox">
    <header>
      <router-link to="/ordermanage">＜</router-link>
      <h4>退款成功</h4>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </header>
    <main>
        <div>
            <img src="/yes.jpg" alt="">
        </div>
        <p>
            退款成功
        </p>
        <button @click="toIndex">返回首页</button>
    </main>
  </div>
</template>
<script>
export default {
    name:'refund',
    methods:{
        toIndex(){
            console.log('000')
        }
    }
}
</script>
<style lang="scss" scoped>
.refundBox{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    header{
        width: 100%;
        height: 44px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
        a{
            font-size: 24px
        }
    }
    main{
        width: 100%;
        flex:1;
        display: flex;
        flex-direction: column;
        div{
            width: 100%;
            height: 120px;
            text-align: center;
            line-height: 120px;
            img{
                margin-top: 20px
            }
        }
        p{
            text-align: center
        }
        button{
            width: 125px;
            height: 44px;
            text-align: center;
            color:white;
            background: orange;
            border:none;
            font-size: 16px;
            margin: 30px auto
        }
    }
}
</style>

