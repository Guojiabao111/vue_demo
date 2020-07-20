<template>
  <div class="my-container">
    <!-- 已登录状态 -->
    <van-cell-group class="my-info" v-if="user">
        <van-cell center class="base-info" :border="false">
            <van-image
                class="avatar"
                round
                width="50"
                height="50"
                slot="icon"
                :src="currentUser.photo"
            />
            <div class="name" slot="title">{{ currentUser.name }}</div>
            <van-button
                round type="default"
                size="small"
            >编辑资料
            </van-button>
        </van-cell>
        <van-grid class="data-info" :border="false">
            <van-grid-item class="data-info-item">
                <div slot="text" class="text-wrap">
                    <div class="count">{{ currentUser.art_count }}</div>
                    <div class="text">头条</div>
                </div>
            </van-grid-item>
            <van-grid-item class="data-info-item">
                <div slot="text" class="text-wrap">
                    <div class="count">{{ currentUser.follow_count }}</div>
                    <div class="text">关注</div>
                </div>
            </van-grid-item>
            <van-grid-item class="data-info-item">
                <div slot="text" class="text-wrap">
                    <div class="count">{{ currentUser.fans_count }}</div>
                    <div class="text">粉丝</div>
                </div>
            </van-grid-item>
            <van-grid-item class="data-info-item">
                <div slot="text" class="text-wrap">
                    <div class="count">{{ currentUser.like_count }}</div>
                    <div class="text">获赞</div>
                </div>
            </van-grid-item>
        </van-grid>
    </van-cell-group>

    <!-- 未登录时的界面 -->
    <div class="not-login" v-else>
        <div @click="$router.push('/login')">
            <img class="mobile" src="/img/iphone.png" alt="">
        </div>
        <div class="text">点击登录</div>
    </div>

     <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="shoucang"
        text="收藏"
      />
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="lishi"
        text="历史"
      />
    </van-grid>
    <van-cell title="消息通知" is-link to="/" />
    <van-cell class="mb-4" title="小智同学" is-link to="/" />
    <van-cell class="logout-cell" v-if="user" title="退出登录" @click="onLogOut" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
        currentUser: {}
    }
  },
  computed: {
      ...mapState(['user'])
  },
  watch: {},
  created () {
      this.loadCurrentUser()
  },
  mounted () {},
  methods: {
      async loadCurrentUser () {
        const { data } = await getUserInfo()
        this.currentUser = data.data
        console.log(this.currentUser)
      },
      onLogOut () {
          this.$dialog.confirm({
            title: '退出提示',
            message: '确认退出吗？'
            })
            .then(() => {
                // on confirm
                this.$store.commit('setUser', null)
            })
            .catch(() => {
                // on cancel
            })
      }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .my-info {
    background: url("../assets/banner.png") no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      background-color: unset;
      padding-top: 128px;
      .avatar {
        box-sizing: border-box;
        width: 100px;
        height: 100px;
        border: 1px solid #fff;
        margin-right: 18px;
      }
      .name {
        font-size: 30px;
        color: #fff;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        margin-top:50px;
        margin-bottom: 50px;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 28px;
          }
          .text {
            font-size: 28px;
          }
        }
      }
    }
    // 前面加上的deep是less的一个语法，深度作用域
    // 因为加了scoped，具备一个独立的作用域，为了能够作用域到子组件上
    // 所以这里就使用这个deep深度作用域去设置样式，否则样式会不生效
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }
   //   未登录
  .not-login {
    height: 380px;
    background: url("../assets/banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 150px;
      height: 150px;
    }
    .text {
      font-size: 34px;
      color: #fff;
    }
  }

  /deep/ .nav-grid {
    .nav-grid-item {
      height: 150px;
      .toutiao {
        font-size: 50px;
      }
      .toutiao-shoucang {
        color: #F8C4C4;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 24px;
        color: #333333;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
