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

        <el-date-picker
          v-model="dateTime"
          type="daterange"
          size="200"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>

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
            hostname: '',
            dateTime: ''
          }
        },

        //async-data
        tableList:[],
        typeList: [],

        //filter-table-data
        select_type_id:'',
        dateTime:'',

        //default-dateTimeType
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
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
        this.$api.$http('/changeTypeList', {})
          .then(res => {
            this.typeList = res;
          });
      },
      /*
       *  渲染table
       * */
      initTable(){
        this.$api.$http('/changeList', this.tableArgs)
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
