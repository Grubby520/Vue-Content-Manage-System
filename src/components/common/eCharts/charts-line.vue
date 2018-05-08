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
        // 默认值
        defaultOption: {
          tooltip : {
            trigger: 'axis',
//            formatter: '{a}<br/>{b}  :  {c}%',
            backgroundColor: '#0ec1ee',
            axisPointer: {
              type: 'line',
              lineStyle: {
                color: '#0ec1ee',
                width: 1
              },
            }
          },
          legend: {
            data:[], // change
            x: 'center',
            y: 'bottom'
          },
          calculable : true,

          xAxis : [
            {
              type : 'category',
              boundaryGap: false,
              axisLine : {
                show : true,
                lineStyle : {
                  width : 1,
                  color : '#999',
                  type : 'solid'
                }
              },
              splitLine : {
                show : true,
                lineStyle : {
                  width : 0,
                  color : [ '#999' ],
                  type : 'none'
                }
              },
              axisLable : {
                show : false
              },
              axisTick : {
                show : false
              },
              data : [] // change
            }
          ],
          yAxis : [
            {
              type : 'value',
              boundaryGap: false,
              min: 0,
              axisLabel : {
                formatter : '{value}%'
              },
              axisLine : {
                show : true,
                lineStyle : {
                  width : 1,
                  color : '#999',
                  type : 'solid'
                }
              },
              splitLine : {
                show : true,
                lineStyle : {
                  width : 1,
                  color : [ '#e4e9ec' ],
                  type : 'dashed'
                }
              }
            }
          ],
          series : []
        },
      }
    },
    created(){
      this.initOption();
    },
    mounted(){
      const myChart = eCharts.init(this.$refs.chart);
      myChart.setOption(this.defaultOption);
    },
    methods:{

        initOption(){
          const _this = this;
          _this.defaultOption.xAxis[0].data = _this.option.xAxisData;

          _this.option.seriesData.forEach(function(value, index){
            _this.defaultOption.legend.data.push(value.name);
            let seriesStyle = {
              name:value.name, // change
              type:'line',
              smooth:false,
              symbol : 'emptyCircle',
              symbolSize: 6,
              itemStyle : {
                normal : {
                  color : '#0ec1ee'
                }
              },
              markPoint : {
                symbol : 'rect'
              },
              areaStyle : {
                normal : {
                  color : new eCharts.graphic.LinearGradient(0, 0, 0, 1,
                    [ {
                      offset : 0,
                      color : '#0ec1ee'
                    }, {
                      offset : 1,
                      color : '#fff'
                    } ], false)

                }
              },
              data:value.data // change
            };
            _this.defaultOption.series.push(seriesStyle);
          });

          if(_this.option.unit && _this.option.unit !== '%'){
            _this.defaultOption.yAxis[0].axisLabel.formatter = '{value}'+_this.option.unit;
          }else{
            _this.defaultOption.yAxis[0].max = 100;
          }

        }
    }
  }
</script>

<style rel="stylesheet/scss" scoped>

</style>
