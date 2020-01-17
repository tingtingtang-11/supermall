// 防抖函数
export function debounce(func, delay) {
  // timer 记录一下有没有定时器
  let timer = null
  return function (...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}