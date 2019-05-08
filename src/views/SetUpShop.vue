<template>
  <div class="wrap">
   <MyHeader title="店铺设置">
        <span></span>
    </MyHeader>
    <main>
        <div>
            <div>
                <p>店铺LOGO</p>
                <a href="javascript:;" class="file">
                    <img :src="singe.logo" alt="">
                    <span>+</span>
                    <span>上传logo</span>
                    <input type="file" name="" id="" accept="image/png, image/jpeg, image/gif, image/jpg" @change="(e)=>logoChange(e,0)">
                </a>
            </div>
            <div class="banner">
                <p>店铺banner(1-3张)</p>
                <img v-for="(item,index) in bannerArr" :key="index" :src="item.src" alt="">
                <a href="javascript:;" class="file">
                    <span>+</span>
                    <span>上传banner</span>
                    <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="(e)=>logoChange(e,1)" name="" id="banner">
                </a>
            </div>
            <p class="set-ccc"></p>
            <div>
                <p>
                    <span>店铺名称</span>
                    <input type="text" v-model="singe.store_name" placeholder="请输入店铺名称">
                </p>
                <p>
                    <span>联系电话</span>
                    <input type="text" v-model="singe.contact_number" placeholder="请输入联系电话">
                </p>
                <p>
                    <span>配&nbsp;送&nbsp;费</span>
                    <input type="text" v-model="singe.delivery_fee" placeholder="请输入配送费">
                </p>
                <div class="set-time">营业周期</div>

                <div class="set-week" >
                    <span v-for="(item,index) in week"  :class="item.flag?'active':''" :key="index" @click.stop="spClick(index)">
                        {{item.title}}
                    </span>
                    <!-- <p v-for="item in week"><input type="checkbox" /><span>{{item}}</span></p> -->
                </div>
                <div class="set-timeslice">
                    <p>营业时间</p>
                    <div>
                        <select name="" id="">
                            <option value="08:00">08:00</option>
                        </select>
                        <span>至</span>
                        <select name="" id="">
                            <option value="22:00">22:00</option>
                        </select>
                    </div>
                </div>
                <div class="set-ageing"> 
                    <span>配送时效</span>
                    <select name="" id="">
                        <option value="15:00">15:00</option>
                        <option value="20:00">20:00</option>
                        <option selected="selected" value="30:00">30:00</option>
                        
                    </select>
                </div>
            </div>
            <p class="set-ccc"></p>
            <div class="set-type">
                <p>首页风格</p>
                <div>
                    <div>
                        <img src="/one.png" alt="">
                        <input type="radio" name="type" checked="checked" @click="()=>{singe.indexstyle_id=1}">
                    </div>
                    <div>
                        <img src="/two.png" alt="">
                        <input type="radio" name="type" @click="()=>{singe.indexstyle_id=2}">
                    </div>
                </div>
            </div>
        </div>
    </main>
    <footer @click="headelClick">
        保存
    </footer>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import MyHeader from '../components/myheader'
