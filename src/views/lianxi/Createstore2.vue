<template>
    <div>
        <my-header title="创建店铺">
            <span></span>
        </my-header>
        <main>
            <p><label for="storename">店铺名称</label> <input id="storename" type="text"></p>
            <p><label for="idcard">身份证号</label><input id="idcard" type="text"></p>
            <p>
                <label for="cat">一级分类</label>
                <select  @change="handIndex" v-model="listIndex">
                    <option v-for="(item,i) in list" :value="i" :key="i">{{item.cat_name}}</option>
                </select>
            </p>
             <p>
                <label for="sub_cat">二级分类</label>
                <select @change="twoValue" v-model="catTwo">
                    <option v-for="(v,s) in listTwo" :key="s" :value="v">{{v}}</option>
                </select>
            </p>
            <input type="text" v-model="abc" @change="fun">
            <span>{{abc}}</span>
        </main>
        <footer @click="handFlag">
            创建店铺
        </footer>
        <Zaoceng v-show="flag" :flag='flag' v-on:contont="handpink"></Zaoceng>
    </div>
</template>
<script>
import MyHeader from '../../components/myheader';
import Zaoceng from './dirlong/zaoceng.vue'
export default {
    data(){
        return{
            list:'',
            listIndex:0,
            listTwo:[],
            catTwo:"请选择",
            abc:'',
            flag:false
        }
    },
    components:{
        MyHeader,
        Zaoceng
    },
   
    mounted(){
        this.$http.get("/store/catagory").then(res=>{
            console.log(res)
            if(res.code===1){
                this.list=res.list
                this.list[this.listIndex].sub_cat_name.unshift("请选择")
                this.listTwo=res.list[this.listIndex].sub_cat_name
                console.log(this.listTwo)
            }
           
        })
    },
    methods:{
        handIndex(){
            console.log(this.listIndex)
            console.log(this.list[this.listIndex].cat_name)
            this.list[this.listIndex].sub_cat_name.unshift("请选择")
            console.log(this.list[this.listIndex].sub_cat_name)
            this.listTwo=this.list[this.listIndex].sub_cat_name
        },
        twoValue(){
            console.log(this.catTwo)
        },
        fun(){
            console.log(this.abc)
        },
        handFlag(){
            console.log(11)
            this.flag=true
            console.log(this.flag)
        },
        handpink(){
            this.flag=false
            console.log(this.flag)

        }
    }
}
</script>
<style scoped>
main{
    width: 100%;
    flex: 1;
}
footer{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f9a854;
}
</style>
