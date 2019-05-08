<template>
    <div class="details">
        <my-header title="商品详情">
            <span></span>
        </my-header>
        <main  ref="warpper">
            <div class="details-content">
                <div class="warpper-top">下拉加载</div>
                <dl v-for="(s,i) in shuju" :key="i">
                    <dt @click="handFlag(i)">
                        <span>{{s.title}}</span>
                        <span v-if="s.flag" class="icon iconfont icon-shangjiantou"></span>
                        <span v-else class="icon iconfont icon-xiajiantou"></span>
                    </dt>
                    <dd v-show="s.flag">
                        <p v-for="(n,p) in s.content" :key="p"><span>{{n.type}}</span><span>{{n.messge}}</span><span @click="open=true" v-show="n.flag">修改</span></p>
                    </dd>
                </dl>
                
                 <div class="commodity-img">
                    <p @click="handImg">
                        <span>商品图片</span>
                        <span v-if="imgFalg" class="icon iconfont icon-shangjiantou"></span>
                        <span v-else class="icon iconfont icon-xiajiantou"></span>
                    </p>
                    <div v-show="imgFalg">
                        <p>商品大图</p>
                        <div>
                            <img :src="img" alt="">
                        </div>
                        <p>购物车图</p>
                        <div>
                            <!-- <img src="/4.jpg" alt=""> -->
                        </div>
                    </div>
                </div>
                 <div class="details-img">
                    <p @click="handbigImg">
                        <span>商品详情</span>
                        <span v-if="bigImg" class="icon iconfont icon-shangjiantou"></span>
                        <span v-else class="icon iconfont icon-xiajiantou"></span>
                    </p>
                    <div v-show="bigImg">
                        <!-- <img src="/5.jpg" alt=""> -->
                    </div>
                </div>
            </div>
        </main>
        <Dialog v-if="open" cancel="取消" title="修改销售价" confirm="确定" @addcancel="addcancel" @addconfirm="addconfirm">
            <input type="text" v-model="price" class="classify" placeholder="请输入要修改的价格">
        </Dialog>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import MyHeader from '../components/myheader'
    import Dialog from '../components/mypop'
    import Myheader from '../components/myheader.vue'
    export default {
        data(){
            return {
                open:false,
                price:0,
                data:{
                    image:''
                },
                shuju:[],
                img:'',
                imgFalg:true,
                bigImg:true
            }
        },
        components:{
            Dialog,
            "my-header":Myheader
        },
        methods:{
            addcancel(){
                this.open=false
            },
            addconfirm(){
                if(!this.price){
                    this.warning.open('价格不能为空')
                    return 
                }
                this.loding.open()
                this.$http.post('/store/goods/edit',{
                        goods_id:this.data.goods_id,
                        price:this.price
                     }).then(res=>{
                         this.$router.push('/')
                         this.loding.close()
                     }).catch(err=>{
                         //console.log(err)
                     })
                this.open=false
            },
            handFlag(i){
                this.shuju.map((item,index)=>{
                    if(index===i){
                        item.flag=!item.flag
                    }
                })
            },
            handImg(){
                this.imgFalg=!this.imgFalg
            },
            handbigImg(){
                this.bigImg=!this.bigImg
            }
        },
        created(){
            console.log(this.store_id)
            this.$http.post('/store/goods/list',{
                store_id:this.store_id
            }).then((res)=>{
                console.log(res)

                this.data=res.result.find(item=>item.goods_id==this.$route.query.id)
                this.price=this.data.price
                this.img=this.data.image
            let item=this.data
                this.shuju=[{
                title:"商品信息",
                flag:true,
                content:[{
                    type:"商品编号",
                    messge:"XW41241123241255",
                    flag:false
                },{
                    type:"商品名称",
                    messge:item.goods_name,
                    flag:false

                },{
                    type:"商品条形码",
                    messge:"41241123241255",
                    flag:false
                },{
                    type:"商品标签",
                    messge:"零食",
                    flag:false
                },{
                    type:"分类名称",
                    messge:"零食",
                    flag:false
                },{
                    type:"添加时间",
                    messge:item.update_time,
                    flag:false
                }]
            },{
                title:"价格消息",
                flag:true,
                content:[{
                    type:"销售价",
                    messge:"￥"+ this.price,
                    flag:true
                }]
            },{
                title:"规格消息",
                flag:true,
                content:[{
                    type:"重量",
                    messge:"10克",
                    flag:false
                },{
                    type:"存库",
                    messge:"299",
                    flag:false
                }]
            }]

            }).catch(err=>{
              //  console.log(err)
            })
        },
        mounted(){
            new BScroll(this.$refs.warpper,{
                click:true
            })
            //商品列表
            // console.log(this.data)
          
        },
        
    }
</script>

<style lang="scss" scoped>
  @import '../font/font_nq1rjqmf6n/iconfont.css';

    .warpper-top{
        width: 100%;
        height: 50px;
        position: absolute;
        top:-50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .details{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    
    main{
        width: 100%;
        flex: 1;
        overflow: hidden;
    }
    .details-content{
        dl{
            width: 100%;
            display: flex;
            flex-direction: column;
            dt{
                width: 100%;
                height: 50px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-top: 1px solid #efebeb;
                border-bottom: 1px solid #efebeb;
                padding: 0 10px;
                span:nth-of-type(1){
                    box-sizing: border-box;
                    padding: 0;
                    padding-left:10px;
                    border-left:2px solid #46eac5; 
                    font-size: 16px;
                }
                span:nth-of-type(2){
                    font-size: 25px;
                }

            }
            dd{
                width: 100%;
                box-sizing: border-box;
                padding: 10px;
                p{
                    width: 100%;
                    height: 30px;
                    display: flex;
                    span{
                        font-size: 16px;
                    }
                    span:nth-of-type(1){
                        color: #949494;
                    }
                    span:nth-of-type(2){
                        margin-left: 10px;
                    }
                    span:nth-of-type(3){
                        margin-left: 195px;
                       
                    }
                }
            }
        }
    }
    .commodity-img{
        width: 100%;
        display: flex;
        flex-direction: column;
        &>p{
            width: 100%;
            height: 50px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #efebeb;
            border-bottom: 1px solid #efebeb;
            padding: 0 10px;
            span:nth-of-type(1){
                box-sizing: border-box;
                padding: 0;
                padding-left:10px;
                border-left:2px solid #46eac5; 
                font-size: 16px;
            }
            span:nth-of-type(2){
               font-size: 25px;
            }
        }
        &>div{
            width: 100%;
            display: flex;
            flex-direction: column;
            &>p{
                width: 100%;
                height: 50px;
                box-sizing: border-box;
                padding: 0 10px;
                display: flex;
                align-items: center;
            }
            &>div{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                padding: 0 10px;
                img{
                   width: 105px;
                   height: 105px;
                   margin-right:10px; 
                   margin-bottom:10px; 
                }
            }
        }
    }
    .details-img{
        width: 100%;
        display: flex;
        flex-direction: column;
        &>p{
            width: 100%;
            height: 50px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #efebeb;
            border-bottom: 1px solid #efebeb;
            padding: 0 10px;
            span:nth-of-type(1){
                box-sizing: border-box;
                padding: 0;
                padding-left:10px;
                border-left:2px solid #46eac5; 
                font-size: 16px;
            }
             span:nth-of-type(2){
               font-size: 25px;
            }
        }
        &>div{
            box-sizing: border-box;
            padding: 10px;
            width: 100%;
            &>img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>

