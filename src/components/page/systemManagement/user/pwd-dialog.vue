<!--
pwd dialog
-->
<template >
    <el-dialog
        :title="formData.title"
        :visible.sync="pwdDialogVisible"
        :close-on-click-modal=false
        :before-close="closeDialog"
        :close-on-press-escape=false
    >
        <el-form :model="formData" :rules="rules" ref="formData">
            <el-form-item label="用户名 :" :label-width="formLabelWidth" prop="name">
                <el-input disabled v-model="formData.name" placeholder="请输入2-8位用户名称" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户密码 :" :label-width="formLabelWidth" prop="pass">
                <el-input type="password" v-model="formData.pass" placeholder="密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码 :" :label-width="formLabelWidth" prop="checkPass" >
                <el-input type="password" v-model="formData.checkPass" placeholder="确认密码" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('formData')">重 置</el-button>
            <el-button type="primary" @click="submitForm('formData')">提 交</el-button>
        </div>

    </el-dialog>
</template>

<script>
    import {deepCopyObject} from '../../../../assets/js/public.js'
    export default {
        props: {
            pwdDialogVisible: {type: Boolean},
            form: {type:Object}
            },
        data(){
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                }else if(value.length <= 6){
                    callback(new Error('密码长度过短'));
                }else {
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入新密码'));
                }else if (value !== this.formData.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return  {
                rules: {
                    pass: [
                        {required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        {required: true, validator: validatePass2, trigger: 'blur' }
                    ]
            },
                formData: {},
                copyFormData : {},
                isSubmit: false,
                formLabelWidth: '150px'
            }
        },
        created(){
            this.formData = this.form;
            this.copyFormData = deepCopyObject(this.form);
        },
        watch: {
            form: {
                handler: function(val, oldVal){
                    this.formData = val;
                },
                deep: true
            },
            pwdDialogVisible: function(){
                this.copyFormData = deepCopyObject(this.form);
                this.isSubmit = false;
            }
        },
        methods: {
            closeDialog(){
                const _this = this;
                _this.$emit('callbackParent',{type: 'password', isSubmit: _this.isSubmit});
                setTimeout(function(){
                    _this.$refs['formData'].resetFields();//仅close时执行
                    _this.formData = {//配合resetFields()解决新建弹窗重置数据bug问题
                        title: '新建用户',
                        name : '',
                        desc : '',
                        roleId : '',
                        orgId : '',
                        pass:'',
                        checkPass:'',
                        type: 'add'
                    };
                },500);

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
                        const _this = this;
                        this.isSubmit = true;
                        this.closeDialog();
                        console.info('id: '+this.formData.id);
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
