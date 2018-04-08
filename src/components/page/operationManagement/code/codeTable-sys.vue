<template>
    <div>
        <div class="handle-box">
            <div class="box-left">
                <el-button type="primary" icon="icon iconfont icon-add" class="handle-create mr10" @click="openAddDialog">新建</el-button>
                <el-button type="primary" icon="icon iconfont icon-edit" class="handle-edit mr10" @click="openEditDialog">编辑</el-button>
                <el-button type="primary" icon="icon iconfont icon-delete" class="handle-del mr10" @click="del">删除</el-button>
            </div>
        </div>
        <el-table :data="table_sys.tableData" border style="width: 100%" ref="multipleTable" @selection-change="checkboxChange">
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
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="table_sys.currentPage"
                :page-sizes="[10, 15, 20]"
                :page-size="table_sys.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="table_sys.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import api from '../../../../axios/api.js'
    export default {
        props: {
            request_sys: {type:Object}
        },
        data() {
            return {
                table_sys: {// table相关数据
                    total: 0,
                    pageSize: 10,
                    currentPage: 1,
                    codeType: 'sysCode',
                    id: '',
                    tableData: [
                        {
                            sortNo: 1,
                            dictId: '1231df',
                            dictName: 'zhangsan',
                            dictCode: 'sys-ff',
                            parentName: 'sdf',
                            isEffect: true
                        }
                ],
                },
                setTableData: {}// 接受父组件参数
            };
        },
        computed: {

        },
        created(){

            //this.initTableData();
        },
        watch: {
            request_sys: {
                handler: function(val, oldVal){
                    console.log('change');
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
                api.$http('/codeTable', this.setTableData)
                    .then(res => {
                        console.log(res);
                        this.table_sys.tableData = res.articles;
                        this.table_sys.total = res.total;
                    });
            },
            /*
             * 新建dialog
             * */
            openAddDialog(){
                if(!this.asyncLoading){
                    this.asyncLoading = true;
                }
                this.form = {
                    title: '新建租户',
                    id: '',
                    name: '',
                    orgId: '',
                    publicCloud: '',
                    privateCloud_mobile: '',
                    privateCloud_unicom: '',
                    remark: '',
                    type: 'add'
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
                        message: '未勾选需要编辑的租户',
                        duration: '1500'
                    });
                }
                else if(length > 1){
                    this.$message({
                        type: 'warning',
                        message: '不能同时编辑多个租户',
                        duration: '1500'
                    });
                }
                else{
                    this.form = {
                        title: '编辑用户',
                        id: this.multipleSelection[0].id,
                        name: this.multipleSelection[0].name,
                        orgId: this.multipleSelection[0].orgId,
                        remark: this.multipleSelection[0].remark,
                        publicCloud: this.multipleSelection[0].publicCloud,
                        privateCloud_mobile: this.multipleSelection[0].privateCloud_mobile,
                        privateCloud_unicom: this.multipleSelection[0].privateCloud_unicom,
                        type: 'edit'
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
                        message: '未勾选需要删除的租户',
                        duration: '1500'
                    });
                    return ;
                }
                let str = '';
                for (let i = 0; i < length; i++) {
                    str += _this.multipleSelection[i].name + ' ';
                    _this.del_idList[i] = _this.multipleSelection[i].id;
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
                this.table_sys.pageSize = val;
                this.initTableData();
            },
            /*
             * 分页-设置page
             * */
            handleCurrentChange(val){
                this.table_sys.currentPage  = val;
                this.initTableData(val);
            }
        }
    }

</script>
