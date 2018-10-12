<template>
 <div>
    <div class="navbar">
      <block v-for="(item,index) in tabs" :key="index">
        <div :id="index" :class="{'navbar_item_on':activeIndex == index}" class="navbar_item" @click="tabClick">
          <div class="navbar_title">{{item.name}}</div>
        </div>
      </block>
      <div class="navbar_slider" :class="navbarSliderClass"></div>
    </div>
    <swiper class="content" :duration="50" :style="'height:'+contentHeight" @change="swiperChange" :current="currentTab">
        <swiper-item v-if="tabs.length>0"  v-for="(item,index) in tabs" :key="index">
          <articleList @hasLoad="hasLoad" @hasRefresh="hasRefresh" :isRefresh="isRefresh"  :type="item.type" :activeType="tabs[currentTab]['type']" :minHeight="swiperHeight"></articleList>
        </swiper-item>
    </swiper>
    <bottomNav :activeIndex="0"></bottomNav>  
  </div>
</template> 
<script>
import bottomNav from '@/components/footer'
import articleList from '@/components/list'
import { fetch } from '@/utils/link'
export default {
  components: {
    articleList,
    bottomNav
  },
  data () {
    return {
      tabs: [
        {'name': '推荐', 'type': 'good', 'checked': true},
        {'name': '分享', 'type': 'share', 'checked': true},
        {'name': '问答', 'type': 'ask', 'checked': true}
      ],
      activeIndex: 0,
      currentTab: 0,
      winWidth: 0,
      winHeight: 0,
      isRefresh: false,
      loadMore: false
    }
  },
  computed: {
    navbarSliderClass () {
      if (this.activeIndex === 0) {
        return 'navbar_slider_0'
      }
      if (this.activeIndex === 1) {
        return 'navbar_slider_1'
      }
      if (this.activeIndex === 2) {
        return 'navbar_slider_2'
      }
    },
    contentHeight () {
      return this.winHeight * (750 / this.winWidth) + 'rpx'
    },
    swiperHeight () {
      return this.winHeight * (750 / this.winWidth)
    }
  },
  methods: {
    tabClick (e) {
      this.activeIndex = e.currentTarget.id
      this.currentTab = this.activeIndex
    },
    swiperChange (e) {
      this.currentTab = e.mp.detail.current
      this.activeIndex = this.currentTab
    },
    getTabs () {
      fetch('https://api.myjson.com/bins/or6l4').then(res => {
        this.tabs = res
      })
    },
    hasRefresh () {
      console.log('shuaxinwc')
      this.isRefresh = false
      wx.stopPullDownRefresh()
    },
    hasLoad () {
      console.log('加载更多完成')
      this.loadMore = false
    }
  },
  async onPullDownRefresh () {
    console.log('刷新')
    this.isRefresh = true
  },
  onReachBottom () {
    this.loadMore = true
    console.log('到底了')
  },
  onLoad () {
    var res = wx.getSystemInfoSync()
    this.winWidth = res.windowWidth
    this.winHeight = res.windowHeight
    this.getTabs()
  }
}
</script>
<style scoped>
  .content {
  box-sizing: border-box;
  height: 100%;
  padding: 100rpx 0;
  /* overflow: auto; */
  -webkit-overflow-scrolling: touch;
}

.swiper-item {
  height: 100%;
  text-align: center;
}

.navbar {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  position: fixed;
  z-index: 500;
  height: 100rpx;
  width: 100%;
  background-color: #298de5;
  border-bottom: 1rpx solid #ccc;
}

.navbar_item {
  position: relative;
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  padding: 26rpx 0;
  text-align: center;
  font-size: 0;
}

.navbar_item .navbar_item_on {
  color: white;
}

.navbar_title {
  color: white;
  font-weight: 500;
  display: inline-block;
  font-size: 30rpx;
  max-width: 8em;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}

.navbar_slider {
  position: absolute;
  content: " ";
  left: 0;
  bottom: 0;
  width: 6em;
  height: 6rpx;
  background-color: white;
  -webkit-transition: -webkit-transform 0.1s;
  transition: -webkit-transform 0.1s;
  transition: transform 0.1s;
  transition: transform 0.1s, -webkit-transform 0.1s;
}

.navbar_slider_0 {
  left: 29rpx;
  transform: translateX(0);
}

.navbar_slider_1 {
  left: 29rpx;
  transform: translateX(250rpx);
}

.navbar_slider_2 {
  left: 29rpx;
  transform: translateX(500rpx);
}
.controls {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  position: fixed;
  z-index: 8888;
  top: 80;
  height: 100rpx;
  width: 100%;
  background-color: #298de5;
}
</style>


  
