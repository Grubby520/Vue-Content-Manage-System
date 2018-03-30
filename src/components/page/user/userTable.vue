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
                <user-dialog :dialogVisible="dialogVisible" :form="form" v-if="asyncLoading"  v-on:callbackParent="callbackFn"></user-dialog>

                <!-- power 数据权限弹窗-->
                <el-dialog title="用户数据权限设置" :visible.sync="dialogPowerVisible">
                    <span slot="title">用户数据权限设置<span style="color: #4db3ff;">（{{name}}）</span></span>
                    <el-form :model="form">
                        <el-transfer
                            v-model="orgPower"
                            :data="power_data"
                            :titles="['源云平台','目的云平台']">
                        </el-transfer>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogPowerCancel">取 消</el-button>
                        <el-button type="primary" @click="dialogPowerSubmit">提 交</el-button>
                    </div>
                </el-dialog>

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

            <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
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
                                   @click="dialogPowerOpen(scope.$index, scope.row)">设置</el-button>
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
                    :current-page="cur_page"
                    :page-sizes="[10, 15]"
                    :page-size="15"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="30">
                </el-pagination>
            </div>

        </div>
    </div>
</template>

<script>
    import api from '../../../axios/api.js'
    import UserDialog from './user-dialog.vue'
    export default {
        components: {
            UserDialog
        },
        data() {
            //自定义方法
            const getPowerData = () => {
                const data = [];
                data.push(
                    {key:1,label:'移动-华三'},
                    {key:2,label:'电信-腾讯'},
                    {key:3,label:'联通-华为'}
                    );
                return data;
            };
            return  {
                asyncLoading: false,
                tableData: [],
                cur_page: 1,//当前页码
                page_size: 15,//1页条数
                multipleSelection: [],
                roles: [],
                select_role: '',
                departments: [],
                select_department: '',
                select_word: '',
                del_list: [],
                is_search: false,
                dialogAddVisible: false,
                dialogVisible: false,
                dialogPowerVisible: false,
                name: '',
                dialogUserVisible: false,
                modal1: false,
                roleId: '',
                orgId: '',
                desc: 'address-desac',
                form: {
                    title: '',
                    name: '',
                    pass: '',
                    checkPass: '',
                    roleId: '',
                    orgId: '',
                    desc: '',
                    type: ''
                },
                formLabelWidth: '150px',
                power_data:getPowerData(),
                orgPower: [],//权限arr

            }
        },
        created(){
            this.getTableData();
            this.getSelectSearchData();
        },
        computed: {

        },
        methods: {
            //通信$emit
            callbackFn: function(){
                this.dialogVisible = !this.dialogVisible;
            },
            //初始化下拉搜索
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
            //初始化table
            getTableData() {
                //api，获取table列表对象
                api.$http('/userTable',
                    {
                        curPage: this.cur_page,
                        pageSize: this.page_size
                    })
                    .then(res => {
                        this.tableData = res.articles;
                    });
            },
            //新建dialog
            openAddDialog(){
                if(!this.asyncLoading){
                    this.asyncLoading = true;
                }
                this.form = {
                    title: '新建用户',
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
            //编辑dialog
            openEditDialog(index, row) {
                this.form = {
                    title: '编辑用户',
                    name : row.name,
                    desc : row.desc,
                    roleId : row.roleId,
                    orgId : row.orgId,
                    pass:'',
                    checkPass:'',
                    type: 'edit'
                };
                if(!this.asyncLoading) this.asyncLoading = true;
                // open dialog
                this.dialogVisible = true;
            },
            //搜索
            search(){
                this.is_search = true;
            },

            //per page number
            handleSizeChange(val) {
                this.page_size = val;
                this.getTableData(val);
            },
            //goTo page
            handleCurrentChange(val){
                this.cur_page = val;
                this.getTableData(val);
            },





            /*设置按钮*/
            //open
            dialogPowerOpen(index, row) {
                //接口，获取当前orgId对应的orgPower的值
                api.$http('/userTable/getUserPower',
                    {
                        orgId: row.orgId
                    })
                    .then(res => {
                        this.orgPower = res.orgPower
                    });
                this.name = row.name;
                this.dialogPowerVisible = true;//open dialog
            },
            //submit
            dialogPowerSubmit() {
                this.dialogPowerVisible = false;
                console.log(this.orgPower);
                this.$message({
                    type: 'success',
                    message: '提交成功',
                    duration: '1500'
                });
            },
            //cancel
            dialogPowerCancel() {
                this.dialogPowerVisible = false;
            },

            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },

            //删除button
            del() {
                const self = this,
                       length = self.multipleSelection.length;
                //第二次选择时，出现bug？
                if(length === 0){
                    self.$message({
                        type: 'warning',
                        message: '未勾选需要删除的用户',
                        duration: '1500'
                    });
                    return ;
                }
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }

                self.$confirm('确定删除'+str+',是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                        duration: '1500'
                    });
                })
                    .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                        duration: '1500'
                    });
                });
                //self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            hideOver(){
                console.log('close');
            }
        }

    }
</script>

<style scoped>
.handle-select{
    width: 120px;
}
</style>
