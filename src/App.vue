<template>
  <div id="app" class="app-index">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <a :class="showdevconfig ? 'app-a' : 'app-b'" @click="showconfig()">设备配置管理</a>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <a :class="showvisualization ? 'app-a' : 'app-b'" @click="showvisual()">数据可视化</a>

    <devconfig v-if="showdevconfig"></devconfig>
    <visualization v-if="showvisualization"></visualization>
  </div>
</template>

<script>
import axios from "axios";
import devconfig from "./pages/devconfig/index.vue";
import visualization from "./pages/visualization/index.vue";

export default {
  name: "App",

  components: {
    devconfig,
    visualization
  },

  data: function() {
    return {
      showdevconfig: false,
      showvisualization: true,
    };
  },

  computed: {},
  watch: {},
  methods: {
    showconfig() {
      var that = this;
      that.showdevconfig = !that.showdevconfig;
      that.showvisualization = false;
    },
    showvisual() {
      var that = this;
      that.showvisualization = !that.showvisualization;
      that.showdevconfig = false;
    },
  },

  mounted() {
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
  margin: 20px 20px 0px 20px;
}

.app-index .app-a {
  font-size: 30px;
}

.app-index .app-b {
  font-size: 30px;
  color: black;
}

</style>
