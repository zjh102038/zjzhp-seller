<template>
    <div>
         <transition name="loading">
                <div v-if='shou' class="loading-bg">loading...</div>
        </transition>
        <button @click="abc">togle</button>
    </div>
   
</template>
<script>
export default {
    data(){
        return{
            shou:false
        }
    },
    methods:{
        abc(){
            this.shou=!this.shou
        }
    }
}
</script>

<style scoped>
.loading-enter{
    opacity:0;
}
.loading-enter-to{
    opacity: 1;
}
.loading-enter-active,.loading-leave-active{
  transition: opacity 3s;
}
.loading-leave{
    opacity:1;
}
.loading-leave-to{
    opacity: 0;
}
.loading-bg{
    background: #000;
}
</style>
