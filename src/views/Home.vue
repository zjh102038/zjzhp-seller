<template>
  <div class="home">
    <header>
      <div class="search">
        <span class="icon iconfont">&#xe611;</span>
        <span>{{address}}...<span class="icon iconfont">&#xe633;</span></span>
        <span class="icon iconfont">&#xe61c;</span>
      </div>
      <div>
         <div class="headPortrait">
            <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2060761043,284284863&fm=27&gp=0.jpg" alt="">
         </div>
         <div>
           <p>176142173498712</p>
           <p>超级管理员</p>
         </div>
      </div>
    </header>
    <div class="nam">
        <span>|</span>  指尖杂货铺
    </div>
    <main>
      <table>
        <tbody>
           <tr v-for="(item,index) in listArr" :key="index">
             <td v-for="(items,ind) in item" :key="items.name" @click="()=>hadelClick(items.path?items.path:'/',index,ind)">
               <div :style="{background:items.background}">
                  <span :style="{color:items.color}" :class="'icon iconfont '+items.icon" v-html="items.text"></span>
                  <span>{{items.name}}</span>
               </div>
             </td>
           </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
    
  },
  data(){
    return {
      location:"",
      Latitude:0,
      Longitude:0,
      listArr:[[{
        name:"接单",
        text:"&#xe64c;",
        path:'/ordermanage',
        color:"#f2922f",
        background:"#fff"
      },{
        name:"扫码",
        text:"&#xe619;",
        color:"#13d593",
        background:"#fff"
      },{
        name:"退款",
        icon:"icon-tuikuan",
        color:"#f2922f",
        background:"#fff"
      }],[{
        name:"店铺设置",
        path:"/SetUpShop",
        icon:"icon-dianpushezhi",
        color:"#1fabff",
        background:"#fff"
      },{
        name:"分类管理",
        icon:"icon-fenleiguanli",
        path:"/classify",
        color:"#ff6a41",
        background:"#fff"
      },{
        name:"添加商品",
        icon:"icon-tianjiashangpin",
         path:"Putaway",
        color:"#f2922f",
        background:"#fff"
      }],[{
        name:"商品列表",
        icon:"icon-weibiaoti--",
        path:"/addcommodity",
        color:"#ff6a41",
        background:"#fff"
      },{
        name:"收益报表",
        icon:"icon-shouyiguanli",
        path:'/reportform',
        color:"#13d593",
        background:"#fff",
        path:'/statement'
      },{
        name:"添加店铺",
        color:"#f2922f",
        path:"/createStore",
        background:"#fff",
        text:"&#xe666;"
      }],
      [{
        name:"我的店铺",
        color:"#e239ff",
        path:"/mystore",
        background:"#fff",
        icon:"icon-dianpu"
      },
      {
        name:"店铺列表",
        color:"#673ab7",
        path:"/allstore",
        background:"#fff",
        icon:"icon-dianpuduibi"
      }]],
      address:''
    }
  },
  watch:{
  },
  methods:{
     hadelClick(path,index,ind){
       this.listArr[index][ind].background="rgba(0,0,0,.1)"
       setTimeout(()=>{
          this.listArr[index][ind].background="#fff"
       },100)
       this.$router.push(path)
     },
     getLocation(){
        if (navigator.geolocation){
          navigator.geolocation.getCurrentPosition((position)=>{
            this.Latitude=position.coords.latitude
            this.Longitude=position.coords.longitude
            
          },(err)=>{
            
          },{
            enableHighAcuracy:true,
            maximumAge:1000
          });
        }
        else{
          this.location="Geolocation is not supported by this browser."
        }
     }
  },
  mounted(){
    //分类
    this.getLocation()
    new this.$BScroll('main',{
      click:true
    })
    //地理定位
    this.$http.get('/location?lat=39.9&lng=116.3').then(res=>{
      console.log(res,'地理定位')
      if(res.code === 1){
        this.address = res.result.address
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import url('../font/font_09xhjnfm9n1g/iconfont.css');
@import url('../font/font_s8u7vk24ya/iconfont.css');
@import url('../font/font_lbjlpw98zp/iconfont.css');
@import url('../font/font_cbcp96q0ar/iconfont.css');
.home{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  header{
    width:100%;
    height: 25%;
    display: flex;
    flex-direction: column;
    background: #f2922f;
    color: #fff;
    &>.search{
      width: 100%;
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      &>.icon{
        font-size: 20px;
      }
      span:not(:nth-of-type(2)){
        width: 40px;
        text-align: center;
      }
    }
    &>div:nth-of-type(2){
      flex: 1;
      box-sizing: border-box;
      padding-top: 30px;
      padding-bottom: 26px;
      display: flex;
      &>div:nth-of-type(2){
        flex: 1;
        box-sizing: border-box;
        padding-left: 15px;
        display: flex;
        flex-direction: column;
        p:nth-of-type(1){
          font-size: 17px
        }
        p{
          flex: 1;
        }
      }
      .headPortrait{
        width: 60px;
        height: 100%;
        margin-left: 15px;
        img{
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #ccc;
        }
      }
    }
  }
  .nam{
    width: 100%;
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    background: #eeeeee;
    box-sizing: border-box;
    padding-left: 15px;
    span{
      font-size:25px;
      font-weight: 900;
      color: yellowgreen;
    }
  }
  main{
    flex: 1;
    display: flex;
    overflow: hidden;
    flex-wrap: wrap;
    table{
      width: 100%;
      border-collapse:collapse;
      td{
        border-collapse:collapse;
        border: 1px solid #eee;
        height: 100px;
        text-align:center;
        line-height:100px;
        &>div{
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          .icon{
            width: 100%;
            height: 50px;
            font-size: 30px;
            line-height: 70px;
          }
          span:nth-of-type(2){
            width: 100%;
           height: 50px;
            line-height: 50px;
          }
        }
      }
    }
  }
}
</style>

