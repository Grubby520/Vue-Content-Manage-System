<template>
  <div>
    <div class="lg-title">资源变更列表</div>
    <div class="table-box"
         v-loading="loading"
         element-loading-text="数据加载中...">
      <div class="handle-box">
        <div class="box-left">

        </div>
        <div class="box-right">
          <el-select v-model="typeId" clearable placeholder="变更类型" class="handle-select mr10">
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
              <p>{{scope.row.content}}</p>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <my-pagination :tableArgs="tableArgs" @emitTable="emitTable"></my-pagination>
    </div>


  </div>
</template>
<script>
  import {tableMixin} from '@/assets/js/public'

  export default {
    mixins: [tableMixin],
    props: {
      hostname: {type: String},
    },
    data(){
      return {
        //select
        typeId:'',
        typeList: [],
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
        this.$api.post('/warnTypeList', {hostname: this.hostname})
          .then(res => {
            this.typeList = res;
          });
      },
      /*
       *  渲染table
       * */
      initTable(){
        this.loading = true;
        setTimeout(()=>{
          this.$api.post('/warnList', this.tableArgs)
            .then(res => {
              this.tableList = res.articles;
              this.tableArgs.total = res.total;
              this.loading = false;
            });
        },1200);
      },

      search(){
        this.tableArgs.args.typeId = this.typeId;
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
