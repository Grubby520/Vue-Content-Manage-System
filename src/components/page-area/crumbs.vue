<!-- 顶部面包屑导航组件 -->
<template>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in crumbs" :key="item.title">
        <span :class="index == len-1 ? 'current' : ''"><i class="icon" :class="item.icon"></i> {{item.title}}</span>
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
