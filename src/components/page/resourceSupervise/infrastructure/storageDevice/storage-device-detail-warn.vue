<template>
  <div>
    <div class="lg-title">资源变更列表</div>
    <div class="handle-box">
      <div class="box-left">

      </div>
      <div class="box-right">
        <el-select v-model="select_type_id" placeholder="变更类型" class="handle-select mr10">
          <el-option
            v-for="item in typeList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>

        <el-button type="primary" icon="search" @click="search">查询</el-button>
      </div>
    </div>

    <el-table :data="tableList" border style="width: 100%">
      <el-table-column prop="sortNo" label="序号" width="80">
      </el-table-column>
      <el-table-column prop="time" label="告警时间" width="160">
      </el-table-column>
      <el-table-column prop="type" label="告警类型" width="200">
      </el-table-column>
      <el-table-column prop="name" label="告警名称" width="220">
      </el-table-column>
      <el-table-column prop="status" label="告警状态" width="120">
      </el-table-column>
      <el-table-column prop="content" label="告警内容">
        <template slot-scope="scope">
          <!--<p class="text-overflow" :title="scope.row.content">{{scope.row.content}}</p>-->
          <el-tooltip class="item text-overflow" popper-class="maxWidth" transition="" effect="light" :content="scope.row.content" placement="top">
            <el-button>{{scope.row.content}}</el-button>
          </el-tooltip>
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
</template>
<script>

  import api from '@/axios/api.js'

  export default {
    props: {
      hostname: {type: String},
    },
    data(){
      return {
        //查询table的参数
        tableArgs: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
          args: {
            hostname: ''
          }
        },
        //async-data
        tableList:[],
        //filter-table-data
        typeList: [],
        select_type_id:'',
      }
    },
    created(){
      this.initData();

      this.tableArgs.args.hostname = this.hostname; // 传参
      this.initTable();

    },
    methods:{
      /*
       *  渲染search-select
       * */
      initData(){
        api.$http('/warnTypeList', {})
          .then(res => {
            this.typeList = res;
          });
      },
      /*
       *  渲染table
       * */
      initTable(){
        api.$http('/warnList', this.tableArgs)
          .then(res => {
            this.tableList = res.articles;
            this.tableArgs.total = res.total;
          });
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

    },

  }
</script>
<style>
  .maxWidth{
    max-width: 600px;
    line-height: 1.2em;
  }
</style>
