<template>
  <div>
    <div>
      <div class="table-title">性能列表</div>

      <el-table :data="tableList" border style="width: 100%">
        <el-table-column prop="healthStatus" label="状态">
          <template slot-scope="scope">
            <p v-if="scope.row.healthStatus" class="table-success"><i class="icon iconfont icon-success"></i> 正常</p>
            <p v-else class="table-fail"><i class="icon iconfont icon-failure"></i> 异常</p>
          </template>
        </el-table-column>
        <el-table-column prop="cpuRate" label="CPU使用率(%)">
        </el-table-column>
        <el-table-column prop="memoryRate" label="内存使用率(%)">
        </el-table-column>
        <el-table-column prop="storageRate" label="硬盘使用率(%)">
        </el-table-column>
        <el-table-column prop="readwriteRate" label="硬盘读/写速率(MB/s)">
        </el-table-column>
        <el-table-column prop="manufacturer" label="网络上/下行速率(MB/s)">
        </el-table-column>
      </el-table>
    </div>
    <div>
      <div class="table-title">近期资源使用情况</div>
      <el-row class="outer">
        <el-col :span="12">
          <div class="table-title">CPU使用率</div>
            <charts-line id="cpuRate" :option="option" class="chart-lg"></charts-line>
        </el-col>
        <el-col :span="12">
          <div class="table-title">CPU负载</div>
          <div class="chart-lg" id="cpuLoad">

          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import eCharts from 'echarts'
  import {initLine} from '@/assets/js/components/charts'
  import chartsLine from '@/components/common/eCharts/charts-line'
  export default {
    components: {
      chartsLine
    },
    data(){
      return {
        tableList:[
          {
            healthStatus: true,
            cpuRate: '49.5',
            memoryRate: '73.6',
            storageRate: '20',
            readwriteRate: '50.6/20.4',
            manufacturer: '20/60'
          }
        ],
        option:{
          tooltip : {
            trigger: 'axis',
            formatter: '{a}<br/>{b}:{c}%',
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
            data:['意向','成交']
          },
          calculable : true,
          xAxis : [
            {
              type : 'category',
              axisLine : {
                show : true,
                lineStyle : {
                  width : 0,
                  color : '#999',
                  type : 'dashed'
                }
              },
              splitLine : {
                show : true,
                lineStyle : {
                  width : 0,
                  color : [ '#f00' ],
                  type : 'none'
                }
              },
              axisLable : {
                show : false
              },
              axisTick : {
                show : false
              },
              data : ['周一','周二','周三','周四','周五','周六','周日']
            }
          ],
          yAxis : [
            {
              type : 'value',
              min: '0',
              axisLabel : {
                formatter : '{value}%'
              },
              axisLine : {
                show : true,
                lineStyle : {
                  width : 0,
                  color : '#999',
                  type : 'dashed'
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
          series : [
            {
              name:'意向',
              type:'line',
              smooth:true,
              symbol : 'emptyCircle',
              symbolSize: 3,
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
              data:[5, 7, 42, 20, 140, 650, 560]
            }
          ]
        },
      }
    },
    mounted(){
//      this.$nextTick(function(){
//        initLine({
//          id: 'cpuRate'
//        })
//
//      });
    }

  }
</script>
