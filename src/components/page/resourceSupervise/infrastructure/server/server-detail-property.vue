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
            <charts-line id="cpuRate" :option="cpuData" class="chart-lg"></charts-line>
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

        cpuData: {
          xAxisData: ['22:00','00:00','02:00','04:00','06:00','08:00','10：00','12：00','14：00','16：00','18：00','20：00','22：00'],
          seriesData: [
            {
              name: 'cpu',
              data:[20, 70, 42, 20, 40, 65, 56,21,3,42,10,18,32]
            }
          ]
        },
      }
    },
    mounted(){
      this.$nextTick(function(){

      });
    }

  }
</script>
