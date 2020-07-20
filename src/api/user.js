/*
    这里是请求登录的接口操作
*/
import request from '@/utils/request.js'
// import store from '@/store/'

/*
    用户登录
*/
export const login = data => {
    return request({
        method: 'post',
        url: '/app/v1_0/authorizations',
        data
    })
}
/*
    短信验证
*/
export const sendSms = mobile => {
    return request({
        method: 'get',
        url: `/app/v1_0/sms/codes/${mobile}`
    })
}
/*
    获取用户自己的信息内容
*/
export const getUserInfo = () => {
    return request({
        method: 'get',
        url: '/app/v1_0/user'
        // 在拦截器中进行了设置，所以这里不用每次请求数据的时候
        // 再手动的进行headers的令牌添加的操作
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}
/*
    获取用户频道列表
*/
export const getUserChannel = () => {
    return request({
        method: 'get',
        url: '/app/v1_0/user/channels'
    })
}
