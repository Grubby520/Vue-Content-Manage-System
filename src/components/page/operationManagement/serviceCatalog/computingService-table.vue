<template>
    <div>
        <div class="handle-box">
            <div class="box-left">
                <el-button type="primary" icon="icon iconfont icon-add" class="handle-create mr10" @click="openAddDialog">新建</el-button>
                <el-button type="primary" icon="icon iconfont icon-edit" class="handle-edit mr10" @click="openEditDialog">编辑</el-button>
                <el-button type="primary" icon="icon iconfont icon-delete" class="handle-del mr10" @click="del">删除</el-button>
            </div>

            <!--add/edit dialog-->
            <computing-service-dialog :dialogVisible="dialogVisible" :tableForm="tableForm" v-if="asyncLoading"  @callbackParent="emitParent"></computing-service-dialog>

        </div>

        <el-table :data="tableList" border style="width: 100%" ref="multipleTable" @selection-change="checkboxChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="sortNo" class="order-num" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="specificSetName" class="order-num" label="规格集名称">
            </el-table-column>
            <el-table-column prop="cores" label="核数(个)">
            </el-table-column>
            <el-table-column prop="memoryCapacity" label="内存(GB)">
            </el-table-column>
            <el-table-column prop="priceUnitName" label="计价单位">
            </el-table-column>
            <el-table-column prop="unitCost" label="单价">
            </el-table-column>
            <el-table-column prop="pricePeriodName" label="计费周期">
            </el-table-column>
            <el-table-column prop="createDate" label="创建日期">
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
    import api from '../../../../axios/api.js'
    import computingServiceDialog from './computingService-dialog.vue'
    export default {
        components: {
            computingServiceDialog
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
              //创建修改table的form参数
              tableForm: {
                  type:'',
                  title:'',
                  id: '',
                  specificSetName: '',
                  cores: '',
                  memoryCapacity: '',
                  priceUnitName: '',
                  unitCost: '',
                  pricePeriodName: '',
                  createDate: ''
              },
              tableList: [],
              dialogVisible: false,
              asyncLoading: false,
              multipleSelection: [],

          }
        },
        created(){
            this.initTable();
        },
        methods: {
            /*
            *  渲染table
            * */
            initTable(){
                api.$http('/serviceCatalog/getComputingServiceTable', this.tableArgs)
                    .then(res => {
                        this.tableList = res.articles;
                        this.tableArgs.total = res.total;
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
            openAddDialog(){
                if(!this.asyncLoading){
                    this.asyncLoading = true;
                }
                this.tableForm = {
                    type:'add',
                    title:'创建计算服务',
                    id: '',
                    specificSetName: '',
                    cores: '',
                    memoryCapacity: '',
                    priceUnitName: '',
                    unitCost: '',
                    pricePeriodName: '',
                    createDate: ''
                };
                this.dialogVisible = true;
            },
            checkboxChange(val){
                this.multipleSelection = val;
            },
            openEditDialog(){

            },
            del(){

            },

            handleSizeChange(val){
                this.tableArgs.pageSize = val;
                this.initTable();
            },
            handleCurrentChange(val){
                this.tableArgs.currentPage  = val;
                this.initTable(val);
            },

        }
    }
</script>
