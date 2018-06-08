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
                                    :highlight-current=true
                                    accordion
                                    v-if="item.id === 'sysCode'"
                                    @node-click="handleNodeClick_sys">
                                </el-tree>

                                <el-tree
                                    :data="item.data"
                                    :props="defaultProps"
                                    :highlight-current=true
                                    accordion
                                    v-else-if="item.id === 'userCode'"
                                    @node-click="handleNodeClick_user">
                                </el-tree>
                            </div></el-col>

                            <el-col :span="18" class="left-border"><div class="grid-content bg-purple-light">

                                <div class="tree-content" v-if="item.id === 'sysCode' ">
                                    <div class="lg-title">{{item.label}}列表</div>
                                    <!--系统码表-->
                                    <code-table-sys :request_sys="request_sys"></code-table-sys>

                                </div>

                                <div class="tree-content" v-else-if="item.id === 'userCode' ">
                                    <div class="lg-title">{{item.label}}列表</div>
                                    <!--用户码表-->
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
        },
        methods: {
            /*
            *  tab切换
            * */
            handleClick(){

            },
            /*
            *  获取treeData
            * */
            initTreeData(){
                this.$api.$http('/codeTree', {})
                    .then(res => {
                        this.tabListArray = res;

                    })
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
