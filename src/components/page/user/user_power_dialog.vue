<template>
    <el-dialog
        title="用户数据权限设置"
        :visible.sync="dialogPowerVisible"
        :close-on-click-modal=false
        :before-close="closeDialog"
        :close-on-press-escape=false
    >
        <span slot="title">用户数据权限设置<span style="color: #4db3ff;">（{{form.name}}）</span></span>
        <el-form :model="form">
            <el-transfer
                v-model="orgPower"
                :data="power_data"
                :titles="['源云平台','目的云平台']">
            </el-transfer>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="submitForm">提 交</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import api from '../../../axios/api.js'
    export default {
        props: {
            dialogPowerVisible: {type: Boolean},
            form: {type:Object}
        },
        data(){
            //自定义假数据
            const getPowerData = () => {
                const data = [];
                data.push(
                    {key:1,label:'移动-华三'},
                    {key:2,label:'电信-腾讯'},
                    {key:3,label:'联通-华为'}
                );
                return data;
            };
            return {
                power_data:getPowerData(),
                orgPower: []//权限arr
            }
        },
        created(){
          this.initData(this.form.orgId);
        },
        watch: {
            form: {
                handler: function(val, oldVal){
                    this.initData(val.orgId);
                },
                deep: true
            }
        },
        methods: {
            initData(orgId){
                //api
                api.$http('/userTable/getUserPower',
                    {
                        orgId: orgId
                    })
                    .then(res => {
                        this.orgPower = res.orgPower
                    });
            },
            closeDialog(){
                this.$emit('callbackParent');
            },
            cancelForm() {
                this.closeDialog();
            },
            submitForm() {
                this.closeDialog();
                //接口提交- this.orgPower
                this.$message({
                    type: 'success',
                    message: '提交成功',
                    duration: '1500'
                });
            }
        }
    }
</script>
