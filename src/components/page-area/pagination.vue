<template>
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
</template>
<script>
  export default {
    props: {
      tableArgs: {
        type: Object,
        required: true
      }
    },

    methods: {
      /* table翻页 */
      handleSizeChange(val){
        console.log('handleSizeChange');
        this.tableArgs.pageSize = val;
        this.$emit('emitTable', {isInitTable: true});
      },
      handleCurrentChange(val){
        console.log('handleCurrentChange');
        this.tableArgs.currentPage  = val;
        this.$emit('emitTable', {isInitTable: true});
      },
    }
  }
</script>


