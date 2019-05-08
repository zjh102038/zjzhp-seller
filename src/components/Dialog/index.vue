<template>
    <div class="wrapper">
        <div class="dialog">
            <header>退款金额</header>
            <p>￥<input type="text" placeholder="请输入退款金额"></p>
            <footer>
                <button>取消</button>
                <button style="{color:'orange'}">确定</button>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.wrapper{
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba($color: #000000, $alpha: 0.5);
    .dialog{
        width: 250px;
        height: 150px;
        background: white;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        margin: 50% auto;
        header{
            width: 100%;
            height: 44px;
            text-align: center;
            line-height: 44px;
        }
        p{
            width: 80%;
            background: #eee;
            height: 40px;
            margin-left: 10%;
            input{
                height: 100%;
                width: 80%;
                background: #eee;
                outline: none;
                border: none;
            }
        }
        footer{
            width: 100%;
            flex: 1;
            button{
                width: 50%;
                height: 44px;
                background: white;
                border:1px solid #eee;
                margin-top: 27px;
                color:#bbb
            }
        }
    }
}
</style>

