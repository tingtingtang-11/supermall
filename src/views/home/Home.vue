<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3"
            @scroll="contentScroll" :pull-up-load="true"
            @pullingUp="loadMore">
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control class="tab-control"
                     :titles="['流行','新款','精选']"
                     @tabClick="tabClick"></tab-control>
        <GoodsLIst :goods="showGoods"></GoodsLIst>
    </scroll>
<!--    监听组件的原生事件 需要写 .native-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsLIst from "components/content/goods/GoodsLIst";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultiData, getHomeGoods} from "network/home";

  import BScroll from 'better-scroll'

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      Scroll,
      TabControl,
      GoodsLIst,
      BackTop,
    },
    data(){
      return{
        // 存储网络请求得到的数据
        // 函数调用 -》 压入函数栈（保存函数调用过程中所有变量）
        // 函数调用结束 -》 弹出函数栈（释放函数中所有变量）
        // 所以需要保存一下数据哦
        // result: null
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: true,
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    // 组件创建完毕 就需要发送网络请求
    created() {
      // 1.请求多个数据
      this.getHomeMultiData()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      // 3. 监听item中图片加载完成
      // 进行防抖
      const refresh = this.debounce(this.$refs.scroll.refresh(), 50)

      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      // 防抖函数
      debounce(func, delay) {
        // timer 记录一下有没有定时器
        let timer = null
        return function (...args) {
          if(timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      },
      tabClick(index) {
        console.log(index)
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick() {
        // 直接访问了scroll组件中的内容
        // 第三个参数是延迟时间
        // this.$refs.scroll.scroll.scrollTo(0,0, 500)
        // 将方法封装到组件中 直接调用
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        this.isShowBackTop = -(position.y) > 1000
      },
      loadMore() {
        this.getHomeGoods(this.currentType)

        this.$refs.scroll.scroll.refresh()
      },

      /**
       * 网络请求相关的方法
       */
      getHomeMultiData(){
        // getHomeMultiData()表示调用方法
        getHomeMultiData().then(res =>{
          // this.result = res;
          // res和result指向同一个对象 即使res被回收 result也有值
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // 将网络请求得到都数组塞到 定义的新数组中 保留数据
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    /*不会被页面中的其他内容撑高*/
    height: 100vh;

    /*scroll用的*/
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;

    /*把顶部nav固定住*/
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    /*  nav又被轮播图盖住了*/
    z-index: 9;
  }

  .tab-control {
  /*  吸顶功能*/
    position: sticky;
    top: 44px;
    background-color: #ffffff;
    z-index: 9;
  }

  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>
