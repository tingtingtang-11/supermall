<template>
    <Swiper>
        <swiper-item v-for="item in banners">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imageLoad">
            </a>
        </swiper-item>
    </Swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "components/common/swiper/index"

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return {
        isLoad: false
      }
    },
    methods: {
      imageLoad() {
        if(!this.isLoad){
          // 只要有一张图片加载完毕 就可以撑起高度 没必要发送好几次加载完毕的信号
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>

</style>