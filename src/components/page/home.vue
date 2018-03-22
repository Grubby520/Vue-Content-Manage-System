<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="icon iconfont icon-home"></i> 首页</el-breadcrumb-item>
                <el-breadcrumb-item>管理员首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="cnt-margin">
            <el-row :gutter="15" class="outer">
                <el-col class="title">基础设施</el-col>
                <el-col :span="6" v-for="value in basic" :key="value.id">
                    <div class="grid-content bg-purple">
                        <el-row class="text-center">
                            <el-col :span="8"><div class="grid-content bg-purple">
                                <span>{{value.name}}</span>
                            </div></el-col>
                            <el-col :span="8"><div class="grid-content bg-purple">
                                <span class="font-lg col-green cursor">{{value.total}}</span>
                            </div></el-col>
                            <el-col :span="8"><div class="grid-content bg-purple">
                                <span>总数/台</span>
                            </div></el-col>
                        </el-row>
                        <el-row class="text-center">
                            <el-col :span="8"><div class="grid-content bg-purple">
                                <span><i class="icon iconfont col-blue font-lg" :class="[value.icon]"></i></span>
                            </div></el-col>
                            <el-col :span="8"><div class="grid-content bg-purple">
                                <span class="col-red cursor">{{value.error}}</span>
                            </div></el-col>
                            <el-col :span="8"><div class="grid-content bg-purple">
                                <span>异常/台</span>
                            </div></el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="15" class="outer">
                <el-col class="title">云资源</el-col>
                <el-col :span="6" v-for="value in resource" :key="value.id">
                    <div class="grid-content bg-purple">
                        <el-row class="text-center">
                            <el-col :span="8"><div class="grid-content bg-purple">
                                <span>{{value.name}}</span>
                            </div></el-col>
                            <el-col :span="8"><div class="grid-content bg-purple">
                                <span class="font-lg col-green cursor">{{value.total}}</span>
                            </div></el-col>
                            <el-col :span="8"><div class="grid-content bg-purple">
                                <span>总数/台</span>
                            </div></el-col>
                        </el-row>
                        <el-row class="text-center">
                            <el-col :span="8"><div class="grid-content bg-purple">
                                <span><i class="icon iconfont col-blue font-lg" :class="[value.icon]"></i></span>
                            </div></el-col>
                            <el-col :span="8"><div class="grid-content bg-purple">
                                <span class="col-red cursor">{{value.error}}</span>
                            </div></el-col>
                            <el-col :span="8"><div class="grid-content bg-purple">
                                <span>异常/台</span>
                            </div></el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="15" class="outer">
                <el-col class="title">资源分配</el-col>
                <el-col :span="6" v-for="value in distribution" :key="value.id" class="resource-assign">
                    <div class="grid-content bg-purple">
                        <el-row class="text-center">
                            <el-col :span="8"><div class="grid-content bg-purple">
                                <el-col class="half"><div class="grid-content bg-purple">
                                    <i class="icon iconfont col-blue font-lg" style="vertical-align: sub" :class="[value.icon]"></i>
                                </div></el-col>
                                <el-col class="half"><div class="grid-content bg-purple">
                                    <span>{{value.name}}</span>
                                </div></el-col>
                            </div></el-col>
                            <el-col :span="8"><div class="grid-content bg-purple">
                                <el-col class="half"><div class="grid-content bg-purple">
                                    <span>已分配：{{value.use}}{{value.unit}}</span>
                                </div></el-col>
                                <el-col class="half"><div class="grid-content bg-purple">
                                    <span>总量：{{value.total}}{{value.unit}}</span>
                                </div></el-col>
                            </div></el-col>
                            <el-col :span="8"><div class="grid-content bg-purple relative">
                                <el-progress type="circle" :percentage="value.rate" class="line-center" :width="95"></el-progress>
                            </div></el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="cnt-margin">
            <el-row :gutter="15">
                <el-col :span="8"><div class="grid-content bg-purple">
                    <el-row>
                        <el-col><div class="grid-content bg-purple">
                            <p class="title_sec">业务概况</p>
                            <div id="business-monitor" class="el-chart"></div>
                        </div></el-col>
                    </el-row>
                </div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple">
                    <el-row>
                        <el-col :span="8"><div class="grid-content bg-purple">
                            <p class="title_sec center">业务安全性</p>
                            <div id="business-security" class="el-chart small"></div>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple">
                            <p class="title_sec center">业务可用性</p>
                            <div id="business-usability" class="el-chart small"></div>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple">
                            <p class="title_sec center">业务繁忙度</p>
                            <div id="business-busyness" class="el-chart small"></div>
                        </div></el-col>
                    </el-row>
                </div></el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import '../../../static/css/home.css'
    import api from '../../axios/api.js'
    import Option from '../../../static/js/components/charts'
    export default {
        data(){
            return {
                basic: [],
                resource: [],
                distribution: [],
                business_monitor: [50,20,110],
                business_security: 50,
                business_usability: 80,
                business_busyness: 20,
            }
        },
        created(){

            api.getHomeList('/getHomeList',{})
                .then(res => {
                    this.basic = res.basic;
                    this.resource = res.resource;
                    this.distribution = res.distribution;
                });

            api.getHomeList_business('/getHomeList/business',{})
                .then(res => {
                    this.drawPie_2('business-security', res.business_security,'#58c130');
                    this.drawPie_2('business-usability', res.business_usability, '#25a4f6');
                    this.drawPie_2('business-busyness', res.business_busyness, '#ff3b2f');
                });

        },
        mounted(){
            this.drawPie('business-monitor', this.business_monitor);
        },
        methods: {
            drawPie(id, data){
                let myChart = this.$echarts.init(document.getElementById(id));
                let myOption = Option.business_monitor_option(data);
                myChart.setOption(myOption);
            },
            drawPie_2(id, value, color){
                let myChart = this.$echarts.init(document.getElementById(id));
                let myOption = Option.business_status(value, color);
                myChart.setOption(myOption);
            }
        }
    }
</script>
