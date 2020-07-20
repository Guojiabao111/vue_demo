/*
  封装axios请求模块
  通过baseUrl将绝对的网址剥离出来，以后使用会更加的方便
  主要的作用点：
  1.通过axios可以异步访问api接口通过不同的restFul风格进行数据的请求操作
  2.通过axios可以设置拦截器，主要处理token，在请求还没有进入的时候进行拦截
  处理操作，然后处理完毕之后进行响应的操作
*/
import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
import router from '@/router'

const request = axios.create({
    // 这里创建了一个实例，给与了一个基础的url，所以后期就不用
    // 经常写这个网址了
    baseURL: 'http://ttapi.research.itcast.cn/'
})

/*
  配置处理后端返回数据中超出js安全整数范围的问题
*/
request.defaults.transformResponse = [
  function (data) {
    try {
      return jsonBig.parse(data)
    } catch (err) {
      return {}
    }
  }
]

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    const { user } = store.state
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  // 响应成功进入第1个函数
  // 该函数的参数是响应对象
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  // 响应失败进入第2个函数，该函数的参数是错误对象
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // 如果响应码是 401 ，则请求获取新的 token(401是用户未认证)

    // 响应拦截器中的 error 就是那个响应的错误对象
    console.dir(error)
    if (error.response && error.response.status === 401) {
      // 校验是否有 refresh_token
      const user = store.state.user

      if (!user || !user.refresh_token) {
        router.push('/login')
        // 代码不要往后执行了
        return
      }

      // 如果有refresh_token，则请求获取新的 token
      try {
          const res = await axios({
          method: 'PUT',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })

        // 如果获取成功，则把新的 token 更新到容器中
        console.log('刷新 token  成功', res)
        store.commit('setUser', {
          token: res.data.data.token, // 最新获取的可用 token
          refresh_token: user.refresh_token // 还是原来的 refresh_token
        })

        // 把之前失败的用户请求继续发出去
        // config 是一个对象，其中包含本次失败请求相关的那些配置信息，例如 url、method 都有
        // return 把 request 的请求结果继续返回给发请求的具体位置
        return request(error.config)
      } catch (err) {
        // 如果获取失败，直接跳转 登录页
        console.log('请求刷线 token 失败', err)
        router.push('/login')
      }
    }

    return Promise.reject(error)
  }
)

export default request
