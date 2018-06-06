import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
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
          path: '/storageDevice',
          component: resolve => require(['../components/pages/resource-supervise/infrastructure/storage-device/storage-device-list.vue'], resolve)
        },
        {
          path: '/storageDevice/:hostName',
          component: resolve => require(['../components/pages/resource-supervise/infrastructure/storage-device/storage-device-detail-list.vue'], resolve),
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
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/pages/Login.vue'], resolve)
    },
  ]
})
