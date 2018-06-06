import crumbs from './page-area/crumbs.vue'
import pagination from './page-area/pagination.vue'
import topfive from './business-module/topFive/topfive.vue'
export default (Vue)=>{
  Vue.component("myCrumbs",crumbs);
  Vue.component("myPagination",pagination);
  Vue.component("myTopFive",topfive);
}

