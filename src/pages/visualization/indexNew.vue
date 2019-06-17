<template>
  <div class="visualization-new">
    <header id="header">
      <h3 class="header-title">数据分析平台</h3>
    </header>

    <div id="container">
      <div id="flexCon">
        <div class="flex-row">
          <div class="flex-cell flex-cell-l">
            <div class="chart-wrapper">
              <h3 class="chart-title">近期操作</h3>
              <div class="chart-div">
                <div id="visual1" style="width: 100%; height: 110%;"></div>
              </div>
            </div>
          </div>
          <div class="flex-cell flex-cell-c">
            <div class="chart-wrapper">
              <h3 class="chart-title"></h3>
              <div class="chart-div">
                <div id="visual2" style="width: 140%; height: 130%; margin: -5% 0% 0% -20%;"></div>
              </div>
            </div>
          </div>
          <div class="flex-cell flex-cell-r">
            <div class="chart-wrapper">
              <h3 class="chart-title">操作统计
                <Select v-model="model10" size="small" style="width:100px;">
                  <Option
                    v-for="item in selectData"
                    :value="item.eId"
                    :key="item.eId"
                  >{{ item.eName }}</Option>
                </Select>
              </h3>
              <!-- <div class="chart-div chart-done"> -->
              <div class="chart-div">
                <div id="visual3" style="width: 110%; height: 110%;"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-row">
          <div class="flex-cell flex-cell-lc">
            <div class="chart-wrapper">
              <h3 class="chart-title">温度与压力</h3>
              <div class="chart-div chart-done">
                <div id="visual5" style="width: 102%; height: 110%;"></div>
              </div>
            </div>
          </div>
          <div class="flex-cell flex-cell-r">
            <div class="chart-wrapper">
              <h3 class="chart-title"></h3>
              <!-- <div class="chart-div chart-done"> -->
              <div class>
                <div class="chart-loader">
                  <div class="loader"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入基本模板
import echarts from "echarts";
import axios from "axios";

