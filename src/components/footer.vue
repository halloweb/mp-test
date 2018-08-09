<template>
    <div class="footer">
      <div class="footer_item"></div>
      <div class="footer_item"></div>
      <div class="footer_item"></div>
    </div>
</template>
<script>
export default {
  props: []
}
</script>
<style lang="stylus">
   .footer_wrap
     height 100rpx
    .footer
        position fixed
        bottom 0
        width 100%
        height 100rpx
        display flex
        border-top 1px solid red
        background-color #fff
        .footer_item 
          width 33.3%
     
</style>


