<template>
  <div class="wrapper">
    <ul class="content">
      <li>商品分类1</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类10</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类17</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类20</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类25</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类30</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类35</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类42</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类45</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类50</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类60</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类</li>
      <li>商品分类67</li>
      <li>商品分类68</li>
      <li>商品分类69</li>
      <li>商品分类70</li>
      <li>商品分类</li>
      <li>商品分类72</li>
    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Chart",
    data() {
      return {
        scroll: null
      }
    },
    // 组件被创建之后调用 但是还没有挂载 所以不行
    created() {
      // this.scroll = new BScroll('.wrapper',{
      //
      // })
    },
    mounted() {
      // 最外层里面只能包一层元素（元素里面可以有很多东西）
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
        probeType: 3,
        pullUpLoad: true,
      })

      // 上拉加载更多，用 pullUpload:true
      // 用 pullingUp监听
      this.scroll.on('pullingUp', () => {
        console.log("上拉加载更多");
        // 拉到内容最后一条 就进行加载
        // 可以发送网络请求 请求第二页数据
        // 但是 只能上拉加载一次

        // 发送网络请求，请求更多页的数据
        // 等网络请求完成，并且将新的数据展示出来后
        this.scroll.finishPullUp()
        // 这样才可以进行下一次的上拉加载更多
      })

      // 默认情况下 BScroll是不可以实时监听滚动位置，想要监听，需要在上面传参 probeType
      // 0,1都表示不侦测实时的位置 2：在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测
      // 3：只是是滚动，都侦测
      // 实时监听滚动到什么位置
      this.scroll.on('scroll', (position) => {

      })
    }
  }
</script>

<style scoped>
  .wrapper {
    /* 在高度150的框内 上下滚动*/
    /* 这种滚动在移动端不顺滑 会卡顿*/
    height: 150px;
    background-color: red;

    overflow: hidden;
    /*overflow-y: scroll;*/

  }

</style>
