<template>
  <div class="bottom-bar">
    <div class="check-all-content">
      <check-button class="check-all-button" :is-checked="isSelectAll"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate">
      去计算：{{checkLength}}
    </div>

  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "ShopBottomBar",
    components: {
      CheckButton,
    },
    computed: {
      totalPrice() {
        return '¥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        // 如果购物车为空
        if (this.$store.state.cartList.length === 0) return false
        // 1、使用filter
        // return !(this.$store.state.cartList.filter(item => !item.checked).length)
        // 2、使用find
        // return !this.$store.state.cartList.find(item => !item.checked)
        // 3、普通遍历
        for (let item of this.$store.state.cartList){
          if(!item.checked) {
            return false
          }
        }
        return true
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;

    line-height: 40px;

    display: flex;

    font-size: 14px;
  }

  .check-all-content {
    display: flex;
    align-items: center;

    margin-left: 10px;
    width: 70px;
  }

  .check-all-button {
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: orangered;
    color: #fff;
    text-align: center;
  }
</style>