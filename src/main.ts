import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ScaleBox from 'scale-box'
import VueAxios from 'vue-axios'
import axios from 'axios'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(ElementPlus).use(VueAxios,axios).use(ScaleBox)

app.mount('#app')

app.config.globalProperties.$axios = axios
axios.defaults.baseURL = '/api';

// router.beforeEach((to, from, next) => {
//   if (to.meta.roles) {
//       if (to.meta.roles.includes(sessionStorage.getItem("userRole"))) {
//           next()
//       }
//       else {
//           //next({name:'index',query:{msg:"请先登录"}}
//           sessionStorage.setItem("unlogin", "请先登录")
//           next({ name: 'login' })
//       }
//   }else{
//       next()
//   }
// })