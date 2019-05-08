<template>
  <div class="createStore">
    <my-header title="创建店铺">
      <span></span>
    </my-header>
    <div class="createStore-main">
      <div class="store-title">
        <p>店铺名称</p>
        <input type="text" placeholder="请输入店铺名称" v-model="title" v-verify.must.string.len>
      </div>
      <div class="store-title">
        <p>身份证<i style="opacity: 0;">阿</i></p>
        <input type="text" placeholder="请输入身份证号" v-model="identity" v-verify.number>
      </div>
      <div class="store-title">
        <p>一级分类</p>
        <select @change="catchange">
          <option v-for='(v,i) in catlist' :key='i' :value='v.cat_id'>{{v.cat_name}}</option>
        </select>
      </div>
      <div class="store-title" @change="sub_catchange">
        <p>二级分类</p>
        <select>
          <option v-for='(v,i) in sub_catlist' :key='i'>{{v}}</option>
        </select>
      </div>
      <button class="createBtn" @click="create">
        创建
      </button>
    </div>

    <div class="create-rules">
      <h3>开店须知</h3>
      <ol>
        <li v-for='(v,i) in rules' :key='i'>{{i+1}}.{{v}}</li>
      </ol>
    </div>
  </div>
</template>
<script>
import MyHeader from "../components/myheader";
export default {
  data() {
    return {
      catlist:[],
      sub_catlist:[],
      catid:'',
      title:'',
      identity:'',
      cattext:'',
      sub_cattext:'',
      rules:[]
    };
  },
  components: {
    MyHeader
  },
  mounted(){
    this.$http.get('/store/catagory').then(res=>{
      if(res.code === 1){
        this.catlist = res.list
      }
    })
    this.$http.get('/store/admittance').then(res=>{
      if(res.code === 1){
        this.rules = res.admittance
      }
    })
  },
  methods:{
    catchange(e){
      this.cattext = e.target.options[e.target.selectedIndex].innerHTML;
      let catid = e.target.value;
      this.catid = catid;
      let arr = this.catlist.find((item)=>{
        if(item.cat_id == catid){
          return item.sub_cat_name
        }
      })
      this.sub_catlist = arr.sub_cat_name;
    },
    sub_catchange(e){
      this.sub_cattext = e.target.options[e.target.selectedIndex].innerHTML;
    },
    create(){
      let errorNode = document.getElementsByClassName('verify-error');
      if(errorNode.length>0) return
      if(!this.title.trim() || !this.identity.trim()) return 
      this.$http.post('/store/create',{
        cat_id:this.catid,
        idcard:this.identity,
        uid:'asdfgasg110',
        sub_cat:this.sub_cattext,
        cat:this.cattext,
        store_name:this.title
      }).then(res=>{
        if(res.code === 1){
          this.$message.success('创建成功');
          this.$router.push('/')
        }
      })
    },
  }
};
</script>
<style lang="scss" scoped>
.createStore-main{
  flex: 4;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  .store-title{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
    justify-content: center;
    p{
      margin-right: 10px;
    }
    input{
      width: 80%;
      height: 100%;
      border: 0;
      outline: none;
    }
    select{
      width: 80%;
      height: 100%;
      background: white;
      border: 0;
      outline: none;
    }
  }
  .createBtn{
    width: 80%;
    height: 44px;
    background: rgb(118, 118, 243);
    border: 0;
    outline: none;
    margin: 15px auto;
    color: white;
    font-size: 20px;
    border-radius: 5px;
  }
}
.create-rules{
  flex: 6;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3{
    font-size: 20px;
    margin-bottom: 10px;
  }
  li{
    margin: 10px 0;
    font-size: 16px;
    line-height: 30px;
  }
}
</style>

