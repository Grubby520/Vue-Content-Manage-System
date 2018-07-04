<template>
  <div class="outer-screen" ref="nav" id="main-nav">
    <div class="sidebar">
      <el-menu
        :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router
        @select="handleSelect"
        @open="handleOpen"
        @close="handleClose">
        <template v-for="item in items">

          <template v-if="item.subs">

            <el-submenu :index="item.index" class="menu-1st">
              <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
              <template v-for="(inner, i) in item.subs">

                <template v-if="inner.subs">

                  <el-submenu :index="inner.index" class="menu-2nd">
                    <template slot="title"><i :class="inner.icon"></i>{{inner.title}}</template>
                    <el-menu-item v-for="(subItem, i) in inner.subs" :key="i" :index="subItem.index" class="menu-3rd"><i :class="subItem.icon"></i>{{ subItem.title }}
                    </el-menu-item>
                  </el-submenu>
                </template>
                <template v-else>
                  <el-menu-item :key="i" :index="inner.index" class="menu-2nd"><i :class="inner.icon"></i>{{ inner.title }}
                  </el-menu-item>
                </template>

              </template>
            </el-submenu>

          </template>

          <template v-else>
            <el-menu-item :index="item.index" class="menu-1st">
              <i :class="item.icon"></i>{{ item.title }}
            </el-menu-item>
          </template>

        </template>
      </el-menu>

    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {

      }
    },
    computed:{

    },
    created() {
      this.getMenuList();
    },
    methods: {
      getMenuList(){
        this.$api.post('/menuList',{})
          .then(res => {
            this.items = res;
          })
      },

    },
    mounted(){
      this.$nextTick(function () {
        //let dom_nav = this.$refs.nav.offsetHeight;
      });
    }
  }
</script>

<style scoped>

</style>
