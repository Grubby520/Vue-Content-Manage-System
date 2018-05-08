<template>
  <div>
    <div class="lg-title">资源变更列表</div>
    <div class="handle-box">
      <div class="box-left">

      </div>
      <div class="box-right">
        <el-select v-model="select_type" placeholder="变更类型" class="handle-select mr10">
          <el-option
            v-for="item in roles"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId">
          </el-option>
        </el-select>

        <el-button type="primary" icon="search" @click="search">查询</el-button>
      </div>
    </div>
    <el-table :data="tableList" border style="width: 100%">
      <el-table-column prop="time" label="变更时间">
      </el-table-column>
      <el-table-column prop="type" label="变更类型">
      </el-table-column>
      <el-table-column prop="resourceBefore" label="变更前资源">
      </el-table-column>
      <el-table-column prop="resourceAfter" label="变更后资源">
      </el-table-column>
      <el-table-column prop="author" label="变更人">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

  import api from '@/axios/api.js'

  export default {
    data(){
      return {
        tableList:[
          {
            time: '2016.2.15',
            type: '49.5',
            resourceBefore: '73.6',
            resourceAfter: '20',
            author: '50.6/20.4'
          }
        ],
        roles: [],//查询-select-json
      }
    },
    methods:{
      search(){

      }
    },
    created(){
      api.$http('/roleList', {})
        .then(res => {
          this.roles = res;
        });
    }
  }
</script>
