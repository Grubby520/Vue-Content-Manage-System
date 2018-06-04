<template>
    <div class="login-wrap">
        <div class="ms-login">
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <div class="left-bg"></div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <div class="right-bg">
                            <div class="logo-bg"></div>
                            <div class="form-login">
                                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                                    <el-form-item prop="username" :error="errors.username">
                                        <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="password" :error="errors.password">
                                        <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                                    </el-form-item>
                                    <div class="login-btn">
                                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                                    </div>
                                </el-form>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="msg-bottom">
            <p>2016-2017 成都电子科技网络信息安全有限公司 版本所有</p>
            <p>ChengDu Electronics Technology Cyber Security Co.,Ltd.</p>
        </div>
    </div>
</template>

<script>
    import '../../assets/css/login.css'
    import api from '@/axios/api.js'
    export default {
        data: function(){
            //自定义验证规则
            let checkUser = (rule, value, callback) => {
                if(!value){
                    return callback(new Error('请输入用户'));
                }else{
                    callback();
                }
            };

            let checkPwd = (rule, value, callback) => {
                if(!value){
                    return callback(new Error('请输入密码'));
                }else{
                    callback();
                }
            };

            return {
                errors: {
                    username: '',
                    password: ''
                },
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { validator: checkUser, trigger: 'blur' }
                    ],
                    password: [
                        { validator: checkPwd, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        //模拟验证
                        api.$http('/validate_logon', this.ruleForm
                            ).then(res => {
                                if(res.result === 'success'){
                                    localStorage.setItem('username', this.ruleForm.username);
                                    this.$router.push('/home'); // 跳转到home页面
                                }
                                else{
                                    setTimeout(() => {
                                        this.errors = {
                                            username: '用户或密码错误',
                                            password: '用户或密码错误'
                                        }
                                    }, 500)
                                }
                            });
                    }
                    else{
                        console.error('登录失败!');
                    }
                });
            }
        }
    }
</script>
