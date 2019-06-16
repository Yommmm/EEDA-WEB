<template>
  <div id="visualPage">
    <div>
      <Table :columns="columns" :data="tableData"></Table>
      <br/><br/><br/>
    </div>
    <div id="visual1" class="visual" :style="{width: '50%', height: '315px'}"></div>
    <div id="visual2" class="visual" :style="{width: '50%', height: '315px'}"></div>
    <div id="visual3" class="visual" :style="{width: '50%', height: '315px'}"></div>
    <div id="visual4" class="visual" :style="{width: '50%', height: '315px'}"></div>
  </div>
</template>

<script>
import axios from "axios";
// 引入基本模板
import echarts from "echarts";

export default {
  name: "devconfig",

  components: {},

  data: function() {
    return {
      columns: [
        {
          title: "设备名称",
          key: "eName"
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
          title: "数据",
          key: "eData"
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
        },
        {
          title: "采集时间",
          key: "createTime"
        }
      ],
      tableData: []
    };
  },

  computed: {},
  watch: {},
  methods: {
    createVisual1() {
      let myChart = echarts.init(document.getElementById("visual1"));
      myChart.setOption({
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ["product", "2014", "2015", "2016", "2017", "2018", "2019"],
            ["Matcha Latte", 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            ["Milk Tea", 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ["Walnut Brownie", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
          ]
        },
        series: [
          {
            type: "pie",
            radius: 60,
            center: ["25%", "30%"]
            // No encode specified, by default, it is '2012'.
          },
          {
            type: "pie",
            radius: 60,
            center: ["75%", "30%"],
            encode: {
              itemName: "product",
              value: "2013"
            }
          },
          {
            type: "pie",
            radius: 60,
            center: ["25%", "75%"],
            encode: {
              itemName: "product",
              value: "2014"
            }
          },
          {
            type: "pie",
            radius: 60,
            center: ["75%", "75%"],
            encode: {
              itemName: "product",
              value: "2015"
            }
          }
        ]
      });
    },
    createVisual2() {
      var heatData = [];
      for (var i = 0; i < 200; ++i) {
        heatData.push([
          100 + Math.random() * 20,
          24 + Math.random() * 16,
          Math.random()
        ]);
      }
      for (var j = 0; j < 10; ++j) {
        var x = 100 + Math.random() * 16;
        var y = 24 + Math.random() * 12;
        var cnt = 30 * Math.random();
        for (var i = 0; i < cnt; ++i) {
          heatData.push([
            x + Math.random() * 2,
            y + Math.random() * 2,
            Math.random()
          ]);
        }
      }

      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("visual2"));
      // 绘制图表
      myChart.setOption({
        backgroundColor: "#1b1b1b",
        title: {
          text: "热力图结合地图",
          x: "center",
          textStyle: {
            color: "white"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}"
        },
        toolbox: {
          show: true,
          orient: "vertical",
          x: "right",
          y: "center",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: "北京",
            type: "map",
            mapType: "china",
            roam: true,
            hoverable: false,
            data: [],
            heatmap: {
              minAlpha: 0.1,
              data: heatData
            },
            itemStyle: {
              normal: {
                borderColor: "rgba(100,149,237,0.6)",
                borderWidth: 0.5,
                areaStyle: {
                  color: "#1b1b1b"
                }
              }
            }
          }
        ]
      });
    },

    createVisual3() {
      let myChart = echarts.init(document.getElementById("visual3"));
      myChart.setOption({
        tooltip: {
          formatter: "{a} <br/>{c} {b}"
        },
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: "温度",
            type: "gauge",
            z: 3,
            min: 0,
            max: 220,
            splitNumber: 11,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 10
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto"
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "auto"
              }
            },
            title: {
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: 20,
                fontStyle: "italic"
              }
            },
            detail: {
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder"
              }
            },
            data: [{ value: 40, name: "km/h" }]
          },
          {
            name: "湿度",
            type: "gauge",
            center: ["25%", "55%"], // 默认全局居中
            radius: "50%",
            min: 0,
            max: 7,
            endAngle: 45,
            splitNumber: 7,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto"
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "auto"
              }
            },
            pointer: {
              width: 5
            },
            title: {
              offsetCenter: [0, "-30%"] // x, y，单位px
            },
            detail: {
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder"
              }
            },
            data: [{ value: 1.5, name: "x1000 r/min" }]
          },
          {
            name: "压力",
            type: "gauge",
            center: ["75%", "50%"], // 默认全局居中
            radius: "50%",
            min: 0,
            max: 2,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[0.2, "#ff4500"], [0.8, "#48b"], [1, "#228b22"]],
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              splitNumber: 5,
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto"
              }
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + "") {
                  case "0":
                    return "E";
                  case "1":
                    return "Gas";
                  case "2":
                    return "F";
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "auto"
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 0.5, name: "gas" }]
          },
          {
            name: "水表",
            type: "gauge",
            center: ["75%", "50%"], // 默认全局居中
            radius: "50%",
            min: 0,
            max: 2,
            startAngle: 315,
            endAngle: 225,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[0.2, "#ff4500"], [0.8, "#48b"], [1, "#228b22"]],
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              show: false
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + "") {
                  case "0":
                    return "H";
                  case "1":
                    return "Water";
                  case "2":
                    return "C";
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "auto"
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 0.5, name: "gas" }]
          }
        ]
      });
    },
    createVisual4() {
      let myChart = echarts.init(document.getElementById("visual4"));
      myChart.setOption({
        title: {
          text: "时间段设备属性变化图",
          subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["温度", "湿度", "压力"]
        },
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "温度",
            type: "line",
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: [10, 12, 21, 54, 260, 830, 710]
          },
          {
            name: "湿度",
            type: "line",
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: [30, 182, 434, 791, 390, 30, 10]
          },
          {
            name: "压力",
            type: "line",
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: [1320, 1132, 601, 234, 120, 90, 20]
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
    this.createVisual1();
    this.createVisual2();
    this.createVisual3();
    this.createVisual4();
  }
};
</script>

<style>
body {
  /* background:dodgerblue; */
}
.visual {
  float: left;
}
</style>
