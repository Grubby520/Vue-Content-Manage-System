<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="icon iconfont icon-home"></i> 首页</el-breadcrumb-item>
                <el-breadcrumb-item>管理员首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="cnt-margin">
            <el-row :gutter="15" class="outer" style="height: 140px">
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
            <el-row :gutter="15" class="outer" style="height: 140px">
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
            <el-row :gutter="15" class="outer" style="height: 177px">
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
            <el-row :gutter="15" style="height: 317px">
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
                            <div class="el-chart right">
                                <div id="business-security" class=" small"></div>
                                <p><span class="level" :class="[security.className]">{{security.text}}</span></p>
                            </div>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple">
                            <p class="title_sec center">业务可用性</p>
                            <div class="el-chart">
                                <div id="business-usability" class=" small"></div>
                                <p><span class="level" :class="[usability.className]">{{usability.text}}</span></p>
                            </div>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple">
                            <p class="title_sec center">业务繁忙度</p>
                            <div class="el-chart">
                                <div id="business-busyness" class=" small"></div>
                                <p><span class="level" :class="[busyness.className]">{{busyness.text}}</span></p>
                            </div>
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
    import {Chart,getColor,business_monitor_option,business_status} from '../../../static/js/components/charts'
    export default {
        data(){
            return {
                basic: [],
                resource: [],
                distribution: [],
                business_monitor: [50,20,110],
                security: {
                    text: '',
                    className: '',
                    color:''
                },
                usability: {
                    text: '',
                    className: '',
                    color:''
                },
                busyness: {
                    text: '',
                    className: '',
                    color:''
                }
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
                    if(res.business_security >= 80){
                        this.security.text = '安全';
                        this.security.className = 'good';
                        this.security.color = '#58c130';
                    }else if(res.business_security >= 60){
                        this.security.text = '一般';
                        this.security.className = 'normal';
                        this.security.color = '#25a4f6';
                    }else{
                        this.security.text = '危险';
                        this.security.className = 'bad';
                        this.security.color = '#ff3b2f';
                    }

                    if(res.business_usability >= 80){
                        this.usability.text = '高';
                        this.usability.className = 'good';
                        this.usability.color = '58c130';
                    }else if(res.business_usability >= 60){
                        this.usability.text = '中';
                        this.usability.className = 'normal';
                        this.usability.color = '#25a4f6';
                    }else{
                        this.usability.text = '低';
                        this.usability.className = 'bad';
                        this.usability.color = '#ff3b2f';
                    }

                    if(res.business_busyness >= 80){
                        this.busyness.text = '繁忙';
                        this.busyness.className = 'bad';
                        this.busyness.color = '#ff3b2f';

                    }else if(res.business_busyness >= 60){
                        this.busyness.text = '一般';
                        this.busyness.className = 'normal';
                        this.busyness.color = '#25a4f6';
                    }else{
                        this.busyness.text = '空闲';
                        this.busyness.className = 'good';
                        this.busyness.color = '#58c130';
                    }

                    new Chart('business-monitor').setOption( business_monitor_option(res.business_monitor));
                    new Chart('business-security').setOption( business_status(res.business_security, this.security.color));
                    new Chart('business-usability').setOption( business_status(res.business_usability, this.usability.color));
                    new Chart('business-busyness').setOption( business_status(res.business_busyness, this.busyness.color));

                });
        },
        mounted(){
            this.$nextTick(function () {
                document.getElementById('main-nav').style.height = document.getElementById('wrapper').offsetHeight - 50 +'px';
            });

        },
        methods: {

        }
    }
</script>
