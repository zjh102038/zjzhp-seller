<template>
  <div class="sku">
    <my-header title="添加SKU">
      <span></span>
    </my-header>
    <div class="sku-main">
      <div class="sku-list" v-for="(v) in grouplist" :key="v.id">
        <li>
          <span>group:</span>
          <input type="text" placeholder="请输入商品属性" v-model="v.val">
          <span @click="addgroup(v.id)">{{v.text}}</span>
        </li>
        <li v-for="(item) in v.childs" :key="item.id">
          <span>value:</span>
          <input type="text" placeholder="请输入属性描述" v-model="item.val">
          <span @click="addvalue(v.id,item.id)">{{item.text}}</span>
        </li>
      </div>
      <div class="sku-btn">
        <button @click="save">保存</button>
      </div>
    </div>
  </div>
</template>
<script>
import MyHeader from "../components/myheader.vue";
export default {
  data() {
    return {
      groupId: 0,
      valueId: 0,
      grouplist: [],
      cat_id:''
    };
  },
  created() {
    this.cat_id = this.$route.params.cat_id;
    this.grouplist = [
      {
        id: this.groupId,
        val: "",
        text: "+",
        childs: [
          {
            id: this.valueId,
            text: "+",
            val: ""
          },
        ]
      }
    ];
  },
  components: {
    MyHeader
  },
  methods: {
    addgroup(id) {
      let e = event;
      if (e.target.innerHTML === "+") {
        this.groupId++;
        this.grouplist.push({
          id: this.groupId,
          val: "",
          text: "-",
          childs: [
            {
              id: this.valueId,
              text: "+",
              val: ""
            }
          ]
        });
      }else{
        this.grouplist = this.grouplist.filter(item=>item.id!=id);
      }
    },
    addvalue(pid,cid) {
      let parent = this.grouplist.find(item => item.id === pid);
      const e = event;
      if(e.target.innerHTML === '+'){
        this.valueId++;
        parent.childs.push({
          id: this.valueId,
          text: "-",
          val: ""
        });
      }else{
        parent.childs = parent.childs.filter(item=>item.id !=cid)
      }
    },
    save() {
      let arr = this.grouplist.map((v)=>{
        return {
          group:v.val,
          params:v.childs.map(item=>{
            return item.val
          })
        }
      })
      this.$http.post('/store/goods/sku.set',{
        sku:JSON.stringify(arr),
        store_id:'c22482e1535cfa3042e205d7119ed811',
        cat_id:this.cat_id
      }).then(res=>{
        if(res.code === 1){
          this.$message.success('保存成功')
          this.$router.push('/Putaway')
        }
      })
    } 
  }
};
</script>
<style lang="scss" scoped>
.sku {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .sku-main {
    flex: 1;
    .sku-list {
      padding: 10px;
      background: #eee;
      padding-bottom: 10px;
      margin-bottom: 10px;
      li {
        display: flex;
        justify-content: space-between;
        height: 35px;
        align-items: center;
        font-size: 15px;
        margin: 5px 0;
        border-bottom: 1px dashed #ccc;
        span {
          font-size: 17px;
        }
        input {
          width: 80%;
          height: 80%;
          border: 0;
          outline: none;
          background: #eee;
        }
      }
    }
  }
}
.sku-btn {
  width: 100%;
  height: 30px;
  text-align: center;
  button {
    width: 100px;
    height: 100%;
    border: 0;
    outline: none;
    border-radius: 5px;
    background: #5adad0;
    color: white;
  }
}
</style>


