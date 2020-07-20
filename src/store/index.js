import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage.js'

Vue.use(Vuex)

// 这里做的主要目的是可以避免访问和获取数据的名字不一致导致的
// 后期的问题，这样也是为了方便后期的维护的操作
const USER_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
  },
  mutations: {
    // state代表的仓库或者公共的数据
    // data是负载（携带的数据内容）
    setUser (state, data) {
      state.user = data
      // 这里是为了页面刷新导致数据丢失，所以我们需要
      // 将数据放到本地进行存储，单纯为了持久化数据的操作
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
