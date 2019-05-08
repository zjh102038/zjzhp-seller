<template>
  <div class="box">
    <myHeader title="销售报表">
      <span></span>
    </myHeader>
    <loadmore class="wrap" :listenScroll=true :click="true" :data="data" :probeType=2>
      <div>
        <nav>
          <ul>
            <li
              v-for="(item,i) in navList"
              :key="item.id"
              @click="handleDate(item.cont,i)"
              :class="{'border':dateInd===i}"
            >{{item.cont}}</li>
          </ul>
        </nav>
        <aside>
          <ul>
            <li
              v-for="(item,i) in asideList"
              :key="item.id"
              @click="handleTab(item.cont,i)"
              :class="{'color':typeInd===i}"
            >{{item.cont}}</li>
          </ul>
        </aside>
        <div id="main" style="width: 400px;height:300px;"></div>
        <main>
          <h3>
            <span v-if="type=='支出'">商品</span>
            <span v-else>时间</span>
            <span>{{type}}</span>
          </h3>
          <ul v-if="type=='支出'">
            <li v-for="item in data" :key="item.value">
              <span>{{item.name}}</span>
              <span>{{item.value}}</span>
            </li>
          </ul>
          <ul v-else>
            <li v-for="item in data" :key="item.value">
              <span>{{item.date}}</span>
              <span>{{item.count}}</span>
            </li>
          </ul>
        </main>
      </div>
    </loadmore>
  </div>
</template>
<script>
import echarts from "echarts";
import myHeader from "@/components/myheader";
import loadmore from "@/components/loadmore";
export default {
  data() {
    return {
      navList: [
        {
          id: 0,
          cont: "本周"
        },
        {
          id: 1,
          cont: "本月"
        },
        {
          id: 2,
          cont: "本季"
        },
        {
          id: 3,
          cont: "本年"
        }
      ],
      asideList: [
        {
          id: 4,
          cont: "销售"
        },
        {
          id: 5,
          cont: "利润"
        },
        {
          id: 6,
          cont: "支出"
        }
      ],
      dateInd: 0,
      typeInd: 0,
      from: "",
      to: "",
      data: [],
      type: "销售"
    };
  },
  components: {
    myHeader,
    loadmore
  },
  methods: {
    //点击切换
    handleTab(title, i) {
      this.typeInd = i;
      this.type = title;
      this.getData(title);
    },
    handleDate(date, i) {
      this.dateInd = i;
      switch(date){
          case '本周':
          break;
          case '本月':
          break;
          case '本季':
          break;
          case '本年':
          break;
      }
    },
    //获取数据
    getData(type) {
      switch (type) {
        case "销售":
          this.$http
            .get("/store/statistics/count", {
              params: {
                from: "2019-04-10",
                to: "2019-04-24",
                store_id: this.$store_id
              }
            })
            .then(res => {
              if (res.code === 1) {
                this.data = res.result;
                this.echatrsConf(type);
              }
            });
          break;
        case "利润":
          this.$http
            .get("/store/statistics/profit", {
              params: {
                from: "2019-04-19",
                to: "2019-04-24",
                store_id: this.$store_id
              }
            })
            .then(res => {
              if (res.code === 1) {
                this.data = res.result;
                this.echatrsConf(type);
              }
            });
          break;
        case "支出":
          this.$http
            .get("/store/statistics/catcount", {
              params: {
                from: "2019-04-18",
                to: "2019-04-24",
                store_id: this.$store_id
              }
            })
            .then(res => {
              console.log(res);
              if (res.code === 1) {
                this.data = res.result;
                this.echatrsConf(type);
              }
            });
          return;
      }
    },

    //配置echarts
    echatrsConf(type) {
      let myChart = echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "left",
          data: [""]
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            type: "",
            data: [],
            radius: "55%",
            center: ["50%", "45%"],
            name: "访问来源",
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      if (type == "支出") {
        option.series[0].data = this.data.map(item => {
          return item;
        });
        option.series[0].type = "pie";
        option.legend.data = this.data.map(item => {
          return item.name;
        });
        console.log(option);
      } else {
        option.xAxis.data = this.data.map(item => {
          return item.date;
        });
        option.series[0].data = this.data.map(item => {
          return item.count;
        });
        option.series[0].type = type == "销售" ? "bar" : "line";
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    this.getData("销售");
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  nav {
    width: 100%;
    height: 44px;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      border-bottom: 2px solid #eee;
      li {
        padding: 0 15px;
        line-height: 44px;
      }
    }
  }
  aside {
    width: 100%;
    height: 44px;

    ul {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        border: 1px solid #ddd;
        padding: 5px 8px;
      }
    }
  }
  main {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    h3 {
      width: 100%;
      height: 44px;
      background: #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 8px
    }
    ul{
        width: 100%;
        flex: 1;
        li{
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 8px;
            border:1px solid #eee
        }
    }
  }
  .wrap {
    width: 100%;
    height: 100%;
  }
  .color {
    background: salmon;
  }
  .border {
    border-bottom: 2px solid darkcyan;
  }
}
</style>
