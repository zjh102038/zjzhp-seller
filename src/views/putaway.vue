<template>
  <div class="putaway">
    <div class="putaway-wrap">
      <div class="putaway-mian">
        <my-header title="添加商品" text="添加平台商品">
          <span>添加平台商品</span>
        </my-header>
        <div class="putaway-type">
          <li>
            <span>商品名称</span>
            <input type="text" placeholder="选择商品名称" v-model="goodsname">
          </li>
          <li>
            <span>选择分类</span>
            <pulldown width='80%' :pulldownList='pulldownList' @getcatid="getcatid"></pulldown>
            <!-- <select name id>
              <option value="母婴">母婴</option>
              <option value="母婴">母婴</option>
              <option value="母婴">母婴</option>
            </select> -->
            <!-- <input type="text" placeholder="选择商品名称"> -->
          </li>
        </div>
        <div class="putaway-morey">
          <li>
            <span>重量</span>
            <input type="text" placeholder="请输入重量">
            <select>
              <option value="g">克</option>
              <option value="kg">千克</option>
            </select>
          </li>
          <li>
            <span>商品售价</span>
            <input type="text" placeholder="请输入商品售价" v-model="goodspirce">
          </li>
          <li>
            <span>商品条码</span>
            <input type="text" placeholder="请输入商品条码">
          </li>
        </div>
        <div class="putaway-img">
          <span>商品图片</span>
          <ul class="img-list">
            <li v-for='(v,i) in imglist' :key='i'>
              <img :src='v'>
            </li>
            <li class="uploading">
              <span>+</span>
              <div>上传图片</div>
              <input type="file" class="uploading-file" @change="addimg">
            </li>
          </ul>
        </div>
        <div class="putaway-carimg">
          <span>购物车图</span>
          <ul class="img-list">
            <li v-for='(v,i) in carimglist' :key='i'>
              <img :src='v'>
            </li>
            <li class="uploading">
              <span>+</span>
              <div>上传图片</div>
              <input type="file" class="uploading-file" @change="carimg">
            </li>
          </ul>
        </div>
        <div class="putaway-detail">
          <span>商品详情</span>
          <ul class="img-list">
            <li>
              <textarea placeholder="请输入商品详细信息" v-model="goodsdetail"></textarea>
            </li>
          </ul>
        </div>
      </div>
      <!-- <my-table :list='skulist'></my-table> -->
      <div class="add-sku">
        <button @click="addsku">+添加SKU</button>
      </div>
      <div class="putaway-footer">
        <button @click="putaway">申请上架</button>
      </div>
    </div>
    <footer-pop :list="list" v-if="show" @addnav="addnav" @close="close"></footer-pop>
  </div>
