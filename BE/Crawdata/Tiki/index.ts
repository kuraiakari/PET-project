import axios from 'axios'
const GetDataFromTiki = axios.create({
  baseURL: 'https://tiki.vn/',
  timeout: 10000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
})
import products from '../../src/database/models/products'
import stores from '../../src/database/models/stores'
import { databaseConnectionMongoDB } from '../../src/database'
const getData = async () => {
  await databaseConnectionMongoDB()
  const formApi = (index: number) => {
    return `api/personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&category=1846&page=${index}&sort=default&urlKey=laptop-may-vi-tinh-linh-kien`
  }
  //   const data = await products.deleteMany({ categoryProduct: 'Laptop' })
  //   console.log(data)
  const listProducts = []
  for (let index = 1; index <= 50; index++) {
    const data = await GetDataFromTiki.get(formApi(index))
    data.data.data.forEach(async (element: any) => {
      if (!element.quantity_sold) return
      const product = {
        nameProduct: element.name,
        amountProduct: 100,
        soldProduct: element.quantity_sold.value || 0,
        imageProduct: element.thumbnail_url,
        ratingProduct: element.rating_average || 0,
        totalRating: 0,
        quantityReview: [],
        comments: [],
        priceProduct: element.original_price,
        couponProduct: [],
        promotionProduct: element.discount_rate || 0,
        lastPriceProduct: element.discount || element.original_price,
        descriptionProduct: element.short_description,
        typeProduct: element.visible_impression_info.amplitude.primary_category_name,
        categoryProduct: 'Laptop',
        store: 'Read Online'
      }
      listProducts.push(product)
      // const store = await stores.findOne({ nameStore: product.store })
      // if (store) {
      //   const data = await products.create(product)
      //   if (data) {
      //     store.listProducts.push(product)
      //     await stores.updateOne({ nameStore: product.store }, store)
      //   }
      // }
    })
  }
  console.log('Done', listProducts.length)
}

getData()
