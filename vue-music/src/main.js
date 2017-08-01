// es6的转义
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 懒加载
import VueLazyLoad from 'vue-lazyload'

//  解决移动端点击延迟300ms
import fastclick from 'fastclick'

fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})
// 移动端点击延迟300ms
Vue.config.productionTip = false

// 引入基础样式
import 'common/stylus/index.styl'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
