<template>
  <div>
    <div class="lg-title">资源变更列表</div>
    <div class="table-box">
         <!--v-loading="loading"-->
         <!--element-loading-text="数据加载中..."-->
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
        <el-table-column prop="time" label="变更时间">
        </el-table-column>
        <el-table-column prop="type" label="变更类型">
        </el-table-column>
        <el-table-column prop="resourceBefore" label="变更前资源">
        </el-table-column>
        <el-table-column prop="resourceAfter" label="变更后资源">
        </el-table-column>
        <el-table-column prop="author" label="变更人">
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
      hostname: {type: String, required: true},
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
      this.$api.post('/changeTypeList', {hostname: this.hostname})
        .then(res => {
          this.typeList = res;
        });
    },
    /*
     *  渲染table
     * */
    initTable(){
      this.$api.post('/changeList', this.tableArgs)
        .then(res => {
          this.tableList = res.articles;
          this.tableArgs.total = res.total;
        })
        .catch(error => {
          console.log(error);
        });
    },

    search(){
      this.tableArgs.args.typeId = this.typeId;
      this.tableArgs.currentPage = 1;
      this.initTable();
    },
  },
}
</script>
