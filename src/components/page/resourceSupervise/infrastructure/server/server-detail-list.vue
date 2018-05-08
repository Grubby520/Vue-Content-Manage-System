<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="icon iconfont icon-1st-resource-supervise"></i> 资源监管</el-breadcrumb-item>
        <el-breadcrumb-item><i class="icon iconfont icon-2nd-Infrastructure"></i> 基础设施</el-breadcrumb-item>
        <el-breadcrumb-item><router-link to="/server"><i class="icon iconfont icon-3rd-server"></i> 服务器</router-link></el-breadcrumb-item>
        <el-breadcrumb-item ><span class="current">{{hostname}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="time-task-logic">

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <service-detail-basicInfo></service-detail-basicInfo>
        </el-tab-pane>
        <el-tab-pane label="性能" name="second">
          <service-detail-property v-if="initSecond"></service-detail-property>
        </el-tab-pane>
        <el-tab-pane label="资源变更" name="third">
          <service-detail-change :hostname="hostname"></service-detail-change>
        </el-tab-pane>
        <el-tab-pane label="告警事件" name="fourth">
          <service-detail-warn></service-detail-warn>
        </el-tab-pane>
      </el-tabs>


    </div>
  </div>
</template>

<script>
  import api from '@/axios/api.js'
  import serviceDetailBasicInfo from './server-detail-basicInfo'
  import serviceDetailProperty from './server-detail-property'
  import serviceDetailChange from './server-detail-change.vue'
  import serviceDetailWarn from './server-detail-warn.vue'

  export default {
    components: {
      serviceDetailBasicInfo,
      serviceDetailProperty,
      serviceDetailChange,
      serviceDetailWarn
    },
    data() {
      return {
        hostname: '',
        activeName: 'first',
        initSecond: false,
      };
    },

    created(){
      this.hostname = this.$route.params.hostName;
    },

    methods: {
      /* tab切换 */
      handleClick(tab, event){
        if(tab.name === 'second' && !this.initSecond){
          this.initSecond = true;
        }
      },

    },
    computed: {},
  }
</script>

<style>
  .b-bg{
    background-color: #f4f4f4;
    padding: 15px;
  }
  .b-header{
    text-align: center;
    font-size: 1em;
    padding: 10px 0;
    border-bottom: 1px solid #0bb2ef;
  }
  .b-content{
    width: 100%;
    padding: 0 10px;
    font-size: .875em;
  }
  .b-content td{
    padding: 7px 0;
  }
  .b-content tr>td:first-child{
    text-align: left;
  }
  .b-content tr>td:last-child{
    text-align: right;
  }
</style>
