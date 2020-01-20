<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <shop-list-item v-for="(item, index) in cartList"
                      :key="index"
                      :item-info="item"></shop-list-item>
    </scroll>
  </div>
  
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  import ShopListItem from "./ShopListItem";

  import  { mapGetters } from 'vuex'

  export default {
    name: "ShopList",
    components: {
      Scroll,
      ShopListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px);

  }

  .content {
    height: 100%;
    overflow: hidden;
  }

</style>