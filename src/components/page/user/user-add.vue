<!-- add dialog -->
<template >
    <el-dialog
        title="新建用户"
        :visible.sync="dialogAddVisible"
        :close-on-click-modal=false
        :before-close="closeDialog"
        :close-on-press-escape=false
        >
        <el-form :model="form_add" :rules="rules" ref="form_add">
            <el-form-item label="用户名 :" :label-width="formLabelWidth" prop="name">
                <i class="iconfont icon-must"></i>
                <el-input v-model="form_add.name" placeholder="请输入3-12位用户名称" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户密码 :" :label-width="formLabelWidth" prop="pass">
                <i class="iconfont icon-must"></i>
                <el-input type="password" v-model="form_add.pass" placeholder="密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码 :" :label-width="formLabelWidth" prop="checkPass" >
                <i class="iconfont icon-must"></i>
                <el-input type="password" v-model="form_add.checkPass" placeholder="确认密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色 :" :label-width="formLabelWidth"  prop="roleId">
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
            <el-form-item label="所属机构 :" :label-width="formLabelWidth" prop="orgId">
                <i class="iconfont icon-must"></i>
                <el-select v-model="form_add.orgId" filterable placeholder="请选择所属机构">
                    <el-option
                        v-for="item in departments"
                        :key="item.orgId"
                        :label="item.orgName"
                        :value="item.orgId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="描述 :" :label-width="formLabelWidth">
                <textarea class="el-textarea" v-model="form_add.desc" placeholder="加入描述内容，非必填" auto-complete="off"></textarea>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('form_add')">重 置</el-button>
            <el-button type="primary" @click="submitForm('form_add')">创 建</el-button>
        </div>

        <el-dialog
            width="50%"
            title="参数列表"
            :show-close=true
            :modal=false
            :close-on-click-modal=false
            :visible.sync="innerVisible"
            :append-to-body=true>
            <table width="100%" class="inner-dialog">
                <tr>
                    <td>参数名</td>
                    <td>参数值</td>
                </tr>
                <tr>
                    <td>用户名</td>
                    <td>{{form_add.name}}</td>
                </tr>
                <tr>
                    <td>角色Id</td>
                    <td>{{form_add.roleId}}</td>
                </tr>
                <tr>
                    <td>所属机构Id</td>
                    <td>{{form_add.orgId}}</td>
                </tr>
                <tr>
                    <td>描述</td>
                    <td>{{form_add.desc}}</td>
                </tr>
            </table>
            <el-button @click="innerVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogSubmit">提 交</el-button>
        </el-dialog>

    </el-dialog>
</template>

<script>
    import api from '../../../axios/api.js'
    export default {
        props: ['dialogAddVisible'],
//        computed:{
//            myDialogAddVisible : {
//                get: function () {
//                    return this.dialogAddVisible
//                },
//                set: function (newValue) {
//                    this.dialogAddVisible = newValue;
//                }
//
//            }
//        },
        data: function () {
            //验证规则
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form_add.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return  {
                form_add: {
                    name: '',
                    pass: '',
                    checkPass: '',
                    roleId: '',
                    orgId: '',
                    desc: ''
                },
                innerVisible: false,
                formLabelWidth: '150px',
                roles: [],
                departments: [],
                rules: {
                    name: [
                        {required: true, message: '请输入3-12位用户名称', trigger: 'blur'},
                        {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
                    ],
                    pass: [
                        {required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        {required: true, validator: validatePass2, trigger: 'blur' }
                    ],
                    roleId: [
                        { required: true, message: '请选择角色', trigger: 'change' }
                    ],
                    orgId: [
                        { required: true, message: '请选择所属机构', trigger: 'change' }
                    ]
                }
            }

        },
        created(){
            this.initData();
        },
        methods: {
            initData(){
                api.$http('/roleList', {})
                    .then(res => {
                        this.roles = res;
                    });

                api.$http('/departmentList',{})
                    .then(res => {
                        this.departments = res;
                    })
            },
            closeDialog(){
                this.$emit('callback');
            },
            resetForm(formName) {
                this.form_add.desc = '';
                this.$refs[formName].resetFields();
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.innerVisible = true;
                        //this.$emit('callback');
                    } else {
                        console.error('error submit');
                        return false;
                    }
                });
            },
            dialogSubmit(){
                this.innerVisible = false;
                this.$emit('callback');
                this.resetForm('form_add');
                this.$message({
                    type: 'success',
                    message: '提交成功',
                    duration: '1500'
                });
            }
        }
    }
</script>
<style>
    .el-form-item__label{
        padding-right: 10px;
    }
    .inner-dialog td{
        border-bottom: 1px solid #ccc;
    }
</style>
