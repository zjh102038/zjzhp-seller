<template>
    <transition name="contont" v-show="flag">
        <div class="main" >
            <transition name="contont">
                <div v-show="flag" class="zaoceng" @click="handcontont">

                </div>
            </transition>
            <transition name="buttom">
                <div v-show="flag" class="main-bottom">
                    <p>颜色</p>
                    <p>形状</p>
                </div>
            </transition>
        </div>
   </transition>
</template>
<script>
export default {
    props:["flag"],
    mounted(){
    },
    methods:{
        handcontont(){
            console.log(11)
            this.$emit('contont')
        }
    }
}
</script>
<style lang="scss" scoped>
.main{
    position: fixed;
    width: 100%;
    height: 100%;
    
}
.zaoceng{
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.7)
}
.main-bottom{
    width: 100%;
    position: absolute;
    bottom: 0;
    transform: translate3d(0,0,0);
    background: #fff;
    p{
        width: 100%;
        height: 40px;
        border: 1px solid #ccc;
        background: #fff;
        text-align: center;
        line-height: 40px;
    }
}
.contont-enter,.contont-leave-to{
    opacity: 0;
}
.contont-enter-to,.contont-leave{
    opacity: 1;
}
.contont-enter-active,.contont-leave-active{
    transition: opacity 1s ease-out;
}
.buttom-enter,.buttom-leave-to{
    transform: translate3d(0,100%,0);
}
.buttom-enter-to,.buttom-leave{
    transform: translate3d(0,0,0);
}
.buttom-enter-active,.buttom-leave-active{
    transition: transform 1s ease-out;
}
</style>
