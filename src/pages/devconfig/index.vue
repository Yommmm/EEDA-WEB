<template>
  <div id="devconfig">
    <div>
      <Table :columns="columns" :data="tableData"></Table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
  }
};
</script>

<style>

</style>
