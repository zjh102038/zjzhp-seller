<template>
  <div class="cdlist">
    <my-header title="商品列表">
      <span></span>
    </my-header>
    <main>
      <p>
        <input type="text" placeholder="请输入商品名称">
      </p>
      <div class="cdlist-content">
        <scroll
          :data="goodsList"
          :click="click"
          :pullup="pullup"
          :pulldown="pulldown"
          class="wrapper"
          @scrollToEnd="scrollToEnd"
        >
          <div>
            <dl v-for="(item,index) in goodsList" :key="item.goods_id">
              <dt>
                <div>
                  <input
                    type="checkbox"
                    v-model="status[index]"
                    @change="handleChange(index,'single')"
                  >
                  <img :src="item.image" alt>
                  <span>{{item.goods_name}}</span>
                </div>
                <span @click="toDetails(item.goods_id)">&gt;</span>
              </dt>
              <dd class="cdlist-amend">
                <p>
                  <span>重&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量:</span>&nbsp;&nbsp;
                  <span>40G</span>
                </p>
                <div>
                  <p>
                    <span>售&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价:</span>&nbsp;
                    <span>{{item.price}}</span>
                  </p>
                  <span @click="toDetails(item.goods_id)">修改</span>
                </div>
              </dd>
            </dl>
          </div>
        </scroll>
      </div>
    </main>
    <footer>
      <div>
        <input type="checkbox" v-model="checkAll" @change="handleChange('','all')">
        <span>全选</span>
      </div>
      <span @click="onshelf('1')">上架</span>
      <span @click="onshelf('0')">下架</span>
    </footer>
  </div>
</template>
<script>
import Vue from "vue";
import scroll from "@/components/loadmore.vue";
import MyHeader from "../components/myheader";
export default {
  data() {
    return {
      data: [], //全部商品
      goodsList: [], //每页商品
      count: 0, //页码
      pageEnd: 0, //每页最后一条数据
      pageSize: 4, //一页几条数据
      pulldown: true, //下拉刷新
      pullup: true, //上拉加载
      click: true, //点击
      status: [], //每项商品的选中状态
      goods_id: "", //商品id
      checkAll: false, //全选状态
      goods_id_list: []
    };
  },
  components: {
    scroll,
    MyHeader
  },
  methods: {
    //上拉加载
    scrollToEnd() {
      if (this.count <= Math.floor(this.data.length / this.pageSize)) {
        ++this.count;
        this.pageEnd = this.count * this.pageSize + this.pageSize; //4  8
        this.goodsList = this.data.filter((item, index) => {
          return index <= this.pageEnd;
        });
      }
    },

    //点击选中
    handleChange(i, type) {
      if (type == "all") {
        this.status = this.status.map(item => {
          item = this.checkAll;
          return item;
        });
      } else {
        this.data.map((item, ind) => {
          if (this.status[i] && ind === i) {
            item.status = 1;
            this.goods_id = item.goods_id;
          } else if (ind === i) {
            item.status = 0;
            this.goods_id = "";
          }
          return item;
        });

        this.checkAll = this.status.every(item => {
          return item == true;
        });
      }
    },
    //上架  下架
    onshelf(type) {
      let goodArr = [];
      for (var i in this.status) {
        if (this.status[i] == true) {
          goodArr.push(this.goodsList[i]);
        }
      }
      this.goods_id_list = goodArr.map(item => {
        return item.goods_id;
      });

      //批量上架
      if (this.goods_id_list.length > 1) {
        console.log([...this.goods_id_list], type);
        this.$http
          .post("/store/goods/shelfInBulk", {
            goods_id_list: [...this.goods_id_list],
            status: type
          })
          .then(res => {
            console.log(res);
          });
      } else {
        //上架
        if (type == "1") {
          this.$http
            .post("/store/goods/onshelf", {
              goods_id: this.goods_id,
            })
            .then(res => {
              this.loding.loding = true
              console.log(res);
              if(res.code == 1){
                  this.loding.loding = false
              }
            });
        } else {
          //下架
          this.$http
            .post("/store/goods/offshelf", {
              goods_id: this.goods_id
            })
            .then(res => {
              console.log(res);
            });
        }
      }
    },

    //详情
    toDetails(goodId) {
      let goodDetail = this.data.filter(item => {
        return item.goods_id == goodId;
      });
      // this.$store.commit("toDetails", goodDetail);
      this.$router.push({
        path: "/details",
        query: {
          id: goodId
        }
      });
    }
  },
  created() {
    if (this.$store.state.dataList.length) {  //如果vuex里存有数据，则不发起请求
      this.data = [...this.$store.state.dataList];
      console.log(this.data, "----");
      
      this.status = new Array(this.data.length);
      this.status.fill(false);
      this.pageEnd = this.count * this.pageSize + this.pageSize; //4  8
      this.goodsList = this.data.filter((item, index) => {
        return index < this.pageEnd;
      });
    } else {
      this.$http
        .post("/store/goods/list", {
          store_id: "f291965d5ce4734412d309c9c63a04d2"
        })
        .then(res => {
          this.loding.loding = true
          console.log(res, "++++");
          this.$store.commit("setData", res.result);
          this.data = [...res.result];
          this.status = new Array(this.data.length);
          this.status.fill(false);
          if (res.code === 1) {
            this.loding.loding = false
            this.pageEnd = this.count * this.pageSize + this.pageSize; //4  8
            this.goodsList = this.data.filter((item, index) => {
              return index < this.pageEnd;
            });
          }
        });
    }
  },
  mounted() {
    // console.log(this.loding)
    // console.log(this.$BScroll)
  }
  
};
</script>

<style lang="scss" scoped>
.cdlist {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
// header {
//   width: 100%;
//   height: 50px;
//   border-bottom: 1px solid #efebeb;
//   display: flex;
//   span {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
//   span:nth-of-type(1) {
//     flex: 2;
//     font-size: 30px;
//   }
//   span:nth-of-type(2) {
//     flex: 6;
//     font-size: 18px;
//   }
//   span:nth-of-type(3) {
//     flex: 2;
//   }
// }
main {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  & > p {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    & > input {
      width: 100%;
      height: 40px;
      outline: none;
      background: #ebebeb;
      border-radius: 20px;
      border: 0;
      padding-left: 10px;
    }
  }
}
.cdlist-content {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px 15px;
  overflow: hidden;
  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 5px;

    dl {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      box-shadow: 0 3px 5px #ccc;

      dt {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fafafa;
        box-sizing: border-box;
        padding: 5px 0;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        & > div {
          width: 100%;
          display: flex;
          align-items: center;
          & > input[type="checkout"] {
            width: 20px;
            height: 20px;
            display: flex;
            margin-left: 10px;
          }
          & > img {
            width: 50px;
            height: 50px;
            margin-left: 10px;
            border-radius: 5px;
          }
          & > span {
            margin-left: 10px;
          }
        }
        & > span {
          margin-right: 10px;
          font-size: 25px;
        }
      }
    }
  }
}
.cdlist-amend {
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    & > span {
      color: #fc9600;
    }
  }
}
footer {
  width: 100%;
  height: 50px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  box-shadow: 0 0 5px #ccc;
  & > div {
    width: 100%;
    height: 100%;
    flex: 4;
    margin-left: 20px;
    display: flex;
    align-items: center;
    & > input {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    & > span {
      margin-left: 10px;
      font-size: 16px;
    }
  }
  & > span {
    width: 100%;
    height: 100%;
    flex: 3;
    background: #fc9600;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > span:nth-of-type(1) {
    background: #e5e3e3;
  }
}
</style>
