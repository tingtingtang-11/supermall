<template>
  <div class="tab-control">
<!--    只是文字不一样的时候 没必要弄插槽-->
<!--    这边只用props传文字内容-->
    <div v-for="(item,index) in titles"
         class="tab-control-item" :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0,
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
      //  内部数据往外面传送
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
  }

  .tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
  }

  .tab-control-item span{
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span{
    border-bottom: 3px solid var(--color-tint);
  }

</style>