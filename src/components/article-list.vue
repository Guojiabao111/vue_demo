<template>
    <div class="active-list">
        <van-pull-refresh
            v-model="isRefreshLoading"
            @refresh="onRefresh"
            :success-text="refreshSuccessText"
            :success-duration="1500"
        >
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <article-item
                    v-for="(article, index) in articles"
                    :key="index"
                    :article="article"
                />
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
import ArticleItem from '@/components/article-item.vue'
export default {
    name: 'ArticleList',
    data () {
        return {
            articles: [],
            loading: false,
            finished: false,
            timestamp: null,
            isRefreshLoading: false,
            refreshSuccessText: ''
        }
    },
    props: {
        channel: {
            type: Object,
            required: true
        }
    },
    components: { ArticleItem },
    methods: {
        async onLoad () {
            // 请求获取数据
            const { data } = await getArticles({
                // 这些是后台必须要提供的参数
                channel_id: this.channel.id,
                timestamp: this.timestamp || Date.now(),
                with_top: 1 // 1包含，0不包含
            })
            // console.log(data)
            // 将数据放到list数组中
            const { results } = data.data
            this.articles.push(...results)

            // 设置本次加载状态结束
            this.loading = false

            // 数据全部加载完毕
            if (results.length) {
                this.timestamp = data.data.pre_timestamp
            } else {
                this.finished = true
            }
        },
        async onRefresh () {
            // 下拉刷新
            const { data } = await getArticles({
                channel_id: this.channel.id,
                timestamp: Date.now(),
                with_top: 1
            })
            const { results } = data.data
            // 往顶部追加内容
            this.articles.unshift(...results)
            // 关闭刷新状态
            this.isRefreshLoading = false
            this.refreshSuccessText = `更新了${results.length}条数据`
        }
    },
    created () {},
    mounted () {},
    updated () {}
}
</script>

<style lang="less">
.active-list{
    position: fixed;
    left: 0;
    right: 0;
    top: 196px;
    bottom: 90px;
    overflow-y: auto;
}
</style>
