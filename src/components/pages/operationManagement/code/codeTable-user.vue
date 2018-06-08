<template>
    <div>
        <div class="handle-box">
            <div class="box-left">
                <el-button type="primary" icon="icon iconfont icon-add" class="handle-create mr10" @click="openAddDialog">新建</el-button>
                <el-button type="primary" icon="icon iconfont icon-edit" class="handle-edit mr10" @click="openEditDialog">编辑</el-button>
                <el-button type="primary" icon="icon iconfont icon-delete" class="handle-del mr10" @click="del">删除</el-button>
            </div>
            <!--add/edit dialog-->
            <code-table-dialog :dialogVisible="dialogVisible" :form="form" v-if="asyncLoading"  @callbackParent="callbackFn"></code-table-dialog>

        </div>
        <el-table :data="table_user.tableData" border style="width: 100%" ref="multipleTable" @selection-change="checkboxChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="sortNo" class="order-num" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="dictName" label="名称">
            </el-table-column>
            <el-table-column prop="dictCode" label="编码">
            </el-table-column>
            <el-table-column prop="parentName" label="上级名">
            </el-table-column>
            <el-table-column prop="isEffect" label="是否生效">
                <template slot-scope="scope">
                    <p v-if="scope.row.isEffect" class="table-success"><i class="icon iconfont icon-success"></i> 已生效</p>
                    <p v-else class="table-fail"><i class="icon iconfont icon-failure"></i> 未生效</p>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="table_user.currentPage"
                :page-sizes="[10, 15, 20]"
                :page-size="table_user.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="table_user.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>

    import codeTableDialog from './codeTable-dialog.vue'
    export default {
        props: {
            request_user: {type:Object}
        },
        components: {
            codeTableDialog
        },
        data() {
            return {
                table_user: {// table相关数据
                    total: 0,
                    pageSize: 10,
                    currentPage: 1,
                    codeType: 'userCode',
                    id: '',
                    tableData: [],
                },
                setTableData: {}, // 接受父组件参数
                form: { // form列表
                    title: '',
                    dictId: '',
                    dictName: '',
                    dictCode: '',
                    isEffect: false,
                    type:'',
                    codeType: 'userCode'
                },
                asyncLoading: true,
                dialogVisible: false,
                multipleSelection: [],//checkbox选中列表
                del_idList: [],//存放待删除的list-idArray
            };
        },
        computed: {

        },
        created(){

            //this.initTableData();
        },
        watch: {
            request_user: {
                handler: function(val, oldVal){
                    this.setTableData = val;
                    this.initTableData();
                },
                deep: true
            }
        },
        methods: {
            /*
             * 初始化table
             * */
            initTableData() {
                //api，获取table列表对象
                this.$api.post('/codeTable',
                    {
                        table: this.setTableData,
                        page: this.table_user
                    })
                    .then(res => {
                        this.table_user.tableData = res.articles;
                        this.table_user.total = res.total;
                    });
            },
            /*
             *  $emit 父子通信
             * */
            callbackFn(args){
                this.dialogVisible = !this.dialogVisible;
                if(args.isSubmit){
                    this.initTableData();
                }
            },
            /*
             * 新建dialog
             * */
            openAddDialog(){
                if(!this.asyncLoading){
                    this.asyncLoading = true;
                }
                this.form = {
                    title: '新建用户码表',
                    dictId: '',
                    dictName: '',
                    dictCode: '',
                    isEffect: false,
                    type:'add',
                    codeType: 'userCode'
                };
                this.dialogVisible = true;
            },
            /*
             * 编辑dialog
             * */
            openEditDialog() {
                const length = this.multipleSelection.length;
                if(length === 0){
                    this.$message({
                        type: 'warning',
                        message: '未勾选需要编辑的码表',
                        duration: '1500'
                    });
                }
                else if(length > 1){
                    this.$message({
                        type: 'warning',
                        message: '不能同时编辑多个码表',
                        duration: '1500'
                    });
                }
                else{
                    this.form = {
                        title: '编辑用户码表',
                        dictId: this.multipleSelection[0].dictId,
                        dictName: this.multipleSelection[0].dictName,
                        dictCode: this.multipleSelection[0].dictCode,
                        isEffect: this.multipleSelection[0].isEffect,
                        type: 'edit',
                        codeType: 'userCode'
                    };
                    if(!this.asyncLoading) this.asyncLoading = true;
                    // open dialog
                    this.dialogVisible = true;
                }
            },
            /*
             * 删除列表
             * */
            del() {
                const _this = this,
                    length = _this.multipleSelection.length;
                if(length === 0){
                    _this.$message({
                        type: 'warning',
                        message: '未勾选需要删除的码表',
                        duration: '1500'
                    });
                    return ;
                }
                let str = '';
                for (let i = 0; i < length; i++) {
                    str += _this.multipleSelection[i].dictName + ' ';
                    _this.del_idList[i] = _this.multipleSelection[i].dictId;
                }
                const h = this.$createElement;
                this.$msgbox({
                    title: '删除',
                    message: h('p', null, [
                        h('span', null, '确定删除 '),
                        h('span', { style: 'color: #03a9f4' }, str),
                        h('span', null, '，是否继续? ')
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        //submit
                        if (action === 'confirm') {
                            console.info( _this.del_idList);
                            _this.del_idList = [];
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            setTimeout(() => {
                                done(); // 关闭
                                this.$message({ // 提交成功
                                    type: 'success',
                                    message: '删除成功!',
                                    duration: '1500'
                                });
                                this.initTableData();
                                setTimeout(() => { //关闭loading
                                    instance.confirmButtonLoading = false;
                                }, 300);
                            }, 1500);
                        }
                        else {
                            done();
                            this.$message({
                                type: 'info',
                                message: '已取消删除',
                                duration: '1500'
                            });
                        }
                    }
                });
            },
            /*
             * checkbox-chang选中的list列表
             * */
            checkboxChange(val) {
                this.multipleSelection = val;
            },
            /*
             * 分页-设置size
             * */
            handleSizeChange(val) {
                this.table_user.pageSize = val;
                this.initTableData();
            },
            /*
             * 分页-设置page
             * */
            handleCurrentChange(val){
                this.table_user.currentPage  = val;
                this.initTableData(val);
            }
        }
    }

</script>
