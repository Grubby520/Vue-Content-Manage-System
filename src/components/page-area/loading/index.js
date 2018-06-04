import vue from 'vue'

// 静态组件
import dialogComponent from './src/main.vue'

// 扩展实例构造器
const dialogConstructor = vue.extend(dialogComponent);

// 定义弹出组件的函数 接收2个参数, 要显示的文本 和 显示时间
function showDialog(text, duration = 2000){
  const dialogDom = new dialogConstructor({
    el: document.createElement('div'),
    data(){
      return {
        text: text,
        showWrap: true, // 是否显示组件
        showTransition: true, // 是否添加过渡动画
      }
    }
  });
  
  document.body.appendChild(dialogDom.$el);
  
  setTimeout(() => {
    dialogDom.showTransition = false
  }, duration-1250);
  
  setTimeout(() => {
    dialogDom.showWrap = false
  }, duration);
}

// 注册为全局组件的函数
function registerDialog(){
  vue.prototype.$dialog = showDialog
}

export default registerDialog
