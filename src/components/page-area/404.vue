<template>
  <div class="undefined-router">
    <div class="middle">
      <section class="error-container">
        <span>4</span>
        <span><span class="screen-reader-text">0</span></span>
        <span>4</span>
      </section>

      <section class="cnt-router">
        <div class="cnt">
          <p>可能的原因：</p>
          <p class="ml10">访问路径有误或已失效</p>
          <p class="ml10">服务器故障</p>
        </div>
        <div class="set-color">
          <el-button type="primary" class="mr2" @click="goBack">返回上一页</el-button>
          <router-link :to="{ path: '/home' }"><el-button type="primary" @click="">返回首页</el-button></router-link>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  export default {
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('resetFromPath', from);
      });
    },

    methods: {
      // 返回上一步
      goBack(){
        const fromPath = this.$store.state.fromPath;
        this.$router.push(fromPath);
      }
    }
  }
</script>

<style scoped>
  .ml10{
    margin-left: 1em;
    margin-top: 0.5em;
  }
  .undefined-router{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #416475;
  }
  .middle{
    position: fixed;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
  }
  .error-container {
    text-align: center;
    font-size: 180px;
    font-family: 'Catamaran', sans-serif;
    font-weight: 800;
    margin: 20px 15px;
  }
  .cnt-router{
    font-size: 1em;
    text-align: center;
    color: #ccc;
  }
  .cnt{
    display: inline-block;
    text-align: left;
    margin-bottom: 2em;
  }
  .set-color{
    color: #fff;
  }
  .error-container > span {
    display: inline-block;
    line-height: 0.7;
    position: relative;
    color: #FFB485;
  }
  .error-container > span {
    display: inline-block;
    position: relative;
    vertical-align: middle;
  }
  .error-container > span:nth-of-type(1) {
    color: #D1F2A5;
    animation: colordancing 4s infinite;
  }
  .error-container > span:nth-of-type(3) {
    color: #F56991;
    animation: colordancing2 4s infinite;
  }
  .error-container > span:nth-of-type(2) {
    width: 120px;
    height: 120px;
    border-radius: 999px;
  }
  .error-container > span:nth-of-type(2):before,
  .error-container > span:nth-of-type(2):after {
    content:"";
    position: absolute;
    top: 0; left: 0;
    width: inherit; height: inherit;
    border-radius: 999px;
    box-shadow: inset 30px 0 0 rgba(209, 242, 165, 0.4),
    inset 0 30px 0 rgba(239, 250, 180, 0.4),
    inset -30px 0 0 rgba(255, 196, 140, 0.4),
    inset 0 -30px 0 rgba(245, 105, 145, 0.4);
    animation: shadowsdancing 4s infinite;
  }
  .error-container > span:nth-of-type(2):before {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .screen-reader-text {
    position: absolute;
    top: -9999em;
    left: -9999em;
  }
  @keyframes shadowsdancing {
    0% {
      box-shadow: inset 30px 0 0 rgba(209, 242, 165, 0.4),
      inset 0 30px 0 rgba(239, 250, 180, 0.4),
      inset -30px 0 0 rgba(255, 196, 140, 0.4),
      inset 0 -30px 0 rgba(245, 105, 145, 0.4);
    }
    25% {
      box-shadow: inset 30px 0 0 rgba(245, 105, 145, 0.4),
      inset 0 30px 0 rgba(209, 242, 165, 0.4),
      inset -30px 0 0 rgba(239, 250, 180, 0.4),
      inset 0 -30px 0 rgba(255, 196, 140, 0.4);
    }
    50% {
      box-shadow: inset 30px 0 0 rgba(255, 196, 140, 0.4),
      inset 0 30px 0 rgba(245, 105, 145, 0.4),
      inset -30px 0 0 rgba(209, 242, 165, 0.4),
      inset 0 -30px 0 rgba(239, 250, 180, 0.4);
    }
    75% {
      box-shadow: inset 30px 0 0 rgba(239, 250, 180, 0.4),
      inset 0 30px 0 rgba(255, 196, 140, 0.4),
      inset -30px 0 0 rgba(245, 105, 145, 0.4),
      inset 0 -30px 0 rgba(209, 242, 165, 0.4);
    }
    100% {
      box-shadow: inset 30px 0 0 rgba(209, 242, 165, 0.4),
      inset 0 30px 0 rgba(239, 250, 180, 0.4),
      inset -30px 0 0 rgba(255, 196, 140, 0.4),
      inset 0 -30px 0 rgba(245, 105, 145, 0.4);
    }
  }
  @keyframes colordancing {
    0% {
      color: #D1F2A5;
    }
    25% {
      color: #F56991;
    }
    50% {
      color: #FFC48C;
    }
    75% {
      color: #EFFAB4;
    }
    100% {
      color: #D1F2A5;
    }
  }
  @keyframes colordancing2 {
    0% {
      color: #FFC48C;
    }
    25% {
      color: #EFFAB4;
    }
    50% {
      color: #D1F2A5;
    }
    75% {
      color: #F56991;
    }
    100% {
      color: #FFC48C;
    }
  }

  /* demo stuff */
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  body {
    background-color: #416475;
    margin-bottom: 50px;
  }
  h1 {
    text-align: center;
    margin: 0px 15px 30px 0;
  }
  .zoom-area {
    max-width: 490px;
    margin: 30px auto 30px;
    font-size: 19px;
    text-align: center;
  }
  .link-container {
    text-align: center;
  }
  a.more-link {
    text-transform: uppercase;
    font-size: 13px;
    background-color: #92a4ad;
    padding: 10px 15px;
    border-radius: 0;
    color: #416475;
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 5px;
    line-height: 1.5;
    text-decoration: none;
    margin-top: 50px;
    letter-spacing: 1px;
  }
</style>
