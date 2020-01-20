<template>
  <div class="cart">
<!--    导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

<!--    商品的列表-->
    <shop-list></shop-list>

<!--    底部汇总-->
    <shop-bottom-bar></shop-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import ShopList from "./childComps/ShopList";
  import ShopBottomBar from "./childComps/ShopBottomBar";

  import { mapGetters } from 'vuex'

  export default {
    name: "Shop",
    components: {
      NavBar,
      ShopList,
      ShopBottomBar,
    },
    computed: {
      // 两种语法
      // ...mapGetters(['cartLength'])
      ...mapGetters({
        length: 'cartLength'
      })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
