<template>
  <div class="apply">
    <div class="apply-wrap">
      <my-header title="申请列表">
        <span></span>
      </my-header>
      <div class="apply-main">
        <div class="commodity-box">
          <dl>
            <dt></dt>
            <dd>喵掌柜香辣小鱼干</dd>
          </dl>
          <ul>
            <li>
              <span>
                重
                <i style="opacity: 0;">的的</i>量：
              </span>
              <span>40G</span>
            </li>
            <li>
              <span>
                售
                <i style="opacity: 0;">的的</i>价：
              </span>
              <span>2.00</span>
            </li>
            <li>
              <span>
                状
                <i style="opacity: 0;">的的</i>态：
              </span>
              <span>审核中</span>
            </li>
            <li>
              <span>申请时间：</span>
              <span>2018-12-12</span>
            </li>
          </ul>
        </div>
        <div class="commodity-box">
          <dl>
            <dt></dt>
            <dd>喵掌柜香辣小鱼干</dd>
          </dl>
          <ul>
            <li>
              <span>
                重
                <i style="opacity: 0;">的的</i>量：
              </span>
              <span>40G</span>
            </li>
            <li>
              <span>
                售
                <i style="opacity: 0;">的的</i>价：
              </span>
              <span>2.00</span>
            </li>
            <li>
              <span>
                状
                <i style="opacity: 0;">的的</i>态：
              </span>
              <span>审核中</span>
            </li>
            <li>
              <span>申请时间：</span>
              <span>2018-12-12</span>
            </li>
          </ul>
        </div>
        <div class="commodity-box">
          <dl>
            <dt></dt>
            <dd>喵掌柜香辣小鱼干</dd>
          </dl>
          <ul>
            <li>
              <span>
                重
                <i style="opacity: 0;">的的</i>量：
              </span>
              <span>40G</span>
            </li>
            <li>
              <span>
                售
                <i style="opacity: 0;">的的</i>价：
              </span>
              <span>2.00</span>
            </li>
            <li class="commodity-box-state">
              <p>
                <span>
                  状
                  <i style="opacity: 0;">的的</i>态：
                </span>
                <span>审核中</span>
              </p>
              <a href="javascript:;" @click="showmark">修改</a>
            </li>
            <li>
              <span>申请时间：</span>
              <span>2018-12-12</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <my-pop
        title="修改销售价格"
        cancel="关闭"
        confirm="修改"
        v-show="show"
        @addcancel="addcancel"
      >商品图片不符合，请重新上传正确照片之后重新提交申请，谢谢您的配合</my-pop>
  </div>
</template>
<script>
import MyHeader from "../components/myheader.vue";
import MyPop from "../components/mypop";
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    showmark() {
      this.show = true;
    },
    addcancel() {
      this.show = false;
    }
  },
  components: {
    MyHeader,
    MyPop
  }
};
</script>
<style lang="scss" scoped>
.apply-wrap{
  width: 100%;
}
.apply-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  .commodity-box {
    width: 100%;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    dl {
      display: flex;
      background: #f8f8f8;
      margin-bottom: 10px;
      dt {
        width: 50px;
        height: 50px;
        background: red;
        margin-right: 15px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      dd {
        flex: 1;
        display: flex;
        align-items: center;
      }
    }
    li {
      margin-bottom: 5px;
      &.commodity-box-state {
        display: flex;
        justify-content: space-between;
        a {
          color: #f29433;
        }
      }
    }
  }
}
</style>


