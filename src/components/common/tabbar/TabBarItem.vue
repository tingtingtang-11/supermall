<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div v-bind:style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red',
      }
    },
    data() {
      return {
        // 这边不能写死，不然对应图片一直处于活跃状态
        // isActive: true
      }
    },
    computed: {
      isActive() {
        // 判断当前处于活跃状态的path包不包含我现在的path
        // indexOf == -1 表示没有找到
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    /*图片和文字之间有三个像素 通过以下代码去掉*/
    vertical-align: middle;

    margin-bottom: 2px;
  }

  /*这边写死了 活跃状态下文字的颜色*/
  /*原本是v-bind绑定了一个class*/
  /*.active {*/
  /*  color: red;*/
  /*}*/

</style>
