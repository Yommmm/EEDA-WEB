<template>
  <div>
    <header id="header">
			<h3 class="header-title">数据分析平台</h3>
		</header>
		
		<div id="container">
			<div id="flexCon">
				<div class="flex-row">
					<div class="flex-cell flex-cell-l">
						<div class="chart-wrapper">
							<h3 class="chart-title">图表</h3>
							<div class="chart-div">
								<div class="chart-loader"><div class="loader"></div></div>
							</div>
						</div>
					</div>
					<div class="flex-cell flex-cell-c">
						<div class="chart-wrapper">
							<h3 class="chart-title"></h3>
							<div class="chart-div"></div>
						</div>
					</div>
					<div class="flex-cell flex-cell-r">
						<div class="chart-wrapper">
							<h3 class="chart-title"></h3>
							<div class="chart-div chart-done">
								<div class="chart-loader"><div class="loader"></div></div>
							</div>
						</div>
					</div>
				</div>
				<div class="flex-row">
					<div class="flex-cell flex-cell-lc">
						<div class="chart-wrapper">
							<h3 class="chart-title"></h3>
							<div class="chart-div chart-done">
								<div class="chart-loader"><div class="loader"></div></div>
							</div>
						</div>
					</div>
					<div class="flex-cell flex-cell-r">
						<div class="chart-wrapper">
							<h3 class="chart-title"></h3>
							<div class="chart-div chart-done">
								<div class="chart-loader"><div class="loader"></div></div>
							</div>
						</div>
					</div>
				</div>
			</div>
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
@import "../../../static/css/app.css";

body {
  background:#050d3c url("../../../static/img/bg.png") 0 0 / 100% 100% no-repeat;
}

</style>
