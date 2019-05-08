<template>
    <div class="cdlist">
        <header>
            <span>&lt;</span>
            <span>添加平台商品</span>
            <span>申请列表</span>
        </header>
        <main>
           <p>
                <input type="text" placeholder="请输入商品名称">
            </p> 
            <div class="cdlist-content">
                <div>
                    <dl>
                        <dt>
                            <div>
                                <input type="checkbox">
                                <img src="/1.jpg" alt="">
                                <span>喵掌柜香辣小鱼干</span>
                            </div>
                            <span>&gt;</span>
                        </dt>
                        <dd class="cdlist-amend">
                            <p><span>重&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量:</span>&nbsp;&nbsp;<span>40G</span></p>
                            <div >
                                <p>
                                    <span>售&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价:</span>&nbsp;
                                    <span>2.00</span>
                                </p>
                                <span>修改</span>
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
        </main>
        <footer>
            <div>
                <input type="checkbox">
                <span>全选</span>
            </div>
            <span>选择分类</span>
        </footer>
    </div>
</template>
<style lang="scss" scoped>
     .cdlist{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    header{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #efebeb;
        display: flex;
        span{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        span:nth-of-type(1){
            flex: 2;
            font-size: 30px;
        }
        span:nth-of-type(2){
            flex: 6;
            font-size: 18px;
        }
        span:nth-of-type(3){
            flex: 2
        }
    }
    main{
        flex: 1;
        width: 100%;
        &>p{
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding: 10px;
            border-bottom: 1px solid #ccc;
            &>input{
                width: 100%;
                height: 40px;
                outline: none;
                background: #ebebeb;
                border-radius: 20px;
                border: 0;
                padding-left:10px; 
            }
        }
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
            flex: 7;
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
    }
</style>