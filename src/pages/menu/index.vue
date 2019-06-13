<template>
  <div id="menu">
    <div class="menu-a">
      <router-link class="menu-b" to="/devconfig">设备配置管理</router-link>
      <router-link class="menu-b" to="/visualizationNew">数据可视化</router-link>
    </div>
  </div>
</template>

<script>

export default {
  components: {},

  data: function() {
    return {
      
    };
  },

  computed: {},
  watch: {},
  methods: {
    
  },

  mounted() {
  }
};
</script>

<style>
#menu {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 22% 20px 0px 20px;
}

.menu-a {
  width: 640px;
  height: 100px;
  font-size: 30px;
  margin: 0 auto;
}

.menu-b {
  float: left;
  margin-right: 20px;
  color: white;
  border: 2px solid #999999;
  padding: 20px;
  width: 300px;
  border-radius: 10px;
  background: #999999;
}

.menu-b:hover {
  color: white;
  border: 2px solid #555555;
  border-radius: 10px;
  background: #555555;
}
</style>
