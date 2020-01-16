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
      })

      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })
    },
    methods: {
      scrollTo(x, y, time=500) {
        this.scroll.scrollTo(x, y, time)
      }
    }
  }
</script>

<style scoped>

</style>