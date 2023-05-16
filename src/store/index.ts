import { createStore } from 'vuex'
/**
 * 创建仓库和导出
 */
 const storeMaker = (state) => {
  // 初始化
  Object.keys(state).map((key) => {
      // 判断类型获取本地存储数据
      if (typeof state[key] === 'object') {
          if (sessionStorage.getItem(key) && JSON.parse(sessionStorage.getItem(key))) {
              state[key] = JSON.parse(sessionStorage.getItem(key))
          }
      } else if (typeof state[key] === 'number') {
          if (sessionStorage.getItem(key) && parseInt(sessionStorage.getItem(key))) {
              state[key] = parseInt(sessionStorage.getItem(key))
          }
      } else {
          if (sessionStorage.getItem(key)) {
              state[key] = sessionStorage.getItem(key)
          }
      }
  })

  // 重写set处理
  return new Proxy(state, {
      set: function(target, key, value) {
          let temp = value
          if (typeof temp === 'object') {
              temp = JSON.stringify(temp)
          }

          sessionStorage.setItem(key, temp)
          return Reflect.set(target, key, value)
      }
  })
}

export default createStore({
    state: storeMaker({
        userAccount: '',
        username: '',
        userRole: '',
        collapseFlag: true,
        fullScreenFlag: false, 
    }),
    mutations: {
      storeUserInfo(state, obj) {
        state.username = obj.username;
        state.userRole = obj.userRole;
      },
      storeHeaderFlag(state, obj) {
        state.collapseFlag   = obj.collapseFlag;
        state.fullScreenFlag = obj.fullScreenFlag
      }
    }
})