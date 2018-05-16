<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="icon iconfont icon-1st-resource-supervise"></i> 资源监管</el-breadcrumb-item>
        <el-breadcrumb-item><i class="icon iconfont icon-2nd-Infrastructure"></i> 基础设施</el-breadcrumb-item>
        <el-breadcrumb-item><span class="current">存储设备</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="time-task-logic">

      <div class="lg-title">存储设备列表</div>

      <div class="handle-box">
        <div class="box-left">

        </div>
        <div class="box-right not-box-left">
          <el-select v-model="select_cloudPlatform_id" placeholder="云平台" class="handle-select mr10">
            <el-option
              v-for="item in cloudPlatform"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="select_cloudResourcePool_id" filterable placeholder="云资源池" class="handle-select mr10">
            <el-option
              v-for="item in cloudResourcePool"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" icon="search" @click="search">查询</el-button>
        </div>
      </div>

      <el-table
        v-loading="loading"
        :data="tableList"
        border
        style="width: 100%"
        ref="multipleTable">
        <el-table-column prop="sortNo" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="hostName" class="jump-detail" label="存储设备名称">
          <template slot-scope="scope">
            <p class="jump-detail" @click="jumpDetail(scope)">{{scope.row.hostName}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="storageType" label="存储类型">
        </el-table-column>
        <el-table-column prop="cloudPlatformName" label="所属云平台">
        </el-table-column>
        <el-table-column prop="cloudResourcePoolName" label="所属云资源池">
        </el-table-column>
        <el-table-column prop="manufacturer" label="厂家型号">
        </el-table-column>
        <el-table-column prop="instanceCounts" label="存储容量(已使用/总量)">
        </el-table-column>
        <el-table-column prop="healthStatus" label="状态">
          <template slot-scope="scope">
            <p v-if="scope.row.healthStatus" class="table-success"><i class="icon iconfont icon-success"></i> 正常</p>
            <p v-else class="table-fail"><i class="icon iconfont icon-failure"></i> 异常</p>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="tableArgs.currentPage"
          :page-sizes="[10, 15, 20]"
          :page-size="tableArgs.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableArgs.total">
        </el-pagination>
      </div>

    </div>

  </div>
</template>

<script>

  import api from '@/axios/api.js'

  export default {
    data(){
      return {
        //查询table的参数
        tableArgs: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
          args: {}
        },
        //async-data
        tableList: [],
        select_cloudPlatform_id: '',
        select_cloudResourcePool_id: '',
        cloudPlatform: [],
        cloudResourcePool: [],

        loading: true
      }
    },

    methods: {
      /*
       *  渲染search-select
       * */
      initData(){
        api.$http('/cloudPlatformList', {})
          .then(res => {
            this.cloudPlatform = res;
          });
        api.$http('/cloudResourcePoolList', {})
          .then(res => {
            this.cloudResourcePool = res;
          });
      },
      /*
       *  渲染table
       * */
      initTable(){
        api.$http('/storageDeviceList', this.tableArgs)
          .then(res => {
            this.tableList = res.articles;
            this.tableArgs.total = res.total;
            this.loading = false;
          });
      },
      /*
       *  $emit
       * */
      emitParent(args){
        this.dialogVisible = !this.dialogVisible;
        if(args.isSubmit){
          this.initTable();
        }
      },
      /*
       *  翻页
       * */
      handleSizeChange(val){
        this.tableArgs.pageSize = val;
        this.initTable();
      },
      handleCurrentChange(val){
        this.tableArgs.currentPage  = val;
        this.initTable(val);
      },
      search(){
        this.tableArgs.currentPage = 1;
        this.initTable();
      },
      /* 跳转至详情页 */
      jumpDetail(scope){
        this.$router.push( '/storageDevice/'+scope.row.hostName);
      },
    },

    created(){

    },
    mounted(){
      this.initData();
      setTimeout( () => {
        this.initTable();
      },1500);
    }
  }
</script>
<style scoped>
  .handle-select{
    width: 160px;
  }
</style>
