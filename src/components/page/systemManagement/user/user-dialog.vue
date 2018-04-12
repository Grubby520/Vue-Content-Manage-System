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
        <el-dialog
            class="innerDialog"
            width="50%"
            title="提示"
            :visible.sync="innerVisible"
            :modal=false
            >
            <h3 class="warn-text">您未做任何修改</h3>
        </el-dialog>

        <el-form :model="formData" :rules="rules" ref="formData">
            <el-form-item label="用户名 :" :label-width="formLabelWidth" prop="name">
                <el-input v-model="formData.name" placeholder="请输入2-8位用户名称" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="formData.type === 'add'" label="用户密码 :" :label-width="formLabelWidth" prop="pass">
                <el-input type="password" v-model="formData.pass" placeholder="密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="formData.type === 'add'" label="确认密码 :" :label-width="formLabelWidth" prop="checkPass" >
                <el-input type="password" v-model="formData.checkPass" placeholder="确认密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色 :" :label-width="formLabelWidth"  prop="roleId">
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
            <el-button type="primary" @click="submitForm('formData')">提 交</el-button>
        </div>

    </el-dialog>
</template>

<script>
    import api from '@/axios/api.js'
    import {deepCopyObject, isObjectValueEqual} from '../../../../assets/js/public.js'
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
                copyFormData : {},
                roles: [],
                departments: [],
                isSubmit: false,
                formLabelWidth: '150px',
                innerVisible: false
            }
        },
        created(){
            this.formData = this.form;
            this.copyFormData = deepCopyObject(this.form);
            this.initData();
        },
        watch: {
            form: {
                handler: function(val, oldVal){
                    this.formData = val;
                },
                deep: true
            },
            dialogVisible: function(){
                this.copyFormData = deepCopyObject(this.form);
                this.isSubmit = false;
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
                const _this = this;
                _this.$emit('callbackParent',{type: 'dialog', isSubmit: this.isSubmit});
                setTimeout(function(){
                    _this.$refs['formData'].resetFields();//仅close时执行
                },1000);

            },
            resetForm(formName) {
                //深浅拷贝-坑
                this.formData = deepCopyObject(this.copyFormData);
                if(this.formData.type === 'add'){
                    this.$refs[formName].resetFields();
                }
                else{
                    this.$refs[formName].validate('name');
                }

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this,
                               isChange = isObjectValueEqual(
                                   JSON.parse(JSON.stringify(this.formData)),
                                   JSON.parse(JSON.stringify(this.copyFormData))
                               );

                        if(isChange){
                            //未修改
                            _this.innerVisible = true;
                        }
                        else{
                            this.isSubmit = true;
                            console.info(this.formData);
                            this.closeDialog();
                            setTimeout(function(){
                                _this.$message({
                                    type: 'success',
                                    message: '提交成功',
                                    duration: '1500'
                                });
                                _this.formData = {//初始化
                                    title: '',
                                    name : '',
                                    desc : '',
                                    roleId : '',
                                    orgId : '',
                                    pass:'',
                                    checkPass:'',
                                    type: ''
                                };
                            },300);
                        }
                    } else {
                        console.warn('error submit');
                        return false;
                    }
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
