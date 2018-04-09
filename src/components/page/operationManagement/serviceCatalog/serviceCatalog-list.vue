<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="icon iconfont icon-1st-system-management"></i> 运营管理</el-breadcrumb-item>
                <el-breadcrumb-item>服务目录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="time-task-logic">

                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane  v-for="item in tabList" :key="item.id" :label="item.label" :name="item.id">
                        <el-row>
                            <el-col><div class="grid-content bg-purple-light">

                                <div class="tree-content" v-if="item.id === 'computingService' ">
                                    <div class="table-title">{{item.label}}列表</div>
                                    <!--计算服务-->
                                    <computing-service-table></computing-service-table>
                                    <!--<code-table-sys :request_sys="request_sys"></code-table-sys>-->
                                </div>

                                <div class="tree-content" v-else-if="item.id === 'storageService' ">
                                    <div class="table-title">{{item.label}}列表</div>
                                    <!--存储服务-->
                                    <!--<code-table-user :request_user="request_user"></code-table-user>-->
                                </div>

                                <div class="tree-content" v-else-if="item.id === 'softwareService' ">
                                    <div class="table-title">{{item.label}}列表</div>
                                    <!--软件服务-->
                                    <!--<code-table-user :request_user="request_user"></code-table-user>-->
                                </div>

                                <div class="tree-content" v-else-if="item.id === 'networkSecurityService' ">
                                    <div class="table-title">{{item.label}}列表</div>
                                    <!--网络安全服务-->
                                    <!--<code-table-user :request_user="request_user"></code-table-user>-->
                                </div>

                                <div class="tree-content" v-else-if="item.id === 'thirdSecurityService' ">
                                    <div class="table-title">{{item.label}}列表</div>
                                    <!--第三方安全服务-->
                                    <!--<code-table-user :request_user="request_user"></code-table-user>-->
                                </div>

                                <div class="tree-content" v-else-if="item.id === 'otherService' ">
                                    <div class="table-title">{{item.label}}列表</div>
                                    <!--其他服务-->
                                    <!--<code-table-user :request_user="request_user"></code-table-user>-->
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
    import computingServiceTable from './computingService-table.vue'
//    import codeTableUser from './codeTable-user.vue'

    export default {
        components: {
            computingServiceTable,
//            codeTableUser
        },
        data() {
            return {
                tabList: [],
                activeName: '',
            };
        },
        computed: {},
        created(){
            this.getTabList();
        },
        methods: {
            /*
            *  tab切换
            * */
            handleClick(){

            },
            /*
            *  获取tabList
            * */
            getTabList(){
                api.$http('/serviceCatalog/getTabList', {})
                    .then(res => {
                        this.tabList = res;
                        this.activeName = res[0].id;
                    })
            },
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
