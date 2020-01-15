<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar {
    /*四个格子均分*/
    display: flex;
    background-color: #f6f6f6;

    position: fixed;     /*让tabbar到下面去*/
    left: 0;
    right: 0;
    bottom: 0;

    box-shadow: 0 -1px 1px rgba(100,100,100,.1);
  }



</style>
