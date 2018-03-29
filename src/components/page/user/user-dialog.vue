<!--
add/edit dialog
-->
<template >
    <el-dialog
        :title="formData.title"
        :visible.sync="dialogVisible"
        :close-on-click-modal=false
        :before-close="closeDialog"
        :close-on-press-escape=false
    >
        <el-form :model="formData" :rules="rules" ref="formData">
            <el-form-item label="用户名 :" :label-width="formLabelWidth" prop="name">
                <i class="iconfont icon-must"></i>
                <el-input v-model="formData.name" placeholder="请输入2-8位用户名称" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="formData.type === 'add'" label="用户密码 :" :label-width="formLabelWidth" prop="pass">
                <i class="iconfont icon-must"></i>
                <el-input type="password" v-model="formData.pass" placeholder="密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="formData.type === 'add'" label="确认密码 :" :label-width="formLabelWidth" prop="checkPass" >
                <i class="iconfont icon-must"></i>
                <el-input type="password" v-model="formData.checkPass" placeholder="确认密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色 :" :label-width="formLabelWidth"  prop="roleId">
                <i class="iconfont icon-must"></i>
                <el-select v-model="formData.roleId" placeholder="请选择角色">
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
                <el-select v-model="formData.orgId" filterable placeholder="请选择所属机构">
                    <el-option
                        v-for="item in departments"
                        :key="item.orgId"
                        :label="item.orgName"
                        :value="item.orgId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="描述 :" :label-width="formLabelWidth">
                <textarea class="el-textarea" v-model="formData.desc" placeholder="加入描述内容，非必填" auto-complete="off"></textarea>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('formData')">重 置</el-button>
            <el-button type="primary" @click="submitForm('formData')">创 建</el-button>
        </div>

    </el-dialog>
</template>

<script>
    import api from '../../../axios/api.js'
    export default {
        props: {
            dialogVisible: {type: Boolean},
            form: {type:Object}
            },
        data(){
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else if(value.length <= 6){
                    callback(new Error('密码长度过短'));
                }else {
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                }else if (value !== this.formData.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return  {
                rules: {
                    name: [
                        {required: true, message: '请输入2-8位用户名称', trigger: 'blur'},
                        {min: 2, max: 12, message: '长度在2到8个字符', trigger: 'blur'}
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
            },
                formData: {},
                oldFormData: this.form,
                formLabelWidth: '150px',
                roles: [],
                departments: [],
                copyFormData : {}
            }
        },
        created(){
            this.formData = this.form;
            this.copyFormData = this.copyArray(this.form);
            this.initData();
        },
        computed: {

        },
        watch: {
            form: {
                handler: function(val, oldVal){
                    this.formData = val;
                },
                deep: true
            },
            dialogVisible: function(){
                this.copyFormData = this.copyArray(this.form);
            }
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
                this.$emit('callbackParent');
                this.$refs['formData'].resetFields();//仅close时执行
            },
            resetForm(formName) {
                //this.$refs[formName].resetFields();
                //深浅拷贝-坑
                this.formData = this.copyArray(this.copyFormData);
                this.$refs[formName].validate('name');
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this;
                        this.closeDialog();
                        setTimeout(function(){
                            _this.$message({
                                type: 'success',
                                message: '提交成功',
                                duration: '1500'
                            });
                        },300);
                    } else {
                        console.warn('error submit');
                        return false;
                    }
                });
            },
            copyArray(obj){
                let dst = {};
                for (const prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        dst[prop] = obj[prop];
                    }
                }
                return dst;
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
