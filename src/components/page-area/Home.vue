<template>
    <div class="wrapper" id="wrapper">
        <Header></Header>
        <Sidebar></Sidebar>
        <div class="content" id="main-content">
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import Header from './Header.vue';
    import Sidebar from './Sidebar.vue';
    export default {
        components:{
          Header, Sidebar
        },
        mounted: function () {
            this.$nextTick(function () {
                // Code that will run only after the
                // entire view has been rendered
            });
        }
    }
</script>
