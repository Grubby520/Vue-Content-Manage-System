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
          <el-row :gutter="15">
            <el-col :span="12"><div class="grid-content bg-purple">
              <div class="b-bg">
                <p class="b-header">基本信息</p>
                <table class="b-content">
                  <tr>
                    <td>服务器名称</td>
                    <td>{{basicInfo.hostname}}</td>
                  </tr>
                  <tr>
                    <td>服务器ip</td>
                    <td>{{basicInfo.serverIp}}</td>
                  </tr>
                  <tr>
                    <td>所属云平台</td>
                    <td>{{basicInfo.cloudProvider}}</td>
                  </tr>
                  <tr>
                    <td>所属云资源池</td>
                    <td>{{basicInfo.cloudResource}}</td>
                  </tr>
                  <tr>
                    <td>云主机数量</td>
                    <td>{{basicInfo.hostNo}}</td>
                  </tr>
                  <tr>
                    <td>状态</td>
                    <td>
                      <span v-if="basicInfo.status === 'safe'">正常</span>
                      <span v-if="basicInfo.status === 'warning'">告警</span>
                      <span v-if="basicInfo.status === 'danger'">危险</span>
                    </td>
                  </tr>
                  <tr>
                    <td>正常运行时间</td>
                    <td>{{basicInfo.safeRunTime}}</td>
                  </tr>
                </table>
              </div>
            </div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple">
              <div class="b-bg">
                <p class="b-header">资源配置</p>
                <table class="b-content">
                  <tr>
                    <td>CPU</td>
                    <td>{{resourceConfig.cpu}}</td>
                  </tr>
                  <tr>
                    <td>内存</td>
                    <td>{{resourceConfig.memory}}</td>
                  </tr>
                  <tr>
                    <td>磁盘大小</td>
                    <td>{{resourceConfig.storage}}</td>
                  </tr>
                </table>
              </div>
            </div></el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="性能" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="资源变更" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="告警事件" name="fourth">角色管理</el-tab-pane>
      </el-tabs>


    </div>
  </div>
</template>

<script>
  import api from '@/axios/api.js'
  import computingServiceTable from '../../../operationManagement/serviceCatalog/computingService-table.vue'
  import storageServiceTable from '../../../operationManagement/serviceCatalog/storageService-table.vue'
  import softwareServiceTable from '../../../operationManagement/serviceCatalog/softwareService-table.vue'
  import networkSecurityServiceTable from '../../../operationManagement/serviceCatalog/networkSecurityService-table.vue'
  import thirdSecurityServiceTable from '../../../operationManagement/serviceCatalog/thirdSecurityService-table.vue'
  import otherServiceTable from '../../../operationManagement/serviceCatalog/otherService-table.vue'

  export default {
    components: {
      computingServiceTable,
      storageServiceTable,
      softwareServiceTable,
      networkSecurityServiceTable,
      thirdSecurityServiceTable,
      otherServiceTable
    },
    data() {
      return {
        hostname: '',

        activeName: 'first',

        basicInfo:{
          hostname: 'inner',
          serverIp: '172.18.4.2',
          cloudProvider: '电信-腾讯',
          cloudResource: '政务外网资源池',
          hostNo: '9台',
          status: 'safe',
          safeRunTime: '3月15天2小时'
        },

        resourceConfig: {
          cpu: '64核',
          memory: '120GB',
          storage: '1024GB'
        }
      };
    },

    created(){
      this.hostname = this.$route.params.hostName;
    },

    methods: {
      /* tab切换 */
      handleClick(tab, event){

      },

    },
    computed: {},
  }
</script>

<style scoped>
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
