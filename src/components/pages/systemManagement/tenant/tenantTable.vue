<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="icon iconfont icon-1st-system-management"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>租户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="time-task-logic">

            <div class="lg-title">租户管理列表</div>

            <div class="handle-box">
                <div class="box-left">
                    <el-button type="primary" icon="icon iconfont icon-add" class="handle-create mr10" @click="openAddDialog">新建</el-button>
                    <el-button type="primary" icon="icon iconfont icon-edit" class="handle-edit mr10" @click="openEditDialog">编辑</el-button>
                    <el-button type="primary" icon="icon iconfont icon-delete" class="handle-del mr10" @click="del">删除</el-button>
                </div>

                <!--add/edit dialog-->
                <tenant-dialog :dialogVisible="dialogVisible" :form="form" v-if="asyncLoading"  @callbackParent="callbackFn"></tenant-dialog>

                <div class="box-right">
                    <el-input v-model="select_word" placeholder="租户名称" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">查询</el-button>
                </div>
            </div>

            <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="checkboxChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="num" class="order-num" label="序号" width="80">
                </el-table-column>
                <el-table-column prop="createTime" label="创建日期">
                </el-table-column>
                <el-table-column prop="name" label="租户名称">
                </el-table-column>
                <el-table-column prop="org" label="所属单位">
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>

        </div>
    </div>
</template>

<script>
    import api from '@/axios/api.js'
    import tenantDialog from './tenant-dialog.vue'
    export default {
        components: {
          tenantDialog
        },
        data() {
            let getHandleWidth = function(){

            };
            return  {
                asyncLoading: false,//请求才初始化
                dialogVisible: false,//visible-dialog
                tableData: [],//table数据json
                total: 67,//模拟
                pageSize: 10,
                currentPage: 1,
                select_word: '',
                multipleSelection: [],//checkbox选中列表
                del_idList: [],//存放待删除的list-idArray
                form: {//form表单
                    title: '',
                    id: '',
                    name: '',
                    orgId: '',
                    publicCloud: '',
                    privateCloud_mobile: '',
                    privateCloud_unicom: '',
                    remark: '',
                    type: ''
                }
            }
        },
        computed: {

        },
        created(){
            this.getTableData();
        },
        methods: {
            /*
            * $emit通信
            * */
            callbackFn: function(args){
                if(args.type === 'dialog'){
                    this.dialogVisible = !this.dialogVisible;
                    if(args.isSubmit){
                        this.getTableData();
                    }
                }
            },
            /*
            * 初始化table
            * */
            getTableData() {
                //api，获取table列表对象
                api.$http('/tenantTable',
                    {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                        keyword: this.select_word,
                        total : this.total
                    })
                    .then(res => {
                        this.tableData = res.articles;
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
                                this.getTableData();
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
                this.pageSize = val;
                this.getTableData();
            },
            /*
            * 分页-设置page
            * */
            handleCurrentChange(val){
                this.currentPage  = val;
                this.getTableData(val);
            },
            /*
            * 搜索-查询table
            * */
            search(){
                this.getTableData();
            }
        }
    }
</script>

<style scoped>
/*没法自适应么？*/
.handle-select{
    width: 120px;
}
</style>
