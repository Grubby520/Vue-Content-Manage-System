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
                    <el-button type="primary" icon="delete" class="handle-create mr10" @click="dialogAddVisible = true">新建</el-button>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="del">删除</el-button>
                </div>
                <!-- 新建弹窗 -->
                <el-dialog title="新建用户" :visible.sync="dialogAddVisible">
                    <el-form :model="form_add">
                        <el-form-item label="用户名:" :label-width="formLabelWidth">
                            <i class="iconfont icon-must"></i>
                            <el-input v-model="form_add.name" placeholder="请输入3-12位用户名称" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="用户密码:" :label-width="formLabelWidth">
                            <i class="iconfont icon-must"></i>
                            <el-input type="password" v-model="form_add.password1" placeholder="密码" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码:" :label-width="formLabelWidth">
                            <i class="iconfont icon-must"></i>
                            <el-input type="password" v-model="form_add.password2" placeholder="确认密码" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="角色:" :label-width="formLabelWidth">
                            <i class="iconfont icon-must"></i>
                            <el-select v-model="form_add.roleId" placeholder="请选择角色">
                                <el-option
                                    v-for="item in roles"
                                    :key="item.roleId"
                                    :label="item.roleName"
                                    :value="item.roleId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属机构:" :label-width="formLabelWidth">
                            <i class="iconfont icon-must"></i>
                            <el-select v-model="form_add.orgId" filterable placeholder="请选择所属机构">
                                <el-option
                                    v-for="item in orgs"
                                    :key="item.orgId"
                                    :label="item.orgName"
                                    :value="item.orgId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="描述:" :label-width="formLabelWidth">
                            <span class="not-must"></span>
                            <textarea class="el-textarea" v-model="form_add.desc" placeholder="加入描述内容，非必填" auto-complete="off"></textarea>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogAddVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogAddVisible = false">提 交</el-button>
                    </div>
                </el-dialog>
                <!-- 编辑弹窗 -->
                <el-dialog title="编辑用户" :visible.sync="dialogEditVisible">
                    <el-form :model="form_edit">
                        <el-form-item label="用户名:" :label-width="formLabelWidth">
                            <i class="iconfont icon-must"></i>
                            <el-input v-model="form_edit.name" placeholder="请输入3-12位用户名称" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="角色:" :label-width="formLabelWidth">
                            <i class="iconfont icon-must"></i>
                            <el-select v-model="form_edit.roleId" placeholder="请选择角色">
                                <el-option
                                    v-for="item in roles"
                                    :key="item.roleId"
                                    :label="item.roleName"
                                    :value="item.roleId"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属机构:" :label-width="formLabelWidth">
                            <i class="iconfont icon-must"></i>
                            <el-select v-model="form_edit.orgId"  filterable placeholder="请选择所属机构">
                                <el-option
                                    v-for="item in orgs"
                                    :key="item.orgId"
                                    :label="item.orgName"
                                    :value="item.orgId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="描述:" :label-width="formLabelWidth">
                            <span class="not-must"></span>
                            <textarea class="el-textarea" v-model="form_edit.desc" placeholder="加入描述内容，非必填" auto-complete="off"></textarea>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogEditVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogEditSubmit">提 交</el-button>
                    </div>
                </el-dialog>
                <!--数据权限弹窗-->
                <el-dialog title="用户数据权限设置" :visible.sync="dialogPowerVisible">
                    <span slot="title">用户数据权限设置<span style="color: #4db3ff;">（{{name}}）</span></span>
                    <el-form :model="form_edit">
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
                    <el-select v-model="select_cate" placeholder="筛选角色" class="handle-select mr10">
                        <el-option key="1" label="广东省" value="广东省"></el-option>
                        <el-option key="2" label="湖南省" value="湖南省"></el-option>
                    </el-select>
                    <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
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
                                        <p v-if="scope.row.isBind" class="table-success"><img src="../../../static/img/cg.png" alt=""> 已绑定</p>
                                        <p v-else class="table-fail"><img src="../../../static/img/fail.png" alt="">未绑定</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>证书状态</td>
                                    <td>
                                        <p v-if="scope.row.isRun" class="table-success"><img src="../../../static/img/cg.png" alt=""> 已激活</p>
                                        <p v-else class="table-fail"><img src="../../../static/img/fail.png" alt="">未激活</p>
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
                            <p v-if="scope.row.isRun" class="table-success"><img src="../../../static/img/cg.png" alt=""> 已激活</p>
                            <p v-else class="table-fail"><img src="../../../static/img/fail.png" alt="">未激活</p>
                    </template>
                </el-table-column>
                <el-table-column prop="isBind" label="证书状态" class-name="todo">
                    <template slot-scope="scope">
                        <p v-if="scope.row.isBind" class="table-success"><img src="../../../static/img/cg.png" alt=""> 已绑定</p>
                        <p v-else class="table-fail"><img src="../../../static/img/fail.png" alt="">未绑定</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="small" class="handle-edit"
                                   @click="dialogEditOpen(scope.$index, scope.row)">编辑</el-button>
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
    import api from '../../axios/api.js'
    export default {
        data() {
            //自定义方法
            const getPowerData = _ => {
                const data = [];
                data.push(
                    {key:1,label:'移动-华三'},
                    {key:2,label:'电信-腾讯'},
                    {key:3,label:'联通-华为'}
                    );
                return data;
            };
            return {
                tableData: [],
                cur_page: 1,//当前页码
                page_size: 15,//1页条数
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                dialogAddVisible: false,
                dialogEditVisible: false,
                dialogPowerVisible: false,
                name: '',
                dialogUserVisible: false,
                modal1: false,
                roleId: '',
                orgId: '',
                desc: '',
                form_add: {
                    name: '',
                    password1: '',
                    password2: '',
                    role: '',
                    roleId: '',
                    org: '',
                    orgId: '',
                    date2: '',
                    desc: ''
                },
                form_edit: {
                    name: '',
                    roleName: '',
                    roleId: '',
                    orgName: '',
                    orgId: '',
                    desc: ''
                },
                //通过接口获取？
                roles: [
                    {roleId:1,roleName: '系统管理员'},
                    {roleId:2,roleName: '监管人员'},
                    {roleId:3,roleName: '租户管理员'},
                    {roleId:4,roleName: '云服务商'},
                    {roleId:5,roleName: '应用厂商'}
                ],
                orgs: [
                    {orgId:1,orgName: '省办公厅'},
                    {orgId:2,orgName: '省政协'},
                    {orgId:3,orgName: '省政法委'},
                    {orgId:4,orgName: '省公安厅消防总队'},
                    {orgId:5,orgName: '省地税局'},
                    {orgId:6,orgName: '省国税局'},
                    {orgId:7,orgName: '省工商局'},
                    {orgId:8,orgName: '省审计厅'},
                    {orgId:9,orgName: '省商务厅'}
                ],
                formLabelWidth: '150px',
                power_data:getPowerData(),
                orgPower: []//权限arr
            }
        },
        created(){
            this.getData();
        },
        computed: {
            data(){
                const self = this;
                return self.tableData.filter(function(d){
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                        if(d.name === self.del_list[i].name){
                            is_del = true;
                            break;
                        }
                    }
                    if(!is_del){
                        if(d.address.indexOf(self.select_cate) > -1 &&
                            (d.name.indexOf(self.select_word) > -1 ||
                            d.address.indexOf(self.select_word) > -1)
                        ){
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            //init table
            getData() {
                //api，获取table列表对象
                api.getTable('/userTable',
                    {
                        curPage: this.cur_page,
                        pageSize: this.page_size
                    })
                    .then(res => {
                        this.tableData = res.articles;
                    });
//                let self = this;
//                if(process.env.NODE_ENV === 'development'){
//                    self.url = '/ms/userTable/list';
//                }
//                self.$axios.post(self.url, {page:self.cur_page}).then((res) => {
//                    self.tableData = res.data.list;
//                })
            },
            //per page number
            handleSizeChange(val) {
                this.page_size = val;
                this.getData(val);
            },
            //goTo page
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData(val);
            },

            /*设置按钮*/
            //open
            dialogPowerOpen(index, row) {
                //接口，获取当前orgId对应的orgPower的值
                api.getUserPower('/userTable/getUserPower',
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
                    duration: '800'
                });
            },
            //cancel
            dialogPowerCancel() {
                this.dialogPowerVisible = false;
            },

            /*编辑按钮*/
            dialogEditOpen(index, row) {
                //init data
                this.form_edit.name = row.name;
                this.form_edit.desc = row.desc;
                this.form_edit.roleId = row.roleId;
                this.form_edit.role = row.roleName;
                this.form_edit.orgId = row.orgId;
                this.form_edit.org = row.orgName;
                // open dialog
                this.dialogEditVisible = true;
            },
            dialogEditSubmit() {
                //提交时，只需要获取id的值，不需要name的值
                let submit_data = this.form_edit;
                //api,提交
                this.dialogEditVisible = false;
                this.$message({
                    type: 'success',
                    message: '提交成功',
                    duration: '800'
                });
            },

            search(){
                this.is_search = true;
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
                        duration: '800'
                    });
                })
                    .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                        duration: '800'
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
