<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- <router-view/> -->
    <h1>设备配置管理</h1>
    <h1>数据可视化</h1>
    <h1>其他管理</h1>

    <div>
      <Table :columns="columns" :data="tableData"></Table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",

  components: {},

  data: function() {
    return {
      columns: [
        {
          title: "采集时间",
          width: 150,
          key: "createTime"
        },
        {
          title: "数据",
          width: 150,
          key: "eData"
        },
        {
          title: "数据流水号",
          width: 150,
          key: "eDataId"
        },
        {
          title: "湿度",
          width: 150,
          key: "eMac"
        },
        {
          title: "IP地址",
          width: 150,
          key: "eIp"
        },
        {
          title: "MAC地址",
          width: 150,
          key: "eHumidity"
        },
        {
          title: "压力",
          width: 150,
          key: "ePressure"
        },
        {
          title: "温度",
          width: 150,
          key: "eTemperature"
        }
      ],
      tableData: []
    };
  },

  computed: {},
  watch: {},
  methods: {
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
          console.log(that.tableData);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },

  mounted() {
    this.testAxios();
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
