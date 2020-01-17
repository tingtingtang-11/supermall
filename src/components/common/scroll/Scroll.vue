<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      // 通过document.querySelector('.wrapper')获取元素的方式不是很好
      // 可能有其他标签的class也是wrapper
      // 可以通过ref使用
      // ref如果是绑定在组件中的，那么通过this.$refs.refname 获取到的是一个组件对象
      // ref如果是绑定在元素中的，那么通过this.$refs.refname 获取到的是一个元素对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      })

      // 监听滚动的位置
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
      }

      // 监听scroll滚动到底部
      if(this.pullUpLoad){
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }

    },
    methods: {
      scrollTo(x, y, time=500) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>