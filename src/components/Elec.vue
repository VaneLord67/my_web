<template>
  <div class="outer">
    <h1>HUST宿舍电量查询</h1>
    <div id="myChart" class="pic"></div>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";
axios.defaults.timeout = 5000;

export default {
  name: "Elec",
  data() {
    return {
      elecList: [],
    };
  },
  computed: {
    elecX() {
      return this.elecList.map((elec) => {
        return elec.time;
      });
    },
    elecY() {
      return this.elecList.map((elec) => {
        return elec.elec;
      });
    },
  },
  methods: {
    drawPic() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("myChart"));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "HUST韵苑19栋523宿舍",
        },
        tooltip: {},
        legend: {
          data: ["电量"],
        },
        xAxis: {
          data: this.elecX,
        },
        yAxis: {},
        series: [
          {
            name: "电量",
            type: "bar",
            data: this.elecY,
            itemStyle : {normal: {label:{show:true}}}
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  mounted() {
    axios.get("http://175.27.244.157:8081/elec/get").then(
      (response) => {
        this.elecList = response.data.data.reverse();
        this.drawPic()
      },
      (error) => {
        console.log(error.message);
      }
    );
  },
};
</script>

<style>
.outer {
  text-align: center;
  padding-top: 50px;
}

.pic {
  margin: auto;
  width: 600px;
  height: 400px;
}
</style>