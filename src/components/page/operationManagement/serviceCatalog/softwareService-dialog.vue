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
    import api from '@/axios/api.js'
    import {deepCopyObject, isObjectValueEqual} from '../../../../assets/js/public.js'
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
                //验算规则
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
                //异步请求的数据
                specificSetList: [],
                priceUnitList: [],
                pricePeriodList: [],
                //必须的
                formData: {},
                copyFormData : {},
                isSubmit: false,
                formLabelWidth: '150px',
                innerVisible: false
            }
        },
        created(){
            //first open-init
            this.formData = this.tableForm; // copy props,不能深拷贝
            this.copyFormData = deepCopyObject(this.tableForm);//copy props for resetForm
            this.initData();//获取下拉列表
        },
        watch: {
            tableForm: {
                handler: function(val, oldVal){
                    this.formData = val; // v-model changes，,不能深拷贝,否则无法触发watch
                },
                deep: true
            },
            dialogVisible: function(val, oldVal){
                this.isSubmit = false;
                if(val){
                    /*
                    *  1.不能放在tableForm中，因为每次v-model触发，就会触发watch
                    *  2.需要深拷贝
                    * */
                    this.copyFormData = deepCopyObject(this.tableForm); // for resetForm
                }
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
                _this.$emit('callbackParent',{isSubmit: this.isSubmit});
                //关闭需初始化默认验证，否则已经为is-error的验证，关闭后，下次open还会显示
                this.resetForm('formData');
            },
            resetForm(formName) {
                /*
                *  1.重置-resetField
                *  2.赋初值-assign
                *  3.完美解决重置bug
                * */
                this.$refs[formName].resetFields();
                Object.assign(this.formData, this.copyFormData);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this,
                            isEqual = isObjectValueEqual(
                                JSON.parse(JSON.stringify(this.formData)),
                                JSON.parse(JSON.stringify(this.copyFormData))
                            );
                        if(isEqual){
                            //未修改
                            _this.innerVisible = true;
                        }
                        else{
                            this.isSubmit = true;
                            console.log('submit data:');
                            console.info(_this.formData);
                            this.closeDialog();
                            setTimeout(function(){
                                _this.$message({
                                    type: 'success',
                                    message: '提交成功',
                                    duration: '1500'
                                });
                            },500);
                        }
                    } else {
                        console.warn('validate false');
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
