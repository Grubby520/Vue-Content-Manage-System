<template>
  <div class="table">
    <my-crumbs :crumbs="crumbs"></my-crumbs>

    <div class="time-task-logic">

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <service-detail-basicInfo :basicInfo="basicInfo" :resourceConfig="resourceConfig"></service-detail-basicInfo>
        </el-tab-pane>
        <el-tab-pane label="性能" name="second">
          <service-detail-property :hostname="hostname" v-if="initSecond"></service-detail-property>
        </el-tab-pane>
        <el-tab-pane label="资源变更" name="third">
          <service-detail-change :hostname="hostname" v-if="initThird"></service-detail-change>
        </el-tab-pane>
        <el-tab-pane label="告警事件" name="fourth">
          <service-detail-warn :hostname="hostname" v-if="initFourth"></service-detail-warn>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>

<script>
  import api from '@/axios/api'
  import serviceDetailBasicInfo from './server-detail-basicInfo'
  import serviceDetailProperty from './server-detail-property'
  import serviceDetailChange from './server-detail-change.vue'
  import serviceDetailWarn from './server-detail-warn.vue'

  export default {
    components: {
      serviceDetailBasicInfo,
      serviceDetailProperty,
      serviceDetailChange,
      serviceDetailWarn,
    },
    data() {
      return {
        //crumbs
        crumbs: [
          {
            "title": "资源监管",
            "icon": "icon-1st-resource-supervise",
          }, {
            "title": "基础设施",
            "icon": "icon-2nd-Infrastructure",
          }, {
            "title": "服务器",
            "icon": "icon-3rd-server",
            "to": "/server"
          }, {
            "title": '',
          },
        ],
        //router获取的参数
        hostname: '',
        //tab基础数据
        activeName: 'first',
        initSecond: false,
        initThird: false,
        initFourth: false,
        //基本信息组件
        basicInfo: {},
        resourceConfig: {},
      };
    },

    created(){

    },

    //进入created之前
    beforeRouteEnter (to, from, next) {
      //获取hostname
      //this.$api.post('/basicInfoList', {'hostname': to.params.hostName})
      api.post('/basicInfoList', {'hostname': to.params.hostName})
        .then(res => {
          //next完成后的回调，vm获取当前组件
          next(vm => vm.setData(res));
        });
    },
    // 复用时才会触发，重新更新视图
    beforeRouteUpdate (to, from, next) {
      this.basicInfo = {};
      this.resourceConfig = {};
      this.$api.post('/basicInfoList', {})
        .then(res => {
          this.setData(res);
          next();//触发更新view?
        });
    },

    methods: {
      /* res: 接口返回的data*/
      setData(res){
        if(res && typeof res === 'object'){
          //获取router.params
          this.hostname = this.$route.params.hostName;
          //更新crumbs的title值
          this.crumbs[this.crumbs.length-1].title = this.hostname;
          this.basicInfo = res.basicInfo;
          this.resourceConfig = res.resourceConfig;
          this.$store.commit('hiddenScreenLoading');
        }
      },
      /*
      * tab切换
      * pc: 切换时才异步请求组件
      * */
      handleClick(tab, event){
        if(tab.name === 'second' && !this.initSecond){
          this.initSecond = true;
        }
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
