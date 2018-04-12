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
                <el-input v-model="formData.name" placeholder="请输入2-16位租户名称" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="所属单位 :" :label-width="formLabelWidth" prop="orgId">
                <el-select v-model="formData.orgId" filterable placeholder="请选择所属单位">
                    <el-option
                        v-for="item in departments"
                        :key="item.orgId"
                        :label="item.orgName"
                        :value="item.orgId">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="政务公共云 :" :label-width="formLabelWidth" prop="publicCloud">
                <el-select v-model="formData.publicCloud" filterable placeholder="请选择所属租户">
                    <el-option
                        v-for="item in departments"
                        :key="item.orgId"
                        :label="item.orgName"
                        :value="item.orgId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="政务专有云-移动 :" :label-width="formLabelWidth" prop="privateCloud_mobile">
                <el-select v-model="formData.privateCloud_mobile" filterable placeholder="请选择所属租户">
                    <el-option
                        v-for="item in departments"
                        :key="item.orgId"
                        :label="item.orgName"
                        :value="item.orgId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" 政务专有云-联通 :" :label-width="formLabelWidth" prop="privateCloud_unicom">
                <el-select v-model="formData.privateCloud_unicom" filterable placeholder="请选择所属租户">
                    <el-option
                        v-for="item in departments"
                        :key="item.orgId"
                        :label="item.orgName"
                        :value="item.orgId">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="描述 :" :label-width="formLabelWidth">
                <textarea class="el-textarea" v-model="formData.remark" placeholder="加入描述内容，非必填" auto-complete="off"></textarea>
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
            return  {
                rules: {
                    name: [
                        {required: true, message: '请输入2-16位用户名称', trigger: 'blur'},
                        {min: 2, max: 16, message: '长度在2到16个字符', trigger: 'blur'}
                    ],
                    orgId: [
                        { required: true, message: '请选择所属单位', trigger: 'change' }
                    ],
                    publicCloud: [
                        { required: true, message: '请选择所属租户', trigger: 'change' }
                    ],
                    privateCloud_mobile: [
                        { required: true, message: '请选择所属租户', trigger: 'change' }
                    ],
                    privateCloud_unicom: [
                        { required: true, message: '请选择所属租户', trigger: 'change' }
                    ]
            },
                formData: {},
                copyFormData : {},
                departments: [],
                isSubmit: false,
                formLabelWidth: '150px',
                innerVisible: false
            }
        },
        created(){
            this.initData();
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
            dialogVisible: function(){
                this.copyFormData = deepCopyObject(this.form);
                this.isSubmit = false;
            }
        },
        methods: {
            initData(){
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
                                    id: '',
                                    name: '',
                                    orgId: '',
                                    publicCloud: '',
                                    privateCloud_mobile: '',
                                    privateCloud_unicom: '',
                                    remark: '',
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
