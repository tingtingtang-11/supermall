<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info  v-if="goods"  :goods="goods"></detail-base-info>
      <detail-shop-info v-if="shop" :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "components/content/goods/GoodsList";

  import Scroll from "components/common/scroll/Scroll";

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
  import {debounce} from "common/utils";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      Scroll,
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        itemImgListener: null,
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

        // 4.保存商品详情信息
        this.detailInfo = data.detailInfo

        // 5.获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6. 取出评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
          console.log(this.commentInfo);
        }
      })

      // 3. 请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
        console.log(res);
      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      },
    },
    mounted() {
      // 进行防抖 图片加载完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh(), 50)

      this.itemImgListener = () => {
        refresh()
      }

      // 监听图片加载完毕
      this.$bus.$on('itemImgLoad', this.itemImgListener)
    },
    // 这边取消的位置和home的不一样
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
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
    z-index: 10;
    background-color: #fff;
  }

</style>