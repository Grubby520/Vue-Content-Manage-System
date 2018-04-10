<!--
add/edit dialog
-->
<template>
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
            <el-form-item label="规格集名称 :" :label-width="formLabelWidth" prop="specificSetName">
                <el-select v-model="formData.specificSetName" placeholder="请选择规格集名称">
                    <el-option
                        v-for="item in specificSetList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="核数(个) :" :label-width="formLabelWidth" prop="cores">
                <el-input v-model.number="formData.cores"  placeholder="请输入核数" auto-complete="off"></el-input>
            </el-form-item>
            <div>{{formData.cores}}</div>
            <el-form-item label="内存(GB) :" :label-width="formLabelWidth" prop="memoryCapacity">
                <el-input v-model.number="formData.memoryCapacity" placeholder="请输入内存大小" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="计价单位 :" :label-width="formLabelWidth" prop="priceUnitName">
                <el-select v-model="formData.priceUnitName" placeholder="请选择计价单位">
                    <el-option
                        v-for="item in priceUnitList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单价 :" :label-width="formLabelWidth" prop="unitCost">
                <el-input v-model.number="formData.unitCost" placeholder="请输入单价" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="计价周期 :" :label-width="formLabelWidth" prop="pricePeriodName">
                <el-select v-model="formData.pricePeriodName" placeholder="请选择计价周期位">
                    <el-option
                        v-for="item in pricePeriodList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('formData')">重 置</el-button>
            <el-button type="primary" @click="submitForm('formData')">提 交</el-button>
        </div>

    </el-dialog>
</template>

<script>
    import api from '../../../../axios/api.js'
    import {deepCopyObject, isObjectValueEqual} from '../../../../../static/js/public.js'
    export default {
        props: {
            dialogVisible: {type: Boolean},
            tableForm: {type:Object}
        },
        data(){
            const checkInteger = (rule, value, callback) => { // 验证正整数
                if (!value) {
                    return callback(new Error('值不能为空'));
                }
                else if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字'));
                } else {
                    if (value < 0) {
                        callback(new Error('请输入正整数'));
                    } else {
                        callback();
                    }
                }
            };
            const checkUnitCost = (rule, value, callback) => { // 验证正整数
                if (!value) {
                    return callback(new Error('值不能为空'));
                }
                else if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字'));
                } else {
                    if (value < 1000 || value >20000) {
                        callback(new Error('单价应在1000-20000之间'));
                    } else {
                        callback();
                    }
                }
            };
            return  {
                rules: {
                    specificSetName: [
                        { required: true, message: '请选择规格集名称', trigger: 'change' }
                    ],
                    cores: [
                        {required: true, validator: checkInteger, trigger: 'blur'}
                    ],
                    memoryCapacity: [
                        {required: true, validator: checkInteger, trigger: 'blur'}
                    ],
                    unitCost: [
                        {required: true, validator: checkUnitCost, trigger: 'blur'}
                    ],
                    priceUnitName: [
                        { required: true, message: '请选择计价单位', trigger: 'change' }
                    ],
                    pricePeriodName: [
                        { required: true, message: '请选择计价周期', trigger: 'change' }
                    ]
                },

                formData: {},
                copyFormData : {},

                specificSetList: [],
                priceUnitList: [],
                pricePeriodList: [],
                isSubmit: false,
                formLabelWidth: '150px',
                innerVisible: false
            }
        },
        created(){
            //初始化-为空
            this.formData = this.tableForm; // copy props
            this.copyFormData = deepCopyObject(this.tableForm);//copy props for resetForm
            this.initData();//获取下拉列表
        },
        watch: {
            tableForm: {
                handler: function(val, oldVal){
                    console.log('change');
                    this.formData = val; // v-model changes
                    this.copyFormData = deepCopyObject(this.tableForm); // for resetForm
                    this.isSubmit = false;
                    console.log(this.copyFormData);
                },
                deep: true
            },
            //数据同步是ok的
            dialogVisible: function(val, oldVal){
//                if(val === true){
//
//                }
//                else{
//                    this.copyFormData = { // when closeDialog,reset it
//                        type:'',
//                        title:'',
//                        id: '',
//                        specificSetName: '',
//                        cores: '',
//                        memoryCapacity: '',
//                        priceUnitName: '',
//                        unitCost: '',
//                        pricePeriodName: '',
//                        createDate: ''
//                    }
//                }
            }
        },
        methods: {
            /*
            *  初始化下拉框
            * */
            initData(){
                api.$http('/specificSetList', {})
                    .then(res => {
                        this.specificSetList = res;
                    });
                api.$http('/priceUnitList', {})
                    .then(res => {
                        this.priceUnitList = res;
                    });
                api.$http('/pricePeriodList', {})
                    .then(res => {
                        this.pricePeriodList = res;
                    });
            },
            closeDialog(){
                const _this = this;
                _this.$emit('callbackParent',{type: 'add', isSubmit: this.isSubmit});
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
                    this.$refs[formName].validate('cores');
                }

            },
            submitForm(formName) {
                console.info(this.formData);
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
                            console.info(_this.formData);
                            this.closeDialog();
                            setTimeout(function(){
                                _this.$message({
                                    type: 'success',
                                    message: '提交成功',
                                    duration: '1500'
                                });
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