</template>
<script>
import MyHeader from "../components/myheader.vue";
import FooterPop from "../components/footerpop";
import BScroll from "better-scroll";
import Pulldown from '../components/pulldown';
import MyTable from '../components/table';
export default {
  data() {
    return {
      show: false,
      list: ["热卖商品", "店家推荐"],
      pulldownList:[],
      imglist:[],
      carimglist:[],
      detailimglist:[],
      cat_id:'',
      title:'',
      goodsimg:'',
      goodsname:'',
      goodspirce:'',
      carimgs:'',
      goodsurlList:[],
      carurlList:[],
      goodsdetail:'',
      skulist:[]
    };
  },
  mounted(){
    new BScroll('.putaway',{
      click:true,
      stopPropagation: true
    })
    console.log(this.store_id)
    this.$http.post('/store/goods/cat.list',{
      store_id: this.store_id,
    }).then((res)=>{
      if(res.code === 1){
        this.pulldownList = res.result
      }else{
        this.$message.error(res.msg)
      }
    })
    this.$http.post('/store/goods/sku.get',{
      store_id:this.store_id,
      cat_id:'2881243f93fde476abca70508cf5e458'
    }).then((res)=>{
      if(res.code === 1){
        this.skulist = JSON.parse(res.sku)
        // console.log(this.skulist)
      }
    })
  },
  methods: {
    putaway() {
      if(!this.goodsname){
        return alert('缺少信息')
      }
      this.$http.post('/store/goods/create',{
        store_id:this.store_id,
        goods_name:this.goodsname,
        cat:this.title,
        price:this.goodspirce,
        image:this.goodsurlList.join(','),
        cat_id:this.cat_id,
        cart_image:this.carurlList.join(','),
        detail:this.goodsdetail,
        cost_price:'10'
      }).then(res=>{
        if(res.code === 1){
          this.$router.push('/addcommodity')
        }
      })

    },
    addnav(i) {
      console.log(i);
    },
    close() {
      this.show = false;
    },
    addimg(e){
      let file = e.target.files[0];
      let fromData = this.goodsimg = new FormData();
      fromData.append('addimg',file)
      // this.goodsurlList.push(this.addgoodsimg(this.goodsimg))
      this.addgoodsimg(this.goodsimg).then((res)=>{
        this.goodsurlList.push(res)
      })
      let url = window.URL.createObjectURL(file);
      this.imglist.push(url);
    },
    carimg(e){
      let file = e.target.files[0];
      let fromData = this.carimgs = new FormData();
      fromData.append('addimg',file)
      this.addgoodsimg(this.carimgs).then((res)=>{
        this.carurlList.push(res)
      })
      let url = window.URL.createObjectURL(file);
      this.carimglist.push(url);
    },
    detailimg(e){
      let file = e.target.files[0];
      let url = window.URL.createObjectURL(file);
      this.detailimglist.push(url);
    },
    getcatid(id,text){

      this.cat_id = id;
      this.title = text;
    },
    addgoodsimg(obj){
      // let url = null;
      return this.$http.post('/upload?store_id='+this.store_id,obj).then(res=>{
        if(res.code === 1){
          return res.url[0].url
        }
      })
    },
    addsku(){
      if(!this.cat_id){
        return this.$message.error('请选择商品分类')
      }
      this.$router.push(`/addsku/${this.cat_id}`)
    }
  },
  components: {
    MyHeader,
    FooterPop,
    Pulldown,
    MyTable
  }
};
</script>
<style lang="scss" scoped>
.putaway {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  // .putaway-wrap{
  //   width: 100%;
  //   overflow: hidden;
  // }
  .putaway-mian {
    flex: 1;
    padding: 0 10px;
  }
}
.putaway-type {
  height: 100px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  li {
    flex: 1;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    position: relative;
    span {
      // flex: 5;
      margin-right: 15px;
    }
    input {
      flex: 1;
      height: 100%;
      border: 0;
      outline: none;
    }
    select {
      flex: 1;
      height: 100%;
      border: 0;
      outline: none;
    }
  }
}
.putaway-morey {
  height: 150px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  li {
    flex: 1;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    overflow: hidden;
    padding: 0 5px;
    span {
      margin-right: 15px;
    }
    input {
      flex: 1;
      height: 100%;
      border: 0;
      outline: none;
    }
    select {
      flex: 1;
      height: 100%;
      border: 0;
      outline: none;
    }
  }
}
.putaway-img,
.putaway-carimg,
.putaway-detail {
  margin-bottom: 10px;
  .img-list {
    width: 100%;
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 30%;
      font-size: 14px;
      height: 107px;
      margin: 5px 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
      .uploading-file{
        width: 100%;
        height: 100%;
        position: absolute;
        opacity: 0;
      }
      img {
        width: 100%;
        height: 100%;
      }
      &:last-child {
        border: 1px dashed #ccc;
      }
    }
  }
}
.putaway-detail {
  .img-list {
    width: 100%;
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 100%;
      font-size: 14px;
      height: 107px;
      margin: 5px 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      textarea{
        width: 100%;
        height: 100%;
        border: 0;
        outline: none;
        font-size: 14px;
        padding: 10px;
      }
      // img {
      //   width: 100%;
      //   height: 100%;
      // }
      // &:last-child {
      //   border: 1px dashed #ccc;
      // }
    }
  }
}
.putaway-footer {
  height: 44px;
  button {
    width: 100%;
    height: 100%;
    border: 0;
    outline: none;
    background: orange;
    color: white;
    font-size: 18px;
  }
}
.add-sku{
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  button{
    width: 100px;
    height: 30px;
    color: white;
    border: 0;
    outline: none;
    border-radius: 5px;
    background: #5ADAD0;
  }
}
</style>





