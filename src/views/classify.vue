<template>
  <div class="classify">
    <!-- 用于放置header组件 -->
    <MyHeader title="分类管理">
        <span></span>
    </MyHeader>
    <main class="content">
        <div>
            <div v-for="v in this.classArr" :key="v.cat_id">
                <div>
                    <h2>分类名称：{{v.cat_name}}</h2>
                    <p>添加时间：{{v.create_time}}</p>
                </div>
                <div></div>
                <div>
                    <span @click="handAlter(v.cat_id,v.cat_name)" class="icon iconfont">&#xe6c5;</span>
                    <span></span>
                    <span class="icon iconfont" @click="delClass(v.cat_id)">&#xe602;</span>
                </div>
            </div>
           
        </div>
    </main>
    <MyPop v-if="open" cancel="取消" confirm="保存" title="填写分类名称" @addconfirm="addconfirm" @addcancel="addcancel">
        <input v-model="val" class="classify" placeholder="填写分类名称"/>
    </MyPop>
     <MyPop v-if="alterOpen" cancel="取消" confirm="确认修改" title="填写分类名称" @addconfirm="alterOk" @addcancel="alterNo">
        <input v-model="alterVal" class="classify" placeholder="填写分类名称"/>
    </MyPop>
    <footer @click="headelClick">
        添加分类
    </footer>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import MyPop from '../components/mypop'
import MyHeader from '../components/myheader'
export default {
  name: 'classify',
  components: {
    MyPop,MyHeader
  },
  data(){
    return {
      open:false,
      val:"",
      classArr:[],
      alterOpen:false,
      alterVal:'',
      alterId:''
    }
  },
  methods:{
     headelClick(){
         this.open=!this.open
     },
     addcancel(){
         this.open=false
     },
   
     addconfirm(){
        this.open=false
        //添加分类
        this.$http.put('/store/goods/cat.add',{
            store_id: this.store_id,
            cat_name: this.val
        }).then((res)=>{
            if(res.code===1){
                this.getclass()
            }
            console.log(res)
        })
    },
    //请求分类
    getclass(){
        this.$http.post('/store/goods/cat.list',{
            store_id: this.store_id,
        }).then((res)=>{
            if(res.code===1){
                this.classArr=res.result
                console.log(this.classArr)
            }
        })
    },
    //删除分类
    delClass(id){
        this.$http.delete('/store/goods/cat.delete',{
            data:{cat_id:id}
        }).then(res=>{
            if(res.code===1){
                this.getclass()
            }
        })
    },
     //编辑分类
    handAlter(id,name){
        this.alterId=id
        this.alterOpen=true,
        this.alterVal=name
    },
    alterNo(){
        console.log('no')
        this.alterOpen=false
    },
    alterOk(){
        console.log('yes')
        this.alterOpen=false
        this.$http.post('/store/goods/cat.edit',{
            cat_id:this.alterId,
            cat_name:this.alterVal
        }).then(res=>{
            if(res.code===1){
                this.getclass()
            }
        })
    },
  },
 
  mounted(){
   //请求分类
    this.getclass()
  },
  
}
</script>
<style lang="scss" scoped>
@import url('../font/font_zy38gtsnhbn/iconfont.css');
.classify{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    main{
        flex:1;
        overflow: hidden;
        &>div{
            width: 100%;
            box-sizing: border-box;
            padding: 10px 15px;
            &>div{
                height: 70px;
                box-sizing: border-box;
                padding: 10px;
                border:2px solid #eee;
                border-top:1px solid #eee;
                border-radius: 10px;
                margin-top: 5px;
                display: flex;
                justify-content: space-between;
                
                
                h2{
                    font-size: 17px;
                    height: 30px;
                    line-height: 30px;
                }
                p{
                    font-size: 14px;
                    color: #ccc;
                }
                 &>div:nth-of-type(3){
                width:70px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .icon{
                    font-size: 22px;
                    font-weight: 300;
                }
                .icon:nth-of-type(1){
                    font-size: 30px
                }
            }
            }
           
            div:not(:nth-of-type(1)){
                margin-top: 10px;
            }
        }
    }
    footer{
        width: 100%;
        height: 50px;
        background: #f2922f;
        text-align: center;
        line-height: 50px;
        color: #fff;
        font-size: 20px;
    }
}
</style>

