<template>
    <div class="login-container">
        <!-- login nav -->
       <van-nav-bar class="app-nav-bar" title="注册/登录" left-arrow fixed @click-left="$router.go(-1)"></van-nav-bar>
       <!-- form start -->
       <van-form
        ref='login-form'
       >
            <van-field
                name="mobile"
                v-model="user.mobile"
                icon-prefix="toutiao"
                maxlength="11"
                type="tel"
                required
                left-icon="shouji"
                placeholder="请输入手机号"
            />
            <van-field
                name="code"
                v-model="user.code"
                type="number"
                required
                maxlength="6"
                clearable
                icon-prefix="toutiao"
                left-icon="yanzhengma"
                placeholder="请输入验证码"
                >
                <template #button>
                     <van-count-down
                        v-if="isCountDownShow"
                        :time="1000 * 5"
                        format="ss s"
                        @finish="isCountDownShow = false"
                    />
                    <van-button
                        v-else
                        :loading="isSendSmsLoading"
                        size="small"
                        type="primary"
                        @click.prevent='onSendSms'
                    >
                        发送验证码
                    </van-button>
                </template>
            </van-field>
        </van-form>
        <div class="login-btn-wrap">
            <van-button class="login-btn" type="info" block @click="onLogin">登录</van-button>
        </div>
    </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
    /*
        思路：将token存储在vuex状态管理中（具备响应式）
        通过状态管理vuex将token存储在本地localstorage中
        其中state中设置user的数据（全局公用的数据）
    */
    name: 'LoginIndex',
    props: {},
    data () {
        return {
            user: {
                mobile: '',
                code: ''
            },
            isSendSmsLoading: false,
            isCountDownShow: false
        }
    },
    components: {},
    methods: {
        async onLogin () {
            // 加载中...
            this.$toast.loading({
                message: '登录中...',
                forbidClick: true,
                duration: 0
            })
            try {
                // 成功响应过来的数据传递给data
                // 这里的data不是一个单纯的变量，它是状态管理中的data（携带的负载）
                const { data } = await login(this.user)
                console.log(data)
                this.$toast.success('登录成功')
                this.$store.commit('setUser', data.data)
                this.$router.push('/my')
            } catch (err) {
                if (err.response.status === 400) {
                    console.log('登录失败', err)
                    this.$toast.fail('登录失败,手机号或验证码错误')
                }
            }
        },
        async onSendSms () {
            try {
                // 验证手机号
                // 通过 ref 可以获取到 Form 实例并调用实例方法
                await this.$refs['login-form'].validate('mobile')
                // 在验证手机之前这个按钮就是要显示出来的
                // 这里也是为了防止用户多次的进行单机操作
                this.isSendSmsLoading = true
                await sendSms(this.user.mobile)
                // 信息发送出去了然后显示倒计时
                this.isCountDownShow = true
            } catch (err) {
                // 验证手机会出现多种情况，
                // 不同的错误会导致不同的信息输出
                // 所以这里要进行判断
                let message = ''
                if (err && err.response && err.response.status === 429) {
                    // 429接口访问受限
                    message = '发送太频繁了，请稍后重试'
                } else if (err.name === 'mobile') {
                    message = err.message
                } else {
                    message = '发送失败，请稍后再试'
                }
                this.$toast({
                    message,
                    position: 'top'
                })
            }
            // 最后这个加载的都要进行清除的
            this.isSendSmsLoading = false
            // 发送失败显示发送的按钮，倒计时关闭
            this.isCountDownShow = false
        }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {}
}
</script>

<style scoped lang="less">
.login-container {
    margin-top: 100px;
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
