<template>
    <div class="cdlist">
        <my-header title="我的店铺">
            <span></span>
        </my-header>
        <load-more class="main">
            <div class="cdlist-content">
                <div v-for="v in storeArr" :key="v.store_id">
                    <dl>
                        <dt>
                            <div>
                                <img src="/2.jpg" alt="">
                                <span>{{v.store_name}}</span>
                            </div>
                        </dt>
                        <dd class="cdlist-amend">
                            <p><span>主营业务:</span>&nbsp;&nbsp;<span>{{v.catagory}}</span></p>
                            <div >
                                <p>
                                    <span>业务细分:</span>&nbsp;
                                    <span>{{v.sub_catagory}}</span>
                                </p>
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
        </load-more>  
    </div>
</template>
<script>
import MyHeader from '../components/myheader.vue';
import Loadmore from '../components/loadmore.vue';
    export default {
        data(){
            return{
                shou:false,
                storeArr:[]
            }
        },
        components:{
            "my-header":MyHeader,
            "load-more":Loadmore
        },
        methods:{
        
        },
        mounted(){
            this.$http.get('/store/ustorelist').then(res=>{
                console.log(res)
                if(res.code===1){
                    this.storeArr=res.result
                    console.log(this.storeArr)
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
     .cdlist{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
  
    .main{
        flex: 1;
        width: 100%;
       overflow: hidden;
    }
    .cdlist-content{
        width: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 10px 15px;
        &>div{
            width: 100%;
            display: flex;
            flex-direction: column;
            border-radius: 5px;
            box-shadow: 0 3px 5px #ccc;
            margin-top: 10px;

            dl{
                width: 100%;
                display: flex;
                flex-direction: column;
                
                dt{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: #fafafa;
                    box-sizing: border-box;
                    padding: 5px 0;
                    border-top-right-radius: 5px;
                    border-top-left-radius: 5px;
                    &>div{
                        width: 100%;
                        display: flex;
                        align-items: center;
                        &>input{
                            width: 20px;
                            height: 20px;
                            display: flex;
                            margin-left: 10px;
                        }
                        &>img{
                            width: 50px;
                            height: 50px;
                            margin-left: 10px;
                            border-radius: 5px;
                        }
                        &>span{
                            
                            margin-left: 10px;
                        }
                    }
                    &>span{
                        margin-right: 10px;
                        font-size: 25px;
                    }
                    
                }
            }
        }
    }
    .cdlist-amend{
        width: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 10px ;
        &>div{
            width: 100%;
            display: flex;
            justify-content: space-between;
            &>span{
                color: #fc9600;
            }
        }
    }
    footer{
        width: 100%;
        height: 50px;
        display: flex;
        box-sizing:border-box;
        align-items: center;
        box-shadow:  0 0 5px #ccc;
        &>div{
            width: 100%;
            height: 100%;
            flex: 4;
            margin-left: 20px;
            display: flex;
            align-items: center;
            &>input{
                width: 30px;
                height: 30px;
                border-radius: 50%;
            }
            &>span{
                margin-left: 10px;
                font-size: 16px;
            }
        }
        &>span{
             width: 100%;
            height: 100%;
            flex: 3;
            background: #fc9600;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &>span:nth-of-type(1){
            background: #e5e3e3;
        }
    }
</style>
