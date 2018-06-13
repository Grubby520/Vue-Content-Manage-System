/*
*  存放公共模块
* */

/*
*  深拷贝
* */
export function deepCopyObject(obj){
    let dst = {};
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            dst[prop] = obj[prop];
        }
    }
    return dst;
}
/*
*  判断两个对象是否完全相等
* */
export function isObjectValueEqual(a, b){
    const aProps = Object.getOwnPropertyNames(a),
        bProps = Object.getOwnPropertyNames(b);
    if (aProps.length !== bProps.length) {
        return false;
    }
    for (let i = 0; i < aProps.length; i++) {
        const propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
}
/*
 *  获取一定范围内的随机数
 * */
export function getRandomNumber(min, max){
    const r = Math.random() * (max - min),
           re = Math.round(r + min);
    return Math.max(Math.min(re, max), min);
}
/*
 *  table表格的mixin
 * */
export let tableMixin = {
  data(){
    return {
      //Loading
      //loading: false,
      //table的data
      tableList: [],
      
      //查询table的参数
      tableArgs: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        querySelector: '.table-box',
        args: {
          providerId: 'abc'
        }
      },
      
    }
  },
  methods: {
    /* $emit 翻页刷新 */
    emitTable(args){
      if(args.isInitTable){
        this.initTable();
      }
    },
    /* 跳转全屏loading */
    showScreenLoading(){
      this.$store.commit('showScreenLoading');
    },
    hiddenScreenLoading(){
      this.$store.commit('hiddenScreenLoading');
    },
  },
  mounted(){
    this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
      axiosLoading.close();
  })
}
};
/* 延迟函数 ms */
export function sleep(n) {
  let start=new Date().getTime();
  while(true) if(new Date().getTime()-start>n) break;
}
