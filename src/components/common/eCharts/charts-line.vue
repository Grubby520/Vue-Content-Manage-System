<template>
  <div :id="id" :class="className" ref="chart">

  </div>
</template>

<script>
  import eCharts from 'echarts'
  export default {
    name: 'chartsLine',
    props: ['option','id','className'],
    data(){
      return {

      }
    },
    created(){
      console.log(this.id);
    },
    mounted(){
      const myChart = eCharts.init(this.$refs.chart);
      myChart.setOption(this.option);
    }
  }
</script>

<style rel="stylesheet/scss" scoped>

</style>
