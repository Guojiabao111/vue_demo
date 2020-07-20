/*
    文章相关请求模块
*/
import request from '@/utils/request.js'

/*
    获取文章列表
*/
export const getArticles = params => {
    return request({
        method: 'get',
        url: '/app/v1_1/articles',
        params
    })
}

/**
 * 根据 id 获取指定文章
*/
export const getArticleById = articleId => {
    return request({
      method: 'GET',
      url: `/app/v1_0/articles/${articleId}`
    })
}
