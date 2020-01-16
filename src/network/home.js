import {request} from "./request";

// 首页的网络请求都从这边发出
export function getHomeMultiData() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page,
    }
  })
}