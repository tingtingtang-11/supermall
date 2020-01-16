<template>
  <div id="home">
    <nav-bar class="home-nav">
        <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"></tab-control>
    <GoodsLIst :goods="showGoods"></GoodsLIst>

  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsLIst from "components/content/goods/GoodsLIst";

  import {getHomeMultiData, getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsLIst,
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
    methods: {
      /**
       * 事件监听相关的方法
       */
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

      /**
       * 网络请求相关的方法
       */
      getHomeMultiData(){
        // getHomeMultiData()表示调用方法
        getHomeMultiData().then(res =>{
          // console.log(res);
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
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
  }

  .home-nav{
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

  .tab-control{
  /*  吸顶功能*/
    position: sticky;
    top: 44px;
    background-color: #ffffff;
    z-index: 9;
  }

</style>
