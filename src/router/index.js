import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',// 去掉丑陋的hash #
  routes: [
    {
      path: '/login',
      component: resolve => require(['../components/pages/Login.vue'], resolve)
    },
    {
      path: '/home',
      component: resolve => require(['../components/page-area/Home.vue'], resolve),
      children:[
        {
          path: '/',
          component: resolve => require(['../components/pages/home.vue'], resolve)
        },
        {
          path: '/server',
          component: resolve => require(['../components/pages/resource-supervise/infrastructure/server/server-list.vue'], resolve),
        },
        {
          path: '/server/:hostName',
          component: resolve => require(['../components/pages/resource-supervise/infrastructure/server/server-detail-list.vue'], resolve),
        },
        
        {
          path: '/userTable',
          component: resolve => require(['../components/pages/systemManagement/user/userTable.vue'], resolve)
        },
        {
          path: '/tenantTable',
          component: resolve => require(['../components/pages/systemManagement/tenant/tenantTable.vue'], resolve)     // vue-datasource组件
        },
        
        {
          path: '/serviceCatalog',
          component: resolve => require(['../components/pages/operationManagement/serviceCatalog/serviceCatalog-list.vue'], resolve)     // vue-datasource组件
        },
        
        {
          path: '/codeTable',
          component: resolve => require(['../components/pages/operationManagement/code/codeTable.vue'], resolve)     // vue-datasource组件
        },
        
        {
          path: '/baseform',
          component: resolve => require(['../components/pages/BaseForm.vue'], resolve)
        },
        {
          path: '/vueeditor',
          component: resolve => require(['../components/pages/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
        },
        {
          path: '/markdown',
          component: resolve => require(['../components/pages/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
        },
        {
          path: '/upload',
          component: resolve => require(['../components/pages/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
        },
        {
          path: '/DragList',
          component: resolve => require(['../components/pages/DragList.vue'], resolve)    // 拖拽列表组件
        },
        {
          path: '*',
          component: resolve => require(['../components/page-area/404.vue'], resolve)
        },
        {
          path: '/undefined',
          component: resolve => require(['../components/page-area/404.vue'], resolve)
        },
      ]
    },
    {
      path: '/',
      redirect: '/login'
    },
  ]
});

router.beforeEach((to, from, next) => {
  // 一个数组，包含当前路由的所有嵌套路径片段的路由记录，内置matched
  if(to.matched.length === 0){
    next('/undefined'); // 404
  }
  else{
    next();
  }
});

export default router;


