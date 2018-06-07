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
  import api from '@/axios/api.js'
  export default {
    props:{
      basicInfo: {type: Object, required: true},
      resourceConfig: {type: Object, required: true}
    },
    data(){
      return {

      }
    },

   /* beforeRouteEnter (to, from, next) {
      //获取hostname
      api.$http('/basicInfoList', {})
        .then(res => {
          //next回调，vm获取当前组件
          next(vm => vm.setData(res));
        });
    },*/

    // 复用时才会触发，重新更新视图
   /* beforeRouteUpdate (to, from, next) {
      this.basicInfo = null;
      this.resourceConfig = null;
      api.$http('/basicInfoList', {})
        .then(res => {
          this.setData(res);
          next();//触发更新view?
        });
    },*/
    methods: {
      /* res: 接口返回的data*/
     /* setData(res){
        if(res && typeof res === 'object'){
          this.basicInfo = res.basicInfo;
          this.resourceConfig = res.resourceConfig;
        }
      }*/
    }
  }
</script>
