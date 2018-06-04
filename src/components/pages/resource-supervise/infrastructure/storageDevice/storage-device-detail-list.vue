<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="icon iconfont icon-1st-resource-supervise"></i> 资源监管</el-breadcrumb-item>
        <el-breadcrumb-item><i class="icon iconfont icon-2nd-Infrastructure"></i> 基础设施</el-breadcrumb-item>
        <el-breadcrumb-item><router-link to="/storageDevice"><i class="icon iconfont icon-3rd-storage-device"></i> 存储设备</router-link></el-breadcrumb-item>
        <el-breadcrumb-item ><span class="current">{{hostname}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="time-task-logic">

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="性能" name="second">
          <storage-device-detail-property :hostname="hostname"></storage-device-detail-property>
        </el-tab-pane>
        <el-tab-pane label="资源变更" name="third">
          <storage-device-detail-change :hostname="hostname" v-if="initThird"></storage-device-detail-change>
        </el-tab-pane>
        <el-tab-pane label="告警事件" name="fourth">
          <storage-device-detail-warn :hostname="hostname" v-if="initFourth"></storage-device-detail-warn>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>

<script>
  import api from '@/axios/api.js'
  import storageDeviceDetailProperty from './storage-device-detail-property'
  import storageDeviceDetailChange from './storage-device-detail-change.vue'
  import storageDeviceDetailWarn from './storage-device-detail-warn.vue'

  export default {
    components: {
      storageDeviceDetailProperty,
      storageDeviceDetailChange,
      storageDeviceDetailWarn
    },
    data() {
      return {
        hostname: '',
        activeName: 'second',
        initThird: false,
        initFourth: false,
      };
    },

    created(){
      this.hostname = this.$route.params.hostName;
    },

    methods: {
      /*
      * tab切换
      * bk: 切换时才异步请求组件
      * */
      handleClick(tab, event){
        if(tab.name === 'third' && !this.initThird){
          this.initThird = true;
        }
        if(tab.name === 'fourth' && !this.initFourth){
          this.initFourth = true;
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
