<template>
  <div class="statement">
    <MyHeader title="报表统计">
      <span></span>
    </MyHeader>
    <div class="statement-type">
      <button
        v-for="(v,i) in typeArr"
        :key="i"
        :class="typeIndex === i ? 'active' : null"
        @click="handType(i)"
      >{{v}}</button>
    </div>
    <div class="statement-date">
      <button
        v-for="(v,i) in dateArr"
        :key="i"
        :class="typeDateIndex === i ? 'date-active' : null"
        @click="handDateType(i)"
      >{{v}}</button>
    </div>
    <div class="statement-style">
      <button v-for="(v,i) in styleArr" :key="i" :class="styleIndex === i ? 'style-active' : null" @click="handStyle(i)">{{v}}</button>
    </div>
    <div id="statement-wrap"></div>
  </div>
</template>
<script>
import MyHeader from "../components/myheader";
import Highcharts from "highcharts";
export default {
  data() {
    return {
      options: {
        chart: {
          type: "bar" //图标类型
        },
        title: {
          text: "销售统计" // 标题
        },
        xAxis: {
          categories: [] // x 轴分类
        },
        yAxis: {
          title: {
            text: "销售额" // y 轴标题
          }
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled:false,
            }
          }
        },
        series: [
          {
            name: "每日销售额",
            size: "100%",
            data: []
          }
        ]
      },
      typeArr: ["销售统计", "收益统计"],
      dateArr: ["本周", "本月", "本季"],
      styleArr:['柱状图','折线图','饼状图'],
      typeIndex: 0,
      typeDateIndex: 0,
      styleIndex:0,
      typetitle: "销售统计",
      Xtitle: "每日销售额",
      Ytitle: "销售额",
      from: "",
      to: this.getFormatDate(new Date())
    };
  },
  components: {
    MyHeader
  },
  mounted() {
    let date = new Date();
    date.setDate(date.getDate() - date.getDay() + 1);
    this.from = this.getFormatDate(date);
    this.getlist("/store/statistics/count", this.from, this.to);
  },
  methods: {
    handType(i) {  //销售统计 or 收益统计
      this.typeIndex = i;
      this.typetitle = this.typeArr[i];
      if (i === 0) {
        this.Xtitle = "每日销售额";
        this.Ytitle = "销售额";
        this.getlist("/store/statistics/count", this.from, this.to);
      } else {
        this.Xtitle = "每日收益额";
        this.Ytitle = "收益额";
        this.getlist("/store/statistics/profit", this.from, this.to);
      }
    },
    handDateType(i) {  //本周 or 本月 or 本季度
      this.typeDateIndex = i;
      let date = new Date();
      if (i === 0) {
        date.setDate(date.getDate() - date.getDay() + 1);
        this.from = this.getFormatDate(date);
      } else if (i === 1) {
        date.setDate(1);
        this.from = this.getFormatDate(date);
      } else {
        let m = this.getQuarterStartMonth(date.getMonth());
        date.setMonth(m);
        date.setDate(1);
        this.from = this.getFormatDate(date);
      }
      if (this.typeIndex) {
        this.getlist("/store/statistics/profit", this.from, this.to);
      } else {
        this.getlist("/store/statistics/count", this.from, this.to);
      }
    },
    handStyle(i){   //柱状图 or 折线图 or 饼状图
      this.styleIndex = i;
      if(i === 0){
        this.options.chart.type = 'bar'
      }else if(i === 1){
        this.options.chart.type = 'line'
      }else{
        this.options.chart.type = 'pie'
      }
      if (this.typeIndex) {
        this.getlist("/store/statistics/profit", this.from, this.to);
      } else {
        this.getlist("/store/statistics/count", this.from, this.to);
      }

    },
    /**
     * @description: 请求数据
     * @param {url:请求路径,from:开始时间,to:结束时间} 
     * @return: 无
     */
    getlist(url, from, to) {   //请求数据
      let dateArr = [];
      let countArr = [];
      this.$http
        .get(url, {
          params: {
            from,
            to,
            store_id: "c22482e1535cfa3042e205d7119ed811"
          }
        })
        .then(res => {
          if (res.code === 1) {
            res.result.forEach(item => {
              dateArr.push(item.date);
              countArr.push([item.date, item.count * 1]);
            });
            this.options.xAxis.categories = dateArr;
            this.options.series[0].data = countArr;
            this.options.title.text = this.typetitle;
            this.options.yAxis.title.text = this.Ytitle;
            this.options.series[0].name = this.Xtitle;
            Highcharts.chart("statement-wrap", this.options);
          }
        });
    },
    getFormatDate(date) {
      //将日期转为YY-MM-DD
      var seperator = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var nowDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (nowDate >= 0 && nowDate <= 9) {
        nowDate = "0" + nowDate;
      }
      var newDate = year + seperator + month + seperator + nowDate;
      return newDate;
    },
    getQuarterStartMonth(nowMonth) {
      //获取当前月所处的季度是几月份
      var quarterStartMonth = 0;
      if (nowMonth < 3) {
        quarterStartMonth = 0;
      }
      if (2 < nowMonth && nowMonth < 6) {
        quarterStartMonth = 3;
      }
      if (5 < nowMonth && nowMonth < 9) {
        quarterStartMonth = 6;
      }
      if (nowMonth > 8) {
        quarterStartMonth = 9;
      }
      return quarterStartMonth;
    }
  }
};
</script>
<style lang="scss" scoped>
.statement {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#statement-wrap {
  width: 100%;
  flex: 1;
  margin-top: 15px;
}
.statement-type {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  button {
    height: 30px;
    padding: 0 10px;
    margin: 0 10px;
    border: 1px solid #ccc;
    outline: none;
    background: white;
    &.active {
      background: red;
      color: white;
    }
  }
}
.statement-date {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  button {
    height: 30px;
    padding: 0 10px;
    margin: 0 10px;
    border: 1px solid #ccc;
    outline: none;
    background: white;
    &.date-active {
      background: palegreen;
    }
  }
}
.statement-style{
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  button {
    height: 30px;
    padding: 0 10px;
    margin: 0 10px;
    border: 1px solid #ccc;
    outline: none;
    background: white;
    &.style-active {
      background: yellow;
    }
  }
}
</style>
