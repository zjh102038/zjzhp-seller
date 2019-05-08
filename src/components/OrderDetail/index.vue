<template>
  <div class="container">
    <myheader :title="this.$route.params.msg.state">
      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </myheader>
    <main>
      <section class="orderMsg">
        <h5>订单信息</h5>
        <p>
          订单号：{{this.$route.params.msg.orderCode}}
          <button @click="copyCode('12313132')">复制</button>
        </p>
        <p>
          下单时间：
          <span>{{this.$route.params.msg.orderTime}}</span>
        </p>
        <p>
          付款时间：
          <span>{{this.$route.params.msg.payTime}}</span>
        </p>
        <p>
          订单状态：
          <span style="{color:'red'}">{{this.$route.params.msg.state}}</span>
        </p>
        <p>
          收货人名称：
          <span>{{this.$route.params.msg.person}}</span>
        </p>
        <p>
          收货人电话：
          <span>{{this.$route.params.msg.tel}}</span>
        </p>
        <p>
          收货人地址：
          <span>{{this.$route.params.msg.address}}</span>
        </p>
      </section>
      <section class="goodsMsg">
        <h5>商品信息</h5>
        <div>
          <p>商品ID:00000000000</p>
          <dl>
            <dt>
              <img src="../../assets/logo.png" alt>
            </dt>
            <dd>
              <h5>商品名称：中长衫-夏薄款</h5>
              <p>购买数量：12</p>
              <p>单价：12</p>
              <b>总计：￥120.00</b>
            </dd>
          </dl>
        </div>
      </section>
      <section class="payMsg">
        <h5>付款信息</h5>
        <p>订单金额：￥204.00</p>
        <p>需付款：￥204.00</p>
        <p>支付方式：微信支付</p>
        <p>购买数量：2</p>
        <p>总计：￥204.00</p>
      </section>
    </main>
    <footer v-if="this.$route.params.msg.state.indexOf('已完成') == -1">
      <button
        v-if="this.$route.params.msg.state.indexOf('退款') !== -1"
        @click="handleOk('refund')"
      >退款</button>
      <button v-if="this.$route.params.msg.state === '待发货'" @click="handleOk('receive')">接单</button>
      <button @click="handleOk('refuse')" v-if="this.$route.params.msg.state!=='配送中'">驳回</button>
    </footer>
    <Dialog
      @addcancel="addcancel"
      @addconfirm="addconfirm"
      v-show="open"
      :title="title"
      :cancel="cancel"
      :confirm="confirm"
    >
      <textarea name id cols="30" rows="6" placeholder="请输入驳回原因" v-if="type=='refuse'"></textarea>
      <p v-if="type == 'refund'" class="money">
        ￥
        <input type="text" placeholder="请输入退款金额">
      </p>
    </Dialog>
  </div>
</template>
<script>
import Dialog from "../mypop";
import myheader from "../myheader";
export default {
  name: "orderDetail",
  components: {
    Dialog,
    myheader
  },
  data() {
    return {
      open: false,
      title: "",
      cancel: "",
      confirm: "",
      type: ""
    };
  },
  methods: {
    handleOk(type) {
      this.type = type;
      if (type == "refuse") {
        this.open = true;
        this.title = "驳回原因";
        this.cancel = "取消";
        this.confirm = "驳回";
      } else if (type == "refund") {
        this.open = true;
        this.title = "退款金额";
        this.cancel = "取消";
        this.confirm = "确定";
      } else if (type == "receive") {
      }
    },
    addcancel() {
      this.open = false;
    },
    addconfirm() {
      this.open = false;
    },
    copyCode(code) {
      if (window.clipboardData) {
        window.clipboardData.clearData();
        window.clipboardData.setData("Text", code);
        alert("复制成功！");
      } else {
        alert("请手动复制！");
      }
    }
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
.container {
  width: 100%;
  height: 100%;
  background: #eee;
  display: flex;
  flex-direction: column;

  header {
    width: 100%;
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 8px;
    border-bottom: 1px solid #eee;
    a {
      font-size: 22px;
    }
  }
  main {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .orderMsg {
      width: 100%;
      flex: 30%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      line-height: 18px;
      background: white;
      padding: 8px;
      p {
        font-size: 12px;
        button {
          float: right;
          padding: 1px 8px;
          font-size: 12px;
          border: 1px solid orange;
          color: orange;
          background: white;
        }
        span {
          font-size: 12px;
        }
      }
      h5 {
        font-size: 14px;
        margin-bottom: 8px;
        &:before {
          content: "";
          width: 2px;
          height: 14px;
          display: inline-block;
          background: darkcyan;
          margin-right: 5px;
          line-height: 14px;
        }
      }
    }
    .goodsMsg {
      width: 100%;
      flex: 40%;
      background: white;
      padding: 8px;
      margin: 5px 0;
      div {
        width: 100%;
        height: 40%;
        border-bottom: 1px solid #eee;
        p {
          font-size: 13px;
        }
        dl {
          width: 100%;
          height: 80%;
          display: flex;
          dt {
            width: 20%;
            height: 100%;
            padding: 5px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          dd {
            width: 80%;
            height: 100%;
            padding: 5px;
            display: flex;
            flex-direction: column;
            b {
              font-size: 13px;
              font-weight: 500;
            }
            p {
              font-size: 12px;
              color: #ccc;
            }
            h5 {
              font-size: 13px;
              font-weight: 500;
            }
          }
        }
      }
    }
    .payMsg {
      width: 100%;
      flex: 30%;
      background: white;
      padding: 8px;
      display: flex;
      flex-direction: column;
      line-height: 26px;
      p {
        font-size: 13px;
      }
    }
  }

  footer {
    width: 100%;
    height: 44px;
    background: white;
    button {
      width: 50%;
      height: 100%;
      color: white;
      border: none;
      outline: none;
      &:first-child {
        background: orange;
      }
      &:last-child {
        background: #ccc;
      }
    }
  }
  textarea {
    background: #eee;
    padding: 8px;
    border: none;
    outline: none;
  }
  .money {
    width: 100%;
    background: #eee;
    height: 40px;
    input {
      height: 100%;
      width: 80%;
      background: #eee;
      outline: none;
      border: none;
    }
  }
}
</style>

