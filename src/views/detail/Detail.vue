<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info  v-if="goods"  :goods="goods"></detail-base-info>
      <detail-shop-info v-if="shop" :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-buttom-bar @addCart="addToCart"></detail-buttom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
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
  import DetailButtomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
  import {itemListenerMixin, backTopMixin} from "common/mixin";

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
      DetailButtomBar,
      Scroll,
    },
    mixins: [itemListenerMixin, backTopMixin],
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
        // itemImgListener: null,
        // 每个主题的顶部位置
        themeTopYs: [],
        currentIndex: 0,
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

        // this.$nextTick(() => {
        //   // 根据最新的数据，对应的DOM是已经被渲染出来了
        //   // 但是图片还没有加载完(offsetTop是不包含图片的)
        //   // offsetTop值不对的时候，都是因为图片的问题
        //   this.themeTopYs = []
        //
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //
        //   console.log(this.themeTopYs);
        // })
      })

      // 3. 请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    methods: {
      imageLoad() {
        // this.$refs.scroll.refresh()
        this.refresh()

        this.themeTopYs = []

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // push进一个很大的值
        this.themeTopYs.push(Number.MAX_VALUE)
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) {
        // 1.获取y值
        const positionY = -position.y

        let length = this.themeTopYs.length
        // 2.positionY和主题中的值进行对比
        // 根据当前滚动的位置改变导航栏的主题

        // for(let i = 0; i < length; i++){
        //   // 这样做 最后一种情况越界了
        //   // if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
        //   //   console.log(i)
        //   // }
        //   if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ||
        //     (i === length - 1 && positionY >= this.themeTopYs[i]))){
        //     this.currentIndex = i
        //     this.$refs.nav.currentIndex = this.currentIndex
        //   }
        // }
        for(let i = 0; i < length-1; i++){
          if(this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        // 3.是否显示回到顶部
        this.isShowBackTop = -(position.y) > 1000
      },
      addToCart() {
        // 1.获取购物车需要展示的信息
        const product = {}
        product.img = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        product.count = 1

        // 2.将商品添加到购物车里
        // 不要这么做，对store中状态的修改要通过mutation
        // this.$store.cartList.push(product)
        // 直接通过mutation
        // this.$store.commit('addCart', product)
        this.$store.dispatch('addCart', product)
      },
    },
    mounted() {

    },
    updated() {

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
    height: calc(100% - 44px - 58px);
  }

  /*滚动时盖住顶部导航栏了 修改*/
  .detail-nav {
    position: relative;
    z-index: 10;
    background-color: #fff;
  }

</style>