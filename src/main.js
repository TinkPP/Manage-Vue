import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/base.less'
import router from './router'
import store from './store'
import http from 'axios'
import '@/api/mock'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.use(ElementUI)

//路由守卫
router.beforeEach((to, from, next) => {
    store.commit('getToken')
    const token = store.state.user.token
    console.log(token);
    if (!token) {
        next('/login')
    } else if (token) {
        next('/home')
    }
})

new Vue({
    store,
    router,
    render: h => h(App),
    created() {
        store.commit('addMenu', router)
    }
}).$mount('#app')