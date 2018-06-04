<template>
    <div class="table">

        <crumbs :crumbs="crumbs"></crumbs>

        <div class="time-task-logic">

          <div class="lg-title">服务器列表</div>

          <div class="handle-box">

              <div class="box-left"></div>
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
                  <p class="jump-detail" @click="jumpToDetail(scope)">{{scope.row.hostName}}</p>
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
          <pagination :tableArgs="tableArgs" @emitTable="emitTable"></pagination>

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
  import {tableMixin} from '@/assets/js/public'
  import api from '@/axios/api'
  import topFive from '@/components/business-module/topfive/topfive'
  import crumbs from '@/components/page-area/crumbs'
  import pagination from '@/components/page-area/pagination.vue'

  export default {
    mixins: [tableMixin],
    components: {
      topFive, crumbs, pagination
    },
    data(){
        return {
          //顶部crumbs
          crumbs: [
            {
              "title": "资源监管",
              "icon": "icon-1st-resource-supervise",
            }, {
              "title": "基础设施",
              "icon": "icon-2nd-Infrastructure",
            }, {
              "title": "服务器",
            },
          ],
          //select下拉框
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
        }
    },
    created(){
      this.init();
    },
    methods: {
      init(){
        this.initSelectData();
        this.initTable();
      },
        /*
        *  渲染search-select
        * */
        initSelectData(){
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
        emitTable(args){
            //this.dialogVisible = !this.dialogVisible;
            if(args.isInitTable){
                this.initTable();
            }
        },

        /* 跳转至详情页 */
      jumpToDetail(scope){
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
