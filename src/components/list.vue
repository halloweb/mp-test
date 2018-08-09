<template>
    <ul>
        <!-- <scroll-view scroll-y :style="'height:'+ (minHeight - 200)+'rpx'" @scroll="scroll"> -->
         <li class="list_item"  v-for="(item,index) in listData" :key="index">{{item.title}}</li>
        <!-- </scroll-view> -->
    </ul>
</template>
<script>
import { fetch } from '@/utils/link'
export default {
  props: ['type', 'activeType', 'minHeight', 'isRefresh', 'loadMore'],
  data () {
    return {
      listData: [],
      pageNumber: 1,
      pageSize: 10
    }
  },
  watch: {
    activeType: {
      handler: function () {
        if (this.activeType === this.type && this.listData.length === 0) {
          this.getData()
        }
      },
      immediate: true
    },
    isRefresh () {
      if (this.isRefresh && this.activeType === this.type) {
        this.pageNumber = 1
        this.getData()
      }
    },
    loadMore () {
      if (this.loadMore && this.activeType === this.type) {
        this.pageNumber = this.pageNumber + 1
        this.getData()
      }
    }
  },
  methods: {
    getData () {
      let data = {
        page: this.pageNumber,
        tab: this.type,
        limit: this.pageSize
      }
      fetch('https://cnodejs.org/api/v1/topics', data).then(res => {
        this.listData = res.data
        if (this.isRefresh) this.$emit('hasRefresh')
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  ul
    height 100%
    overflow-y auto
  .list_item 
      padding 30rpx 20rpx
      border-bottom 1px solid #f4f4f4
      font-size 30rpx
</style>


