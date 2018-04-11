<template>
    <div>
        <div class="handle-box">
            <div class="box-left">
                <el-button type="primary" icon="icon iconfont icon-add" class="handle-create mr10" @click="openAddDialog">新建</el-button>
                <el-button type="primary" icon="icon iconfont icon-edit" class="handle-edit mr10" @click="openEditDialog">编辑</el-button>
                <el-button type="primary" icon="icon iconfont icon-delete" class="handle-del mr10" @click="del">删除</el-button>
            </div>

            <!--add/edit dialog-->
            <other-service-dialog :dialogVisible="dialogVisible" :tableForm="tableForm" v-if="asyncLoading"  @callbackParent="emitParent"></other-service-dialog>

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
    import otherServiceDialog from './otherService-dialog.vue'
    export default {
        components: {
            otherServiceDialog
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
              //必须的
              tableList: [],
              dialogVisible: false,
              asyncLoading: false,
              multipleSelection: [],
              del_idList: []

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
            /*
            *  创建
            * */
            openAddDialog(){
                if(!this.asyncLoading){
                    this.asyncLoading = true;
                }
                this.tableForm = {
                    type:'add',
                    title:'创建其他服务',
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
            /*
            *  编辑
            * */
            openEditDialog(){
                const length = this.multipleSelection.length;
                if(length === 0){
                    this.$message({
                        type: 'warning',
                        message: '未勾选需要编辑的列表',
                        duration: '1500'
                    });
                }
                else if(length > 1){
                    this.$message({
                        type: 'warning',
                        message: '不能同时编辑多个列表',
                        duration: '1500'
                    });
                }
                else{
                    Object.assign(this.tableForm, this.multipleSelection[0],{type:'edit',title:'编辑其他服务'});
                    if(!this.asyncLoading) this.asyncLoading = true;
                    this.dialogVisible = true;
                }
            },
            /*
            *  删除
            * */
            del(){
                const _this = this,
                    length = _this.multipleSelection.length;
                if(length === 0){
                    _this.$message({
                        type: 'warning',
                        message: '未勾选需要删除的列表',
                        duration: '1500'
                    });
                    return ;
                }
                let str = '';
                for (let i = 0; i < length; i++) {
                    str += _this.multipleSelection[i].sortNo + ' ';
                    _this.del_idList[i] = _this.multipleSelection[i].id;
                }
                const h = _this.$createElement;
                _this.$msgbox({
                    title: '删除',
                    message: h('p', null, [
                        h('span', null, '确定删除序号为 '),
                        h('span', { style: 'color: #03a9f4' }, str),
                        h('span', null, '，是否继续? ')
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        //submit
                        if (action === 'confirm') {
                            console.info(this.multipleSelection);
                            _this.del_idList = [];
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            setTimeout(() => {
                                done(); // 关闭
                                _this.$message({ // 提交成功
                                    type: 'success',
                                    message: '删除成功!',
                                    duration: '1500'
                                });
                                _this.initTable();//刷新table
                                setTimeout(() => { //关闭loading
                                    instance.confirmButtonLoading = false;
                                }, 300);
                            }, 1500);
                        }
                        else {
                            done();
                            _this.$message({
                                type: 'info',
                                message: '已取消删除',
                                duration: '1500'
                            });
                        }
                    }
                });
            },
            /*
             *  checkbox
             * */
            checkboxChange(val){
                this.multipleSelection = val;
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

        }
    }
</script>
