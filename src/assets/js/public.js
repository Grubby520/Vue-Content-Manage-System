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
      //table的data
      tableList: [],
      
      //查询table的参数
      tableArgs: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        args: {}
      },
      
    }
  },
  methods: {
    /* 查询table */
    search(){
      this.tableArgs.currentPage = 1;
      this.initTable();
    }
    
  }
};
