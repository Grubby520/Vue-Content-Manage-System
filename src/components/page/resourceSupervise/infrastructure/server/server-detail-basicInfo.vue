<template>
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
</template>
<script>
  export default {
    data(){
      return {
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
      }
    }
  }
</script>
