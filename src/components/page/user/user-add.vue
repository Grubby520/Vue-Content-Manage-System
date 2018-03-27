<!-- add dialog -->
<template >
    <el-dialog title="新建用户" :visible.sync="dialogAddVisible" :close-on-click-modal=false :before-close="closeDialog">
        <el-form :model="form_add" :rules="rules" ref="form_add">
            <el-form-item label="用户名:" :label-width="formLabelWidth" prop="name">
                <i class="iconfont icon-must"></i>
                <el-input v-model="form_add.name" placeholder="请输入3-12位用户名称" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户密码:" :label-width="formLabelWidth" prop="pass">
                <i class="iconfont icon-must"></i>
                <el-input type="password" v-model="form_add.pass" placeholder="密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" :label-width="formLabelWidth" prop="checkPass" >
                <i class="iconfont icon-must"></i>
                <el-input type="password" v-model="form_add.checkPass" placeholder="确认密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色:" :label-width="formLabelWidth"  prop="roleId">
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
            <el-form-item label="所属机构:" :label-width="formLabelWidth" prop="orgId">
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
            <el-form-item label="描述:" :label-width="formLabelWidth">
                <span class="not-must"></span>
                <textarea class="el-textarea" v-model="form_add.desc" placeholder="加入描述内容，非必填" auto-complete="off"></textarea>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('form_add')">重 置</el-button>
            <el-button type="primary" @click="submitForm('form_add')">创 建</el-button>
        </div>

    </el-dialog>
</template>

<script>
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
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form_add.checkPass !== '') {
                        this.$refs.rules.validateField('checkPass');
                    }
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
                    role: '',
                    roleId: '',
                    org: '',
                    orgId: '',
                    date2: '',
                    desc: ''
                },
                formLabelWidth: '150px',
                //通过接口获取？
                roles: [
                    {roleId:1,roleName: '系统管理员'},
                    {roleId:2,roleName: '监管人员'},
                    {roleId:3,roleName: '租户管理员'},
                    {roleId:4,roleName: '云服务商'},
                    {roleId:5,roleName: '应用厂商'}
                ],
                departments: [
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
                    ]
                }
            }

        },
        methods: {
            reset(){
                this.$emit('callback');
            },
            closeDialog(){
                this.$emit('callback');
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //add-submit
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('callback');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>
<style>
    .el-form-item__label{
        padding-right: 10px;
    }
</style>
