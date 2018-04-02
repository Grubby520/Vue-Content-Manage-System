<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="time-task-logic">

            <div class="table-title">用户管理列表</div>

            <div class="handle-box">
                <div class="box-left">
                    <el-button type="primary" icon="delete" class="handle-create mr10" @click="openAddDialog">新建</el-button>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="del">删除</el-button>
                </div>

                <!--add/edit dialog-->
                <user-dialog :dialogVisible="dialogVisible" :form="form" v-if="user_asyncLoading"  v-on:callbackParent="callbackFn('dialog')"></user-dialog>

                <!-- power dialog-->
                <user-power-dialog :dialogPowerVisible="dialogPowerVisible" :form="form" v-if="power_asyncLoading"  v-on:callbackParent="callbackFn('power')"></user-power-dialog>

                <div class="box-right">
                    <el-select v-model="select_role" placeholder="角色" class="handle-select mr10">
                        <el-option
                            v-for="item in roles"
                            :key="item.roleId"
                            :label="item.roleName"
                            :value="item.roleId">
                        </el-option>
                    </el-select>
                    <el-select v-model="select_department" filterable placeholder="单位" class="handle-select mr10">
                        <el-option
                            v-for="item in departments"
                            :key="item.orgId"
                            :label="item.orgName"
                            :value="item.orgId">
                        </el-option>
                    </el-select>
                    <el-input v-model="select_word" placeholder="用户名" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">查询</el-button>
                </div>
            </div>

            <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="checkboxChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="num" class="order-num" label="序号" width="80">
                </el-table-column>
                <el-table-column prop="date" label="创建日期">
                </el-table-column>
                <el-table-column prop="name" label="用户名" width="120">
                    <template slot-scope="scope">
                        <!-- bug!-->
                        <el-popover
                            ref="popoverUser"
                            placement="right"
                            width="400"
                            trigger="click">
                            <table cellspacing="0">
                                <tr>
                                    <td>日期</td>
                                    <td>{{scope.row.date}}</td>
                                </tr>
                                <tr>
                                    <td>用户名</td>
                                    <td>{{scope.row.name}}</td>
                                </tr>
                                <tr>
                                    <td>所属单位</td>
                                    <td>{{scope.row.org}}</td>
                                </tr>
                                <tr>
                                    <td>角色</td>
                                    <td>{{scope.row.role}}</td>
                                </tr>
                                <tr>
                                    <td>激活状态</td>
                                    <td>
                                        <p v-if="scope.row.isBind" class="table-success"><img src="../../../../static/img/cg.png" alt=""> 已绑定</p>
                                        <p v-else class="table-fail"><img src="../../../../static/img/fail.png" alt="">未绑定</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>证书状态</td>
                                    <td>
                                        <p v-if="scope.row.isRun" class="table-success"><img src="../../../../static/img/cg.png" alt=""> 已激活</p>
                                        <p v-else class="table-fail"><img src="../../../../static/img/fail.png" alt="">未激活</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>描述</td>
                                    <td>{{scope.row.desc}}</td>
                                </tr>
                            </table>
                        </el-popover>

                        <el-button
                            v-popover:popoverUser
                            type="text"
                            size="small">
                            {{scope.row.name}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="org" label="所属单位">
                </el-table-column>
                <el-table-column prop="role" label="角色">
                </el-table-column>
                <el-table-column prop="power" label="数据权限" width="120">
                    <template slot-scope="scope">
                        <el-button size="small"
                                   @click="openPowerDialog(scope.$index, scope.row)">设置</el-button>
                    </template>
                    </el-table-column>
                <el-table-column prop="isRun" label="激活状态">
                    <template slot-scope="scope">
                            <p v-if="scope.row.isRun" class="table-success"><img src="../../../../static/img/cg.png" alt=""> 已激活</p>
                            <p v-else class="table-fail"><img src="../../../../static/img/fail.png" alt="">未激活</p>
                    </template>
                </el-table-column>
                <el-table-column prop="isBind" label="证书状态" class-name="todo">
                    <template slot-scope="scope">
                        <p v-if="scope.row.isBind" class="table-success"><img src="../../../../static/img/cg.png" alt=""> 已绑定</p>
                        <p v-else class="table-fail"><img src="../../../../static/img/fail.png" alt="">未绑定</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="small" class="handle-edit"
                                   @click="openEditDialog(scope.$index, scope.row)">编辑</el-button>
                    </template>
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
    import api from '../../../axios/api.js'
    import UserDialog from './user-dialog.vue'
    import UserPowerDialog from './user_power_dialog.vue'
    export default {
        components: {
            UserDialog,UserPowerDialog
        },
        data() {
            return  {
                user_asyncLoading: false,//请求才初始化
                power_asyncLoading: false,//请求才初始化
                tableData: [],//table数据json
                total: 65,//模拟
                pageSize: 10,
                currentPage: 1,
                multipleSelection: [],//checkbox选中列表
                roles: [],//查询-select-json
                select_role: '',//selected-role角色
                departments: [],//查询-select-json
                select_department: '',//selected-department部门
                select_word: '',//查询-用户名关键字
                del_idList: [],//存放待删除的list-idArray
                dialogVisible: false,//visible-dialog
                dialogPowerVisible: false,//visible-powerDialog
                form: {
                    title: '',
                    id: '',
                    name: '',
                    pass: '',
                    checkPass: '',
                    roleId: '',
                    orgId: '',
                    desc: '',
                    type: ''
                }
            }
        },
        computed: {

        },
        created(){
            this.getTableData();
            this.getSelectSearchData();
        },
        methods: {
            /*
            * $emit通信
            * */
            callbackFn: function(type){
                console.log(type);
                if(type === 'dialog'){
                    this.dialogVisible = !this.dialogVisible;
                }
                else if(type === 'power'){
                    this.dialogPowerVisible = !this.dialogPowerVisible;
                }
            },
            /*
            * 初始化下拉搜索
            * */
            getSelectSearchData(){
                api.$http('/roleList', {})
                    .then(res => {
                        this.roles = res;
                    });

                api.$http('/departmentList',{})
                    .then(res => {
                        this.departments = res;
                    })
            },
            /*
            * 初始化table
            * */
            getTableData() {
                //api，获取table列表对象
                api.$http('/userTable',
                    {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                        roleId: this.select_role,
                        orgId: this.select_department,
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
                if(!this.user_asyncLoading){
                    this.user_asyncLoading = true;
                }
                this.form = {
                    title: '新建用户',
                    id: '',
                    name : '',
                    desc : '',
                    roleId : '',
                    orgId : '',
                    pass:'',
                    checkPass:'',
                    type: 'add'
                };
                this.dialogVisible = true;
            },
            /*
            * 编辑dialog
            * */
            openEditDialog(index, row) {
                this.form = {
                    title: '编辑用户',
                    id: row.id,
                    name : row.name,
                    desc : row.desc,
                    roleId : row.roleId,
                    orgId : row.orgId,
                    pass:'',
                    checkPass:'',
                    type: 'edit'
                };
                if(!this.user_asyncLoading) this.user_asyncLoading = true;
                // open dialog
                this.dialogVisible = true;
            },
            /*
            * 数据权限dialog
            * */
            openPowerDialog(index, row){
                if(!this.power_asyncLoading){
                    this.power_asyncLoading = true;
                }
                this.form.name = row.name;
                this.form.id = row.id;
                this.form.orgId = row.orgId;
                this.dialogPowerVisible = true;//open dialog
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
                        message: '未勾选需要删除的用户',
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
                        h('span', null, ',是否继续? ')
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
.handle-select{
    width: 120px;
}
</style>
