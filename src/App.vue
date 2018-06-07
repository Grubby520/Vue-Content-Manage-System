<!--主入口-->
<template>
    <div id="app">
      <!--全屏loading-->
      <div class="fullScreenLoading"
           v-loading.fullscreen.lock="fullScreenLoading"
           element-loading-text="详情页跳转中...">
      </div>

      <router-view></router-view>
    </div>
</template>
<script>
  export default {
    computed: {
      fullScreenLoading(){
        return this.$store.state.fullScreenLoading
      }
    }
  }
</script>
