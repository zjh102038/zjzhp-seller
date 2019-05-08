<template>
  <div class="box">
    <myheader title="订单管理">
      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </myheader>
    <nav>
      <ul>
        <li
          v-for="(item,index) in navList"
          :key="item.id"
          @click="handleClick(item.cont,index)"
          :class="ind===index?'border':''"
        >
          <b>{{20}}</b>
          <span>{{item.cont}}</span>
        </li>
      </ul>
    </nav>
    <main ref="main">
      <div>
        <section v-for="(item,i) in orderList" :key="item.id" @click="toDetail(item.state,i)">
          <div class="first_box">
            <b>订单号：{{item.orderCode}}</b>
            <span>{{item.state}}</span>
          </div>
          <div>
            <span>收货地址：{{item.address}}</span>
          </div>
          <div>
            <span>收货人地址：{{item.person}}--{{item.tel}}</span>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
<script>
import Bscroll from "better-scroll";
import myheader from '../myheader'
export default {
  data() {
    return {
      navList: [
        { id: 0, cont: "全部" },
        { id: 1, cont: "待发货" },
        { id: 2, cont: "配送中" },
        { id: 3, cont: "已完成" },
        { id: 4, cont: "退款/售后" }
      ],
      contList: [
        {
          id: 0,
          orderCode: "WT18502301120",
          address: "北京市-大兴",
          person: "盖屌强",
          tel: 12222222222,
          state: "待发货",
          payTime: "2019-2-05 20:00:20",
          orderTime: "2019-1-30 23:02:00"
        },
        {
          id: 1,
          orderCode: "WT18502301120",
          address: "北京市-通州",
          person: "盖屌强",
          tel: 12222222222,
          state: "配送中",
          payTime: "2019-2-05 20:00:20",
          orderTime: "2019-1-30 23:02:00"
        },
        {
          id: 2,
          orderCode: "WT18502301120",
          address: "北京市-海淀区",
          person: "盖屌强",
          tel: 12222222222,
          state: "已完成",
          payTime: "2019-2-05 20:00:20",
          orderTime: "2019-1-30 23:02:00"
        },
        {
          id: 3,
          orderCode: "WT18502301120",
          address: "北京市-昌平区",
          person: "盖屌强",
          tel: 12222222222,
          state: "退款审核-仅退款",
          payTime: "2019-2-05 20:00:20",
          orderTime: "2019-1-30 23:02:00"
        },
        {
          id: 4,
          orderCode: "WT18502301120",
          address: "北京市-朝阳区",
          person: "盖屌强",
          tel: 12222222222,
          state: "配送中",
          payTime: "2019-2-05 20:00:20",
          orderTime: "2019-1-30 23:02:00"
        },
        {
          id: 5,
          orderCode: "WT18502301120",
          address: "北京市-朝阳区",
          person: "盖屌强",
          tel: 12222222222,
          state: "退款驳回",
          payTime: "2019-2-05 20:00:20",
          orderTime: "2019-1-30 23:02:00"
        }
      ],
      ind: 0,
      orderList: []
    };
  },
  components:{
    myheader
  },
  methods: {
    handleClick(type, ind) {
      this.ind = ind;
      switch (type) {
        case "待发货":
          this.orderList = this.contList.filter((item) => {
            return item.state === "待发货";
          });
          break;
        case "已完成":
          this.orderList = this.contList.filter((item) => {
            return item.state === "已完成";
          });
          break;
        case "配送中":
          this.orderList = this.contList.filter((item) => {
            return item.state === "配送中";
          });
          break;
        case "退款/售后":
          this.orderList = this.contList.filter((item) => {
            return item.state.indexOf("退款") !== -1;
          });
          break;
        default:
          this.orderList = this.contList;
      }
    },
    toDetail(type, i) {
      this.$router.push({
        name: "orderDetail",
        params: {
          msg: this.orderList.find((item, ind) => {
            return ind === i;
          })
        }
      });
    }
  },
  mounted() {
    if (this.ind === 0) {
      this.orderList = this.contList;
    }
    //异步
    this.$nextTick (()=>{
      this.Bscroll = new Bscroll(this.$refs.main, {
        click:true
      });
    })
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px;
  position: relative;
  header {
    width: 100%;
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    span {
      font-size: 22px;
    }
  }
  nav {
    width: 100%;
    height: 67px;
    border-bottom: 1px solid #eee;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        line-height: 30px;
        b {
          font-size: 20px;
          font-weight: 500;
        }
        span {
          font-size: 12px;
        }
      }
    }
  }
  main {
    width: 100%;
    flex: 1;
    overflow: hidden;
    div {
      width: 100%;

      section {
        width: 100%;
        height: 104px;
        border-bottom: 1px solid #eee;
        div {
          width: 100%;
          height: 30%;
          display: flex;
          justify-content: start;
          align-items: center;
        }
        .first_box {
          height: 40%;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
.border {
  border-bottom: 2px solid orange;
  color:orange
}
</style>