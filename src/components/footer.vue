<template>
      <div class="footer">
            <div v-for="(item,index) in tabs" :key="index" :class="{'active': activeIndex === index}" @click="changePage(item.path)">{{item.name}}</div>
      </div>
</template>
<script>
export default {
  props: ['activeIndex'],
  data () {
    return {
      tabs: [
        {name: '首页', path: 'home/main'},
        {name: '测试', path: 'test/main'},
        {name: '个人'}
      ]
    }
  },
  methods: {
    changePage (path) {
      console.log(path)
      wx.navigateTo({
        url: `../${path}`
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
 .footer
  width 100%
  position fixed
  bottom 0
  display flex
  border-top 1px solid #e7e7eb
  height 100rpx
  align-items center
  &>div
    text-align center
    width 33.3%
    &.active
      color #e61f1f   
</style>


