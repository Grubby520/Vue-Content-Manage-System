<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="icon iconfont icon-1st-system-management"></i> 运营管理</el-breadcrumb-item>
                <el-breadcrumb-item>码表管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="time-task-logic">

                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane  v-for="item in tabListArray" :key="item.id" :label="item.label" :name="item.id">

                        <el-row>
                            <el-col :span="6"><div class="grid-content bg-purple">
                                <el-tree
                                    :data="item.data"
                                    :props="defaultProps"
                                    accordion
                                    v-if="item.id === 'sysCode'"
                                    @node-click="handleNodeClick_sys">
                                </el-tree>
                                <el-tree
                                    :data="item.data"
                                    :props="defaultProps"
                                    accordion
                                    v-else-if="item.id === 'userCode'"
                                    @node-click="handleNodeClick_user">
                                </el-tree>
                            </div></el-col>

                            <el-col :span="18" class="left-border"><div class="grid-content bg-purple-light">
                                <!--系统码表-->
                                <div class="tree-content" v-if="item.id === 'sysCode' ">
                                    <div class="table-title">{{item.label}}列表</div>
                                    <code-table-sys :request_sys="request_sys"></code-table-sys>
                                </div>
                                <!--用户码表-->
                                <div class="tree-content" v-else-if="item.id === 'userCode' ">
                                    <div class="table-title">{{item.label}}列表</div>
                                    <code-table-user :request_user="request_user"></code-table-user>
                                </div>
                            </div></el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>


        </div>
    </div>
</template>

<script>
    import api from '../../../../axios/api.js'
    import codeTableSys from './codeTable-sys.vue'
    import codeTableUser from './codeTable-user.vue'

    export default {
        components: {
            codeTableSys,
            codeTableUser
        },
        data() {
            return {
                activeName: 'sysCode',
                tabListArray: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                request_sys: {},// table查询req
                request_user: {},// table查询req

                table_sys: {
                    total: 0,//模拟
                    pageSize: 10,
                    currentPage: 1,
                    codeType: 'sysCode',
                    id: '',
                    tableData: [],
                },
                table_user: {
                    total: 0,//模拟
                    pageSize: 10,
                    currentPage: 1,
                    codeType: 'sysCode',
                    id: '',
                    tableData: [],
                },
            };
        },
        computed: {

        },
        created(){
            this.initTreeData();
//            this.initTableData();
        },
        methods: {
            /*
            *  获取treeData
            * */
            initTreeData(){
                api.$http('/codeTree', {})
                    .then(res => {
                        this.tabListArray = res;

                    })
            },
            /*
             * 初始化table
             * */
            initTableData() {
                //api，获取table列表对象
                api.$http('/codeTable', this.request_sys)
                    .then(res => {
                        this.table_sys.tableData = res.articles;
                        this.table_sys.total = res.total;
                    });
            },
            /*
             * 新建dialog
             * */
            openAddDialog(){
                console.log(data);
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
            handleClick(tab, event) {
            },
            /*
            *  点击tree-刷新table
            * */
            handleNodeClick_sys(data) {
                this.request_sys = data;
            },
            handleNodeClick_user(data) {
                this.request_user = data;
            }
        }
    }
</script>

<style scoped>
    .el-tree{
        border: none;
    }
    .left-border{
        border-left: 1px solid #e7ecf0;
    }
    .tree-content{
        margin-left: 15px;
    }
</style>
