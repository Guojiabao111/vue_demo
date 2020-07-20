<template>
    <div class="home-container">
        <!-- 搜索区域 -->
        <van-search
            v-model='value'
            placeholder="搜索"
            background='#3296fa'
            shape="round"
        />
        <!-- 标签 nav-->
        <van-tabs
          v-model="active"
          :swipeable="true"
          color="#3296fa"
        >
            <van-tab
                v-for="(channel) in channels"
                :key="channel.id"
                :title="channel.name"
            >
                <article-list :channel="channel"></article-list>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { getUserChannel } from '@/api/user.js'
import ArticleList from '../components/article-list.vue'
export default {
    name: 'HomeIndex',
    props: {},
    data () {
        return {
            value: '',
            active: 0,
            channels: []
        }
    },
    components: {
        ArticleList
    },
    methods: {
        async loadChannels () {
            const { data } = await getUserChannel()
            this.channels = data.data.channels
        }
    },
    computed: {},
    watch: {},
    created () {
        this.loadChannels()
    },
    mounted () {
    }
}
</script>

<style scoped lang="less">
.home-container{
    /deep/ .van-icon-search{
        margin-left: 260px;
        color:white;
    }
    /deep/ .van-search__content{
        background-color: rgba(255,255,255,0.3)
    }
    /deep/ .van-field__control[type=search]{
        color: white;
    }
    /deep/ .van-field__control[type=search]::-webkit-input-placeholder{
        color: white;
    }
    /deep/ .van-tab{
        border: 1px solid #efefef;
        border-top: none;
    }
    /deep/ .van-tab:first-child{
        font-weight: bold;
        font-size: 36px;
    }
}
</style>
