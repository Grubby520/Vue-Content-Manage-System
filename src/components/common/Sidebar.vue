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
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'icon iconfont icon-home',
                        index: 'home',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '系统管理',
                        subs: [
                            {
                                index: 'userTable',
                                title: '用户管理'
                            },
                            {
                                index: 'tenantTable',
                                title: '租户管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '3',
                        title: '表单',
                        subs: [
                            {
                                index: 'baseform',
                                title: '基本表单'
                            },
                            {
                                index: 'vueeditor',
                                title: '编辑器'
                            },
                            {
                                index: 'markdown',
                                title: 'markdown'
                            },
                            {
                                index: 'upload',
                                title: '文件上传'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'basecharts',
                        title: '图表'
                    },
                    {
                        icon: 'el-icon-upload2',
                        index: 'drag',
                        title: '拖拽'
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created() {
//            console.log('created');
        },
        mounted: function () {
            this.$nextTick(function () {
                // Code that will run only after the
                // entire view has been rendered
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
