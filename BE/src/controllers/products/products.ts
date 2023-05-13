import { Request, response, Response } from 'express'
import multer from 'multer'
import path from 'path'

import products from '../../database/models/products'
import stores from '../../database/models/stores'
import users from '../../database/models/user'

interface products {
  nameProduct: string
  amountProduct: number
  imageProduct: string
  ratingProduct: number
  priceProduct: number
  promotionProduct: number
  size: string
  typeProduct: string
  categoryProduct: string
  store: string
}

class ProductsControllers {
  getProducts(req: Request, res: Response) {
    let optionProduct = {}
    let optionSortProduct = {}
    if (req.params.category !== 'undefined') {
      optionProduct = { categoryProduct: req.params.category }
    }
    if (req.params.idproduct) {
      optionProduct = {
        _id: req.params.idproduct
      }
    }
    if (req.query.search) {
      optionProduct = {
        $or: [{ nameProduct: req.query.search }, { typeProduct: req.query.search }]
      }
    }
    if (req.query.sorting) {
      if (req.query.sorting === 'rating') optionSortProduct = { ratingProduct: -1 }
      if (req.query.sorting === 'price') optionSortProduct = { promotionProduct: 1 }
    }
    products
      .find(optionProduct)
      .sort(optionSortProduct)
      .exec(function (err: any, products: any) {
        if (!err) {
          if (products.length > 0) res.json(products)
          else res.json({ messageError: 'NotFound' })
        } else res.json({ messageError: `${err}` })
      })
  }
  create = async (req: any, res: Response) => {
    try {
      let img = ''
      ;(req.files as []).forEach((file) => {
        img += file['path'] + ','
      })
      const dataProduct = {
        ...(req.body as products),
        imageProduct: img,
        totalRating: 0,
        soldProduct: 0,
        lastPriceProduct: req.body.priceProduct - Math.round((req.body.priceProduct * req.body.promotionProduct) / 100)
        //product.priceProduct - Math.round((product.priceProduct * product.promotionProduct) / 100)
        //lam tron
      }
      // console.log(dataProduct.store)
      const handleSave = stores
        .findOne({ nameStore: dataProduct.store, shopOwner: req.user.email })
        .exec(async (err: any, store: any) => {
          if (!store) res.status(500).json({ messageError: 'Not found store' })
          else {
            const data = await products.create(dataProduct)
            await store.listProducts.push(data)
            await stores.updateOne({ nameStore: dataProduct.store }, store)
            res.status(201).json('Create successfully')
          }
        })
    } catch (err) {
      res.status(500).json(err)
    }
  }
  update(req: any, res: Response) {
    let img = ''
    let dataProduct = {
      amountProduct: 0,
      ...req.body
    }
    if (req.files) {
      if (req.files.length > 0) {
        ;(req.files as []).forEach((file) => {
          img += file['path'] + ','
        })
        dataProduct = {
          ...dataProduct,
          imageProduct: img
        }
        // console.log(req.files)
      }
    }
    const handleSave = stores
      .findOne({ nameStore: dataProduct.store, shopOwner: req.user.email })
      .exec(async (err: any, store: any) => {
        if (!store) res.status(404).json({ messageError: 'Not found store' })
        else {
          const createData = await products.findOne({ _id: req.params.id, store: dataProduct.store })
          dataProduct = {
            ...dataProduct,
            amountProduct: Number(createData?.amountProduct) + Number(dataProduct.amountProduct)
          }
          const data = await products.updateOne({ _id: req.params.id, store: dataProduct.store }, dataProduct)
          if (!data.matchedCount) res.status(404).json({ messageError: 'Not found product' })
          else {
            const productList = await products.findOne({ _id: req.params.id })
            await store.listProducts.forEach((product: any, index: any) => {
              if (product._id.toString() === req.params.id) {
                store.listProducts[index] = productList
              }
            })
            // await store.listProducts.push(data)
            await stores.updateOne({ nameStore: dataProduct.store }, store)
            res.status(201).json('Update successfully')
          }
        }
      })
  }
  async delete(req: any, res: Response) {
    const productList = await products.findOne({ _id: req.params.id })
    if (productList) {
      stores.findOne({ nameStore: productList.store, shopOwner: req.user.email }).exec(async (err: any, store: any) => {
        // console.log(store)
        if (store) {
          products.deleteOne({ _id: req.params.id }, function (err: any, products: any) {
            if (err) res.json({ messageError: 'Delete Failure' })
          })
          await store.listProducts.forEach((product: any, index: any) => {
            if (product._id.toString() === productList._id.toString()) {
              store.listProducts.splice(index, 1)
            }
          })
          await stores.updateOne({ nameStore: productList.store }, store)
          res.status(200).json('Delete successfully')
        } else {
          res.status(404).json('Not found store')
        }
      })
    } else {
      res.status(404).json('Not found product')
    }
  }
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './images/products')
    },
    filename: (req, file, cb) => {
      cb(null, 'product' + Date.now() + path.extname(file.originalname))
    }
  })
  upload = multer({
    storage: this.storage,
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|jfif|webp/
      const mimeType = fileTypes.test(file.mimetype)
      const extname = fileTypes.test(path.extname(file.originalname))

      if (mimeType && extname) {
        return cb(null, true)
      }
      cb(null, true)
    }
  }).array('imageProduct')
  async review(req: any, res: any) {
    try {
      // console.log(req.user._id, req.body)
      const product = await products.findOne({ _id: req.body.idProduct })
      if (product) {
        if (!product.totalRating) product.totalRating = 0
        let checkUserWasReview = false
        product.quantityReview.forEach((review: any) => {
          if (review.userId === req.user._id) {
            checkUserWasReview = true
            product.totalRating = Number(product.totalRating) - review.rating
            review.rating = req.body.rating
            product.totalRating += req.body.rating
            product.ratingProduct = Number((product.totalRating / product.quantityReview.length).toFixed(1))
          }
        })
        if (!checkUserWasReview) {
          const data = {
            userId: req.user._id,
            rating: req.body.rating
          }
          product.totalRating += req.body.rating
          product.quantityReview.push(data)
          product.ratingProduct = Number((product.totalRating / product.quantityReview.length).toFixed(1))
        }
        if (req.body.comment) {
          const user = await users.findOne({ _id: req.user._id })
          if (user) {
            const avatar = user.avatar
            const date = new Date()
            const data = {
              date,
              user: avatar,
              comment: req.body.comment
            }
            product.comments.push(data)
          }
        }
        const dataUpdate = await products.updateOne({ _id: req.body.idProduct }, product)
        res.status(201).json('Update successfully')
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export default ProductsControllers
