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
        <el-table-column prop="diskRate" label="磁盘(已使用/未使用 GB)">
        </el-table-column>
        <el-table-column prop="storageRate" label="硬盘读/写速率(MB/s)">
        </el-table-column>
        <el-table-column prop="iop" label="IOPS(读/写)">
        </el-table-column>
      </el-table>
    </div>

    <div>
      <div class="lg-title">近期资源使用情况</div>
      <el-row class="outer">

        <el-col :span="12">
          <div class="sm-title">磁盘读写速率</div>
            <charts-line id="diskReadWrite" :option="diskReadWriteData" className="chart-lg"></charts-line>
        </el-col>

        <el-col :span="12">
          <div class="sm-title">IOPS读写量</div>
          <charts-line id="iop" :option="iopData" className="chart-lg"></charts-line>
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
    props: {
      hostname: {type: String},
    },
    data(){
      return {
        tableList:[
          {
            healthStatus: true,
            diskRate: '12/1000',
            storageRate: '50.6/20.4',
            iop: '20/60'
          }
        ],

        diskReadWriteData: {
          xAxisData: [],
          seriesData: [
            {
              name: '读速率',
              data:[]
            },
            {
              name: '写速率',
              data:[]
            }
          ],
          unit: 'MB/S',
        },
        iopData: {
          xAxisData: [],
          seriesData: [
            {
              name: '读次数',
              data:[]
            },
            {
              name: '写次数',
              data:[]
            }
          ],
          unit: '次',
        },
      }
    },
    created(){
      //API接口-造假数据
      const _this = this;
      let time = new Date().getHours();
      for(let i=0;i<25;i++){
        const tp = parseInt(Math.random()*10);
        _this.diskReadWriteData.seriesData[0].data[i] = tp;
        _this.diskReadWriteData.seriesData[1].data[i] = 30-tp;

        const tp1 = parseInt(Math.random()*10);
        _this.iopData.seriesData[0].data[i] = tp1;
        _this.iopData.seriesData[1].data[i] = 35-tp1;

        time === 24 ? time = 0 : '';

        _this.diskReadWriteData.xAxisData[i] = time+':00';
        _this.iopData.xAxisData[i] = time+':00';
        time++;
      }
    },
    mounted(){
      this.$nextTick(function(){

      });
    }

  }
</script>
