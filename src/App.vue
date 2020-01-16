<template>
  <div id="app">
    <router-view></router-view>
    <MainTabBar class="main-tab-bar"></MainTabBar>
  </div>
</template>

<script>
    import MainTabBar from "components/content/mainTabbar/MainTabBar";

    export default {
      name: 'app',
      components: {
        MainTabBar
      }
    }
</script>

<style>
  @import "assets/css/base.css";
  .main-tab-bar{
    position: absolute;
    z-index: 9;
  }

</style>
