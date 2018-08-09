<template>
  <div class="container">
    <p class="title">cnNode社区</p>
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">点击授权</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    onGotUserInfo (e) {
      if (e.mp.detail.userInfo) {
        wx.setStorageSync('userInfo', e.mp.detail.userInfo)
        wx.navigateTo({
          url: '../home/main'
        })
      } else {
        console.log('授权失败')
      }
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
