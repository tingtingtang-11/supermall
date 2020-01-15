<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="blue">
      <img slot="item-icon" src="~assets/img/tabbar/home.jpg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home-active.jpg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/chart" activeColor="blue">
      <img slot="item-icon" src="~assets/img/tabbar/chart.jpg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/chart-active.jpg" alt="">
      <div slot="item-text">聊天</div>
    </tab-bar-item>
    <tab-bar-item path="/shop" activeColor="blue">
      <img slot="item-icon" src="~assets/img/tabbar/shop.jpg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/shop-active.jpg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="blue">
      <img slot="item-icon" src="~assets/img/tabbar/profile.jpg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile-active.jpg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "components/common/tabbar/TabBar";
  import TabBarItem from "components/common/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem,
    }
  }
</script>

<style scoped>

</style>
