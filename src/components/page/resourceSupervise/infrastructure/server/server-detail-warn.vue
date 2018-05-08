<template>
  <div>
    <div class="lg-title">告警事件列表</div>

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
</template>
<script>
  export default {
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
      }
    }
  }
</script>
