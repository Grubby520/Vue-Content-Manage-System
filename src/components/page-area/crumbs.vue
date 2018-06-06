<!-- 顶部面包屑导航组件 -->
<template>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in crumbs" :key="item.title">

        <span v-if="item.to"><router-link :to='item.to'><i class="icon" :class="item.icon"></i> {{item.title}}</router-link></span>
        <span v-else-if="item.icon"><i class="icon" :class="item.icon"></i> {{item.title}}</span>
        <span v-else class="current"> {{item.title}}</span>

      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    props: {
      crumbs: {
        type: Array,
        required: true
      }
    },
    computed: {
      len(){
        return this.crumbs.length;
      }
    }
  }
</script>
