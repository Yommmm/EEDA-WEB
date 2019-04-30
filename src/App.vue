<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- <router-view/> -->
    <h1>设备配置管理</h1>
    <h1>数据可视化</h1>
    <h1>其他管理</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",

  components: {},

  data: function() {
    return {
      res: {}
    };
  },

  computed: {},
  watch: {},
  methods: {
    testAxios() {
      var instance = axios.create({
        baseURL: "http://39.108.83.208:9879",
        timeout: 1000,
      });
      instance
        .get("/eeda/v1/equipmentData/list")
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },

  mounted() {
    console.log("6666666666");
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
