<template>
  <div class="container">
    <p class="title">cnNode社区</p>
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">点击授权</button>
  </div>
</template>

<script>
import { fetch } from '@/utils/link.js'
export default {
  data () {
    return {
    }
  },
  methods: {
    onGotUserInfo (e) {
      let _this = this
      if (e.mp.detail.userInfo) {
        console.log(e.mp.detail.userInfo)
        wx.setStorageSync('userInfo', e.mp.detail.userInfo)
        wx.login({
          success (res) {
            if (res.code) {
              _this.getUserInfo(res.code)
            }
          }
        })
      } else {
        console.log('授权失败')
      }
    },
    getUserInfo (code) {
      let _this = this
      wx.getUserInfo({
      // 获取成功，全局存储用户信息，开发者服务器登录
        success (res) {
          console.log(res)
          _this.postLogin(code, res.iv, res.encryptedData)
        }
      })
    },
    postLogin (code, iv, encryptedData) {
      let params = {
        code: code,
        iv: iv,
        encryptedData: encryptedData
      }
      fetch('http://localhost:3000/login', params, 'post').then(res => {
        console.log(res)
      }).catch(err => { console.log(err) })
    }
  }
}
</script>

<style lang="stylus" scoped>
 .container
   backgroun-color #298de5
   .title 
     font-size 60rpx
</style>
