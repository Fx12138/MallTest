import { request } from "./request";

//轮播图
export function getHomeMul() {
  return request({
    url: '/home/swiperdata'
  })
}

//推荐
export function getRecommend() {
  return request({
    url: '/home/catitems'
  })
}

//商品
export function getGoods(cat_id, pagenum) {
  return request({
    url: '/goods/search',
    params: {
      cat_id,
      pagenum
    }
  })
}

//全部商品
export function getAllGoods() {
  return request({
    url: '/goods/search'
  })
}

export function getGoodsById(goodsId) {
  return request({
    url: '/goods/detail',
    params: {
      goods_id: goodsId
    }
  })
}
