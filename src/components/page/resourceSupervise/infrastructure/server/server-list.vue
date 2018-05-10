<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="icon iconfont icon-1st-resource-supervise"></i> 资源监管</el-breadcrumb-item>
                <el-breadcrumb-item><i class="icon iconfont icon-2nd-Infrastructure"></i> 基础设施</el-breadcrumb-item>
                <el-breadcrumb-item><span class="current">服务器</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="time-task-logic">

            <div class="lg-title">服务器列表</div>

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

            <el-table :data="tableList" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="sortNo" label="序号" width="80">
                </el-table-column>
                <el-table-column prop="hostName" class="jump-detail" label="服务器名称">
                  <template slot-scope="scope">
                    <p class="jump-detail" @click="jumpDetail(scope)">{{scope.row.hostName}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="groupRole" label="角色">
                </el-table-column>
                <el-table-column prop="ip" label="服务器IP">
                </el-table-column>
                <el-table-column prop="cloudPlatformName" label="所属云平台">
                </el-table-column>
                <el-table-column prop="cloudResourcePoolName" label="所属云资源池">
                </el-table-column>
                <el-table-column prop="manufacturer" label="设备厂商">
                </el-table-column>
                <el-table-column prop="modelNo" label="设备型号">
                </el-table-column>
                <el-table-column prop="instanceCounts" label="承载云主机(个)">
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
        <div class="time-task-logic noBg noPadding">
          <el-row  :gutter="15" class="noBg">
            <el-col :span="8"><div class="grid-content bg-purple whiteBg padding-15">

              <top-five v-bind="usageRateData.cpu"></top-five>

            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple whiteBg padding-15">

              <top-five v-bind="usageRateData.memory"></top-five>

            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple whiteBg padding-15">

              <top-five v-bind="usageRateData.storage"></top-five>

            </div></el-col>
          </el-row>
        </div>

    </div>
</template>

<script>

    import api from '@/axios/api.js'
    import topFive from '@/components/common/topfive/topfive.vue'

    export default {
      components: {
        topFive
      },
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
            //top5
            usageRateData: {
                cpu: {
                      title: 'CPU使用率TOP5',
                      valueType: 'value',//数值
                      unit: 'GB',
                      dataList: [
                        {name: 'small', value: 300},
                        {name: 'big', value: 1200},
                        {name: 'middle', value: 800},
                        {name: 'xx', value: 10}
                      ]
                  },
                memory: {
                  title: '内存使用率TOP5',
                  valueType: 'value',
                  unit: 'GB',
                  dataList: []
                },
                storage: {
                  title: '存储使用率TOP5',
                  valueType: 'rate', //比例
                  unit: '%',
                  dataList: [
                    {name: 'small', value: 20},
                    {name: 'big', value: 70},
                    {name: 'middle', value: 30}
                  ]
                }
              },
            titles:'who are you'
          }
      },
      created(){
        this.initData();
        this.initTable();
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
              api.$http('/serverList', this.tableArgs)
                  .then(res => {
                      this.tableList = res.articles;
                      this.tableArgs.total = res.total;
                      for (const key in this.usageRateData) {
                        for (const inner in this.usageRateData[key].dataList) {
                            if(this.usageRateData[key].dataList[inner].name != '-'){
                              this.usageRateData[key].dataList[inner].name = res.articles[inner].hostName;
                            }else{
                              this.usageRateData[key].dataList[inner].name = '-';
                            }
                        }
                      }
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
          this.$router.push( '/server/'+scope.row.hostName);
        },
      }
    }
</script>
<style scoped>
  .handle-select{
    width: 160px;
  }
</style>
