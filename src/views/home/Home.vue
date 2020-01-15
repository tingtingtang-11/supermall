<template>
  <div id="home">
    <nav-bar class="home-nav">
        <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import {getHomeMultiData} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView
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
      }
    },
    // 组件创建完毕 就需要发送网络请求
    created() {
      // 1.请求多个数据
      // getHomeMultiData()表示调用方法
      getHomeMultiData().then(res =>{
        // console.log(res);
        // this.result = res;
        // res和result指向同一个对象 即使res被回收 result也有值
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
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

</style>
