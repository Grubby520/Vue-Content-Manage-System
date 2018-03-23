<template>
    <div class="wrapper" id="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content" id="main-content">
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
        components:{
            vHead, vSidebar
        },
        mounted: function () {
            this.$nextTick(function () {
                // Code that will run only after the
                // entire view has been rendered
            });
        }
    }
</script>
