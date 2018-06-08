<template>
    <div class="table">

        <my-crumbs :crumbs="crumbs"></my-crumbs>

        <div class="time-task-logic">

          <div class="lg-title">服务器列表</div>

          <div class="table-box"
               v-loading="loading"
               element-loading-text="数据加载中...">
            <div class="handle-box">

              <div class="box-left"></div>
              <div class="box-right not-box-left">
                <el-select v-model="providerId" clearable name="providerId" placeholder="云平台" class="handle-select mr10">
                  <el-option
                    v-for="item in providerList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>

                <el-select v-model="regionId" clearable name="regionId" placeholder="云资源池" class="handle-select mr10">
                  <el-option
                    v-for="item in regionList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <el-button type="primary" icon="search" @click="search">查询</el-button>
              </div>
            </div>

            <el-table
              :data="tableList"
              border
              style="width: 100%"
              ref="multipleTable">
              <el-table-column prop="sortNo" label="序号" width="80">
              </el-table-column>
              <el-table-column prop="hostName" class="jump-detail" label="服务器名称">
                <template slot-scope="scope">
                  <p class="jump-detail"
                     @click="jumpToDetail(scope)">
                    {{scope.row.hostName}}
                  </p>
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

            <my-pagination :tableArgs="tableArgs" @emitTable="emitTable"></my-pagination>
          </div>

        </div>
        <div class="time-task-logic noBg noPadding">
          <el-row  :gutter="15" class="noBg">
            <el-col :span="8"><div class="grid-content bg-purple whiteBg padding-15">

              <my-top-five v-bind="usageRateData.cpu"></my-top-five>

            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple whiteBg padding-15">

              <my-top-five v-bind="usageRateData.memory"></my-top-five>

            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple whiteBg padding-15">

              <my-top-five v-bind="usageRateData.storage"></my-top-five>

            </div></el-col>
          </el-row>
        </div>

    </div>
</template>

<script>
  import {tableMixin} from '@/assets/js/public'

  export default {
    mixins: [tableMixin],
    data(){
        return {
          //crumbs
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
          //select
          providerId: '',
          regionId: '',
          providerList: [],
          regionList: [],
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
      /* 渲染select */
      initSelectData(){
          this.$api.$http('/cloudPlatformList', {})
              .then(res => {
                  this.providerList = res;
              });
        this.$api.$http('/cloudResourcePoolList', {})
              .then(res => {
                  this.regionList = res;
              });
      },

      /* 渲染table */
      initTable(){
        this.loading = true;
        setTimeout(()=>{
          //实际项目：catch加上处理
          this.$api.$http('/serverList', this.tableArgs)
            .then(res => {
              this.tableList = res.articles;
              this.tableArgs.total = res.total;
              this.loading = false;
            });
        },1500);

      },

      /*search 额外参数时添加*/
      search(){
        //search-click时才能更新查询数据,为空会传递参数;
        //使用form表单序列化获取也是可取的,且为空时就不会传该参数;
        this.tableArgs.args.providerId = this.providerId;
        this.tableArgs.args.regionId = this.regionId;

        this.tableArgs.currentPage = 1;
        this.initTable();
      },


      /* 跳转至详情页 */
      jumpToDetail(scope){
        this.showScreenLoading();
        setTimeout(()=>{
          this.$router.push( '/server/'+scope.row.hostName);
        },1500);
      },
    }

  }
</script>
<style scoped>
  /* scoped,组件私有
  * select长度无法自适应
 */
  .handle-select{
    width: 160px;
  }
</style>