export default {
  name: 'SetUpShop',
  components: {
    MyHeader
  },
  data(){
    return {
      open:false,
      singe:{
          store_name:'',//店铺名
          brand_name:'',//品牌
          contact_number:'',//联系电话
          business_time:'',//营业时间
          indexstyle_id:1,//首页风格
          delivery_fee:'',//配送费
          logo:'',//店铺logo
          banner:'',// banner图 字符串格式 用逗号隔开
      },
      bannerArr:[],
      week:[{
          flag:true,
          title:'星期一'
      },{
          flag:true,
          title:'星期二'
      },{
          flag:true,
          title:'星期三'
      },{
          flag:true,
          title:'星期四'
      },{
          flag:true,
          title:'星期五'
      },{
          flag:true,
          title:'星期六'
      },{
          flag:true,
          title:'星期日'
      }]
    }
  },
  methods:{
      spClick(ind){//设置营业时间
          this.week[ind].flag=!this.week[ind].flag
          if(!this.week.some(item=>item.flag)){
              this.warning.open('必须有一天为营业')
              this.week[ind].flag=true
          }
      },
     logoChange(e,type){//type 0 为logo  1为banner
         try{
            let file = e.target.files[0];
            let filesize = file.size;
             let filename = file.name;
             if (filesize > 512000) {
                this.warning.open('图片大小不能超过50kb')
                return 
             }
            let reader = new FileReader();
             if(!type){//如果选中的是logo 就转为base64格式
             
             reader.onload =  (e)=>{
                this.singe.logo=e.target.result;
             }
             reader.readAsDataURL(file);
             }else{
                 if(this.bannerArr.length>=3){
                     this.warning.open('最多放置3张banner')
                     return
                 }
                const formData = new FormData();
                formData.append('files',file)
                this.loding.open()
                this.$http.post('/upload?store_id='+this.store_id,formData).then((res)=>{
                    this.loding.close()
                    if(res.code===1){
                        this.singe.banner+=res.url[0].url+","
                        this.bannerArr.push({
                            src:res.url[0].url
                        })
                    }
                })
                
             }
         }catch(err){

         }
         
     },
     headelClick(){
        let obj={
            store_id:this.store_id
        }
        for(let k in this.singe){
            if(this.singe[k]){
                obj[k]=this.singe[k]
            }
        }
        this.loding.open()
        this.$http.post('/store/decorate',obj).then((res)=>{
            this.loding.close()
            if(res.code==1){
                this.$router.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
     },
     getObjectURL(file) {
        var url = null ;
        // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
     },
     handchange(e){
        let file = e.target.files[0];
        let filesize = file.size;
        let filename = file.name;
        if (filesize > 2101440) {
    
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
            let imgcode = e.target.result;
            console.log(imgcode);
        }
     },
     handbanner(e){
        let file =e.target.files[0];
        this.bannerImg.push(file)
        console.log(this.bannerImg)
     },
    storename(e){
        this.store_name=e.target.value
    }
  },
  mounted(){
      new Bscroll('main',{
          click:true
      })
  }
}
</script>
<style lang="scss" scoped>
.wrap{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction:column;
    
    main{
        flex:1;
        overflow: hidden;
        &>div{
            width: 100%;
            &>div{
                width: 100%;
                box-sizing: border-box;
                padding: 10px;
            }
            &>div:nth-of-type(1){
                &>p{
                    width: 100%;
                    height: 30px;
                    font-size: 16px;
                }
            }
            &>div:nth-of-type(2){
                width: 100%;
                padding: 0;
                &>p{
                    width: 100%;
                    height: 30px;
                    font-size: 16px;
                    box-sizing: border-box;
                    padding-left: 10px;
                }
                &>a{
                    width: 100%;
                    height: 130px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
            }
             &>div:nth-of-type(3){
                width: 100%;
                padding: 0 0 0 10px;
                &>p{
                    width: 100%;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                    border-bottom: 1px solid #ccc;
                    &>span{
                        flex: 2;
                    }
                    &>input{
                        flex: 8;
                        margin-left:10px;
                        border: none;
                        outline: none;
                        width:100%;
                        height: 100%;
                    }
                }
            }
        }
    }
    footer{
        width: 100%;
        height: 50px;
        background: #f2922f;
        text-align: center;
        line-height: 50px;
        color: #fff;        font-size: 20px;
    }
}
.set-ccc{
    width: 100%;
    height: 10px;
    background: #ccc;
}
.set-time{
    width: 100%;
    height: 50px;
    line-height: 50px;
}
.set-week{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #ccc;
    span{
        width: 17%;
        border: 1px solid #ccc;
        border-radius: 5px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        margin-left: 7px;
    }
    span.active{
        border-color: #f2922f
    }
}

.set-timeslice{
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding: 0 10px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
}
.set-ageing{
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding: 0 10px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.set-type{
    width: 100%;
    height: 260px;
    &>div{
        width: 100%;
        display: flex;
        &>div{
            display: flex;
            flex-direction: column;
            align-items: center;
            &>img{
                width: 100%;
                height: 200px;
            }
           
        }
        &>div:nth-of-type(1){
            flex: 5;
            height: 200px;
        }
        &>div:nth-of-type(2){
            flex: 5;
            height: 200px;
        }
    }
}
.file {
    position: relative;
    background: #fff;
    border: 1px dashed #ccc;
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    color: #ccc;
    text-decoration: none;
    text-indent: 0;
    img{
        width: 100px;
        height: 100px;
        position: absolute;
        top: 0;
        left: 0;
    }
    span:nth-of-type(1){
        font-size: 50px;
    }
    span:nth-of-type(2){
        font-size: 12px;
    }
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.banner>img{
    width: 100%;
    height: 150px;
}
#banner{
    width: 100%;
    .file:hover {
        background: #AADFFD;
        border-color: #78C3F3;
        color: #004974;
        text-decoration: none;
    }
}
</style>