export default {
  components: {},

  data() {
    return {
      selectData: [],
      model10: [],

      result: {
        visual1Data: [
          ["操作", "开机", "关机", "工作"],
          ["6.14", 43.3, 85.8, 93.7],
          ["6.15", 83.1, 73.4, 55.1],
          ["6.16", 86.4, 65.2, 82.5],
          ["6.17", 72.4, 53.9, 39.1]
        ],
        visual2Data: {},
        visual3Data: {
          catalog: ["开机", "关机", "加湿", "除尘", "待机"],
          data: [
            { value: 335, name: "开机" },
            { value: 310, name: "关机" },
            { value: 234, name: "加湿" },
            { value: 135, name: "除尘" },
            { value: 1548, name: "待机" }
          ],
        },
        visual4Data: {},
        visual5Data: {},
      },
    };
  },

  computed: {},
  watch: {},
  methods: {
    drawVisual1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("visual1"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "0%",
          right: "4%",
          top: "5%",
          bottom: "10%",
          containLabel: true
        },
        dataset: {
          source: this.result.visual1Data
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#FFFFFF",
              width: 2 //这里是为了突出显示加上的
            }
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#FFFFFF",
              width: 2 //这里是为了突出显示加上的
            }
          }
        },
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      });
    },
    drawVisual3() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("visual3"));
      // 绘制图表
      myChart.setOption({
        grid: {
          left: "0%",
          right: "4%",
          top: "5%",
          bottom: "10%",
          containLabel: true
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: this.result.visual3Data.catalog,
          textStyle: {
            color: "#FFFFFF"
          }
        },
        series: [
          {
            name: "操作",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.result.visual3Data.data,
          }
        ]
      });
    },
    drawVisual5() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("visual5"));
      // 绘制图表
      myChart.setOption({
        // backgroundColor: '#1b1b1b',
        tooltip: {
          trigger: "axis"
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        grid: {
          left: "0%",
          right: "4%",
          top: "5%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisLine: {
              lineStyle: {
                color: "#FFFFFF",
                width: 2 //这里是为了突出显示加上的
              }
            },
            data: (function() {
              var now = new Date();
              var res = [];
              var len = 10;
              while (len--) {
                res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
                now = new Date(now - 600000);
              }
              return res;
            })()
          },

          {
            type: "category",
            boundaryGap: true,
            axisLine: {
              lineStyle: {
                color: "#FFFFFF",
                width: 2 //这里是为了突出显示加上的
              }
            },
            data: (function() {
              var now = new Date();
              var res = [];
              var len = 10;
              while (len--) {
                res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
                now = new Date(now - 600000);
              }
              return res;
            })()
          }
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            name: "°C",
            axisLine: {
              lineStyle: {
                color: "#FFF000",
                width: 2 //这里是为了突出显示加上的
              }
            },
            boundaryGap: [0.2, 0.2]
          },
          {
            type: "value",
            scale: true,
            name: "Pa",
            axisLine: {
              lineStyle: {
                color: "#FFF000",
                width: 2 //这里是为了突出显示加上的
              }
            },
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            name: "压力",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#9BCA63"
              }
            },
            data: (function() {
              var res = [];
              var len = 10;
              while (len--) {
                res.push(Math.round(Math.random() * 1000));
              }
              return res;
            })()
          },
          {
            name: "温度",
            type: "line",
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#FE8463" //控制折线颜色
                }
              }
            },
            data: (function() {
              var res = [];
              var len = 10;
              while (len--) {
                res.push((Math.random() * 10 + 5).toFixed(1) - 0);
              }
              return res;
            })()
          }
        ]
      });
    },
    drawVisual2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("visual2"));
      // 绘制图表
      myChart.setOption({
        // backgroundColor: '#1b1b1b',
        tooltip: {
          formatter: "{a} <br/>{c} {b}"
        },
        grid: {
          left: "0%",
          right: "0%",
          top: "0%",
          bottom: "0%",
          containLabel: true
        },
        series: [
          {
            name: "温度",
            type: "gauge",
            min: 0,
            max: 220,
            splitNumber: 11,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[0.09, "lime"], [0.82, "#1e90ff"], [1, "#ff4500"]],
                width: 3,
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            axisLabel: {
              // 坐标轴小标记
              textStyle: {
                // 属性lineStyle控制线条样式
                fontWeight: "bolder",
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 15, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            splitLine: {
              // 分隔线
              length: 25, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            pointer: {
              // 分隔线
              shadowColor: "#fff", //默认透明
              shadowBlur: 5
            },
            title: {
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: 15,
                fontStyle: "italic",
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            detail: {
              offsetCenter: [0, '60%'],       // x, y，单位px
              textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
              }
            },
            data: [{ value: 40, name: "°C" }]
          },
          {
            name: "压力",
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
                color: [[0.29, "lime"], [0.86, "#1e90ff"], [1, "#ff4500"]],
                width: 2,
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            axisLabel: {
              // 坐标轴小标记
              textStyle: {
                // 属性lineStyle控制线条样式
                fontWeight: "bolder",
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            pointer: {
              width: 5,
              shadowColor: "#fff", //默认透明
              shadowBlur: 5
            },
            title: {
              offsetCenter: [0, "-30%"], // x, y，单位px
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontStyle: "italic",
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            detail: {
              borderColor: "#fff",
              shadowColor: "#fff", //默认透明
              shadowBlur: 5,
              width: 80,
              height: 30,
              offsetCenter: [25, "20%"], // x, y，单位px
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: 20,
              }
            },
            data: [{ value: 1.5, name: "Pa" }]
          },
          {
            name: "湿度",
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
                color: [[0.2, "lime"], [0.8, "#1e90ff"], [1, "#ff4500"]],
                width: 2,
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            axisLabel: {
              textStyle: {
                // 属性lineStyle控制线条样式
                fontWeight: "bolder",
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              },
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
                width: 3,
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            pointer: {
              width: 2,
              shadowColor: "#fff", //默认透明
              shadowBlur: 5
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
            name: "压力",
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
                color: [[0.2, "lime"], [0.8, "#1e90ff"], [1, "#ff4500"]],
                width: 2,
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            axisTick: {
              // 坐标轴小标记
              show: false
            },
            axisLabel: {
              textStyle: {
                // 属性lineStyle控制线条样式
                fontWeight: "bolder",
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              },
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
                width: 3,
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            pointer: {
              width: 2,
              shadowColor: "#fff", //默认透明
              shadowBlur: 5
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 0.5, name: "Pa" }]
          }
        ]
      });
    },
    queryEquipment() {
      var that = this;
      var params = {
        pageSize: 10,
        pageNum: 1
      };

      var instance = axios.create({
        baseURL: "http://39.108.83.208:9879",
        timeout: 1000
      });
      instance
        .post('/eeda/v1/equipmentInfo/queryWithPage', params)
        .then(function(res) {
          that.selectData = res.data.content;
          that.model10 = that.selectData[0].eId;
        })
        .catch(function(error) {
          console.log(error);
      });
    },
  },

  mounted() {
    this.queryEquipment();
    this.drawVisual1();
    this.drawVisual2();
    this.drawVisual3();
    this.drawVisual5();
  }
};
</script>

<style>
@import "../../../static/css/app.css";

body {
  background: #050d3c url("../../../static/img/bg.png") 0 0 / 100% 100%
    no-repeat;
}
</style>
