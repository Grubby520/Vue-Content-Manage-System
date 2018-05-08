<template>
  <div>
    <div>
      <div class="lg-title">性能列表</div>

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
      <div class="lg-title">近期资源使用情况</div>
      <el-row class="outer">
        <el-col :span="12">
          <div class="sm-title">CPU使用率</div>
            <charts-line id="cpuRate" :option="cpuRateData" className="chart-lg"></charts-line>
        </el-col>
        <el-col :span="12">
          <div class="sm-title">CPU负载</div>
          <charts-line id="cpuLoad" :option="cpuLoadData" className="chart-lg"></charts-line>
        </el-col>
        <el-col :span="12">
          <div class="sm-title">内存使用率</div>
          <charts-line id="memoryUsing" :option="memoryUsingData" className="chart-lg"></charts-line>
        </el-col>
        <el-col :span="12">
          <div class="sm-title">网络流量</div>
          <charts-line id="networkFlow" :option="networkFlowData" className="chart-lg"></charts-line>
        </el-col>
        <el-col :span="12">
          <div class="sm-title">磁盘使用情况</div>
          <charts-line id="diskUsing" :option="diskUsingData" className="chart-lg"></charts-line>
        </el-col>
        <el-col :span="12">
          <div class="sm-title">硬盘读写量</div>
          <charts-line id="HardDisk" :option="HardDiskData" className="chart-lg"></charts-line>
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

        cpuRateData: {
          xAxisData: [],
          seriesData: [
            {
              name: 'cpu使用率',
              data:[]
            }
          ]
        },
        cpuLoadData: {
          xAxisData: [],
          seriesData: [
            {
              name: 'cpu负载',
              data:[]
            }
          ],
          unit: '个',
        },

        memoryUsingData: {
          xAxisData: [],
          seriesData: [
            {
              name: '使用率',
              data:[]
            }
          ],
          unit: '%',
        },

        networkFlowData: {
          xAxisData: [],
          seriesData: [
            {
              name: '上行流量',
              data:[]
            },
            {
              name: '下行流量',
              data:[]
            }
          ],
          unit: 'MB',
        },
        diskUsingData: {
          xAxisData: [],
          seriesData: [
            {
              name: '使用量',
              data:[]
            },
            {
              name: '剩余量',
              data:[]
            }
          ],
          unit: 'GB',
        },
        HardDiskData: {
          xAxisData: [],
          seriesData: [
            {
              name: '读数据',
              data:[]
            },
            {
              name: '写数据',
              data:[]
            }
          ],
          unit: 'MB',
        },
      }
    },
    created(){
      //API接口-造假数据
      const _this = this;
      let time = new Date().getHours();
      _this.cpuRateData.xAxisData.splice(13);
      for(let i=0;i<25;i++){
        _this.cpuRateData.seriesData[0].data[i] = parseInt(Math.random()*100);
        _this.cpuLoadData.seriesData[0].data[i] = parseInt(Math.random()*10);
        _this.memoryUsingData.seriesData[0].data[i] = parseInt(Math.random()*50);

        _this.networkFlowData.seriesData[0].data[i] = parseInt(Math.random()*10);
        _this.networkFlowData.seriesData[1].data[i] = parseInt(Math.random()*20);

        _this.diskUsingData.seriesData[0].data[i] = parseInt(Math.random()*10);
        _this.diskUsingData.seriesData[1].data[i] = parseInt(Math.random()*20);

        _this.HardDiskData.seriesData[0].data[i] = parseInt(Math.random()*10);
        _this.HardDiskData.seriesData[1].data[i] = parseInt(Math.random()*20);

        time === 24 ? time = 0 : '';
        _this.cpuRateData.xAxisData[i] = time+':00';
        _this.cpuLoadData.xAxisData[i] = time+':00';
        _this.memoryUsingData.xAxisData[i] = time+':00';
        _this.networkFlowData.xAxisData[i] = time+':00';
        _this.diskUsingData.xAxisData[i] = time+':00';
        _this.HardDiskData.xAxisData[i] = time+':00';
        time++;
      }
    },
    mounted(){
      this.$nextTick(function(){

      });
    }

  }
</script>
