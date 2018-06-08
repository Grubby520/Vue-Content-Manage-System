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
                                    <div class="lg-title">{{item.label}}列表</div>
                                    <!--计算服务-->
                                    <computing-service-table></computing-service-table>
                                </div>

                                <div class="tree-content" v-else-if="item.id === 'storageService' ">
                                    <div class="lg-title">{{item.label}}列表</div>
                                    <!--存储服务-->
                                    <storage-service-table></storage-service-table>
                                </div>

                                <div class="tree-content" v-else-if="item.id === 'softwareService' ">
                                    <div class="lg-title">{{item.label}}列表</div>
                                    <!--软件服务-->
                                    <software-service-table></software-service-table>
                                </div>

                                <div class="tree-content" v-else-if="item.id === 'networkSecurityService' ">
                                    <div class="lg-title">{{item.label}}列表</div>
                                    <!--网络安全服务-->
                                    <network-security-service-table></network-security-service-table>
                                </div>

                                <div class="tree-content" v-else-if="item.id === 'thirdSecurityService' ">
                                    <div class="lg-title">{{item.label}}列表</div>
                                    <!--第三方安全服务-->
                                    <third-security-service-table></third-security-service-table>
                                </div>

                                <div class="tree-content" v-else-if="item.id === 'otherService' ">
                                    <div class="lg-title">{{item.label}}列表</div>
                                    <!--其他服务-->
                                    <other-service-table></other-service-table>
                                </div>

                            </div></el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>


        </div>
    </div>
</template>

<script>

    import computingServiceTable from './computingService-table.vue'
    import storageServiceTable from './storageService-table.vue'
    import softwareServiceTable from './softwareService-table.vue'
    import networkSecurityServiceTable from './networkSecurityService-table.vue'
    import thirdSecurityServiceTable from './thirdSecurityService-table.vue'
    import otherServiceTable from './otherService-table.vue'

    export default {
        components: {
            computingServiceTable,
            storageServiceTable,
            softwareServiceTable,
            networkSecurityServiceTable,
            thirdSecurityServiceTable,
            otherServiceTable
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
                this.$api.post('/serviceCatalog/getTabList', {})
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
