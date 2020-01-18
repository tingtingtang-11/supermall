import {debounce} from "./utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 进行防抖 图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh(), 50)

    this.itemImgListener = () => {
      refresh()
    }

    // 监听图片加载完毕
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}