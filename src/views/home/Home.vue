<template>
  <div id="home">
    <nav-bar class="home-nav">
        <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";

  import {getHomeMultiData} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView
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
    .home-nav{
        background-color: var(--color-tint);
        color: #ffffff;
    }

</style>
