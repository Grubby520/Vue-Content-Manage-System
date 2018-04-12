<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="icon iconfont icon-1st-resource-supervise"></i> 资源监管</el-breadcrumb-item>
                <el-breadcrumb-item><i class="icon iconfont icon-2nd-Infrastructure"></i> 基础设施</el-breadcrumb-item>
                <el-breadcrumb-item>服务器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="time-task-logic">

            <div class="table-title">服务器列表</div>

            <div class="handle-box">
                <div class="box-left">

                </div>
                <div class="box-right not-box-left">
                    <el-select v-model="select_cloudPlatform_id" placeholder="云平台" class="handle-select mr10">
                        <el-option
                            v-for="item in cloudPlatform"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="select_cloudResourcePool_id" filterable placeholder="云资源池" class="handle-select mr10">
                        <el-option
                            v-for="item in cloudResourcePool"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-button type="primary" icon="search" @click="search">查询</el-button>
                </div>
            </div>

            <el-table :data="tableList" border style="width: 100%" ref="multipleTable" @selection-change="checkboxChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="sortNo" class="order-num" label="序号" width="80">
                </el-table-column>
                <el-table-column prop="hostName" label="服务器名称">
                </el-table-column>
                <el-table-column prop="groupRole" label="角色">
                </el-table-column>
                <el-table-column prop="ip" label="服务器IP">
                </el-table-column>
                <el-table-column prop="cloudPlatformName" label="所属云平台">
                </el-table-column>
                <el-table-column prop="cloudResourcePoolName" label="所属云资源池">
                </el-table-column>
                <el-table-column prop="manufacturer" label="设备厂商">
                </el-table-column>
                <el-table-column prop="modelNo" label="设备型号">
                </el-table-column>
                <el-table-column prop="instanceCounts" label="承载云主机(个)">
                </el-table-column>
                <el-table-column prop="healthStatus" label="状态">
                    <template slot-scope="scope">
                        <p v-if="scope.row.healthStatus" class="table-success"><i class="icon iconfont icon-success"></i> 正常</p>
                        <p v-else class="table-fail"><i class="icon iconfont icon-failure"></i> 异常</p>
                    </template>
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
    </div>
</template>

<script>

    import api from '@/axios/api.js'
    export default {
        components: {

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
                //async-data
                tableList: [],
                select_cloudPlatform_id: '',
                select_cloudResourcePool_id: '',
                cloudPlatform: [],
                cloudResourcePool: []
            }
        },
        created(){
            this.initData();
            this.initTable();
        },
        methods: {
            /*
            *  渲染search-select
            * */
            initData(){
                api.$http('/cloudPlatformList', {})
                    .then(res => {
                        this.cloudPlatform = res;
                    });
                api.$http('/cloudResourcePoolList', {})
                    .then(res => {
                        this.cloudResourcePool = res;
                    });
            },
            /*
             *  渲染table
             * */
            initTable(){
                api.$http('/serverList', this.tableArgs)
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
                    Object.assign(this.tableForm, this.multipleSelection[0],{type:'edit',title:'编辑计算服务'});
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
            search(){

            }
        }
    }
</script>
<style scoped>
  .handle-select{
    width: 160px;
  }
</style>
