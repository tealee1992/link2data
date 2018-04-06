// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//注册插件
Vue.use(ElementUI)


Vue.config.productionTip = false
Vue.http.options.emulateJSON = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store,
  components: { App },
  template: '<App/>'
})
