<template>
  <div id="devconfig">
    <div>
      <Table :columns="columns" :data="tableData"></Table>
    </div>
    <div id="visual1" :style="{width: '100%', height: '370px'}"></div>
    <div id="visual2"></div>
    <div id="visual3"></div>
    <div id="visual4"></div>
  </div>
</template>

<script>
import axios from "axios";
// 引入基本模板
import echarts from 'echarts';
// let echarts = require("echarts/lib/echarts");
// // 引入柱状图组件
// require("echarts/lib/chart/line");
// // 引入提示框和title组件
// require("echarts/lib/component/tooltip");
// require("echarts/lib/component/title");
// require("echarts/lib/component/legend");

export default {
  name: "devconfig",

  components: {},

  data: function() {
    return {
      columns: [
        {
          title: "采集时间",
          key: "createTime"
        },
        {
          title: "数据",
          key: "eData"
        },
        {
          title: "数据流水号",
          key: "eDataId"
        },
        {
          title: "MAC地址",
          key: "eMac"
        },
        {
          title: "IP地址",
          key: "eIp"
        },
        {
          title: "湿度",
          key: "eHumidity"
        },
        {
          title: "压力",
          key: "ePressure"
        },
        {
          title: "温度",
          key: "eTemperature"
        }
      ],
      tableData: []
    };
  },

  computed: {},
  watch: {},
  methods: {
    drawPutInWh() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("visual1"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        color: ["#5AB1EF"],
        legend: {
          bottom: 10,
          left: "center",
          data: [
            {
              name: "入库量"
            }
          ],
          icon: "rect",
          textStyle: {
            fontSize: 12
          }
        },
        calculable: true,
        grid: {
          left: '0%',
          right: '4%',
          top: '5%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "一月",
              "二月",
              "三月",
              "四月",
              "五月",
              "六月",
              "七月",
              "八月",
              "九月",
              "十月",
              "十一月",
              "十二月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            // axisLabel:{formatter:'{value}'+ "(TON)"} 
          }
        ],
        series: [
          {
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#5AB1EF" //控制折线颜色
                },
                areaStyle: {
                  type: "default",
                  color: "#A8D4F3" //控制区域颜色
                }
              }
            },
            name: "入库量",
            type: "line",
            smooth: true,
            data: [11, 22, 33, 44, 55, 66, 66, 77, 88, 88, 99, 44],
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    },
    testAxios() {
      var that = this;
      var instance = axios.create({
        baseURL: "http://39.108.83.208:9879",
        timeout: 1000
      });
      instance
        .get("/eeda/v1/equipmentData/list")
        .then(function(res) {
          that.tableData = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },

  mounted() {
    this.testAxios();
    this.drawPutInWh();
  }
};
</script>

<style>

</style>
