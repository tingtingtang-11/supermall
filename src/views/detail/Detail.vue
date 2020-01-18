<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info  v-if="goods"  :goods="goods"></detail-base-info>
      <detail-shop-info v-if="shop" :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";

  import Scroll from "components/common/scroll/Scroll";

  import {getDetail, Goods, Shop} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        const data = res.result
        // 1. 获取顶部轮播图数据
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.获取店铺信息
        this.shop = new Shop(data.shopInfo)
        console.log(this.shop);
      })
    }
  }
</script>

<style scoped>
  #detail {
    /*detail页面盖住下面的导航栏*/
    position: relative;
    z-index: 10;
    background-color: #fff;

    height: 100vh;
  }

  /*Scroll需要指定content高度*/
  .content {
    height: calc(100% - 44px);
  }

  /*滚动时盖住顶部导航栏了 修改*/
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

</style>