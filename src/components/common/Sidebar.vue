<template>
    <div class="outer-screen" ref="nav" id="main-nav">
        <div class="sidebar">
            <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
                <template v-for="item in items">
                    <template v-if="item.subs">
                        <el-submenu :index="item.index">
                            <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.index">
                            <i :class="item.icon"></i>{{ item.title }}
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
    import api from '../../axios/api.js'
    export default {
        data() {
            return {
                items:[]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created() {
            this.getMenuList();
        },
        methods: {
            getMenuList(){
                api.$http('/menuList',{})
                    .then(res => {
                        this.items = res;
                    })
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                const self = this;
                let dom_nav = this.$refs.nav.offsetHeight;
            });
        }
    }
</script>

<style scoped>
    .outer-screen{
        position: absolute;
        left: 0;
        top: 50px;
        bottom: 0;
        width: 203px;
        overflow-x: hidden;
        background: #2E363F;
    }
    .sidebar{
        display: block;
        position: absolute;
        width: 220px;
        left: 0;
        top: 0;
        bottom:0;
        background: #2E363F;
        overflow-y: scroll;
    }
    .sidebar > ul {
        height:100%;
    }
    .iconfont{
        vertical-align: baseline;
        margin-right: 10px;
        font-size: 16px;
    }
</style>
