import { Request, response, Response } from 'express'
import multer from 'multer'
import path from 'path'

import products from '../../database/models/products'
import stores from '../../database/models/stores'

interface products {
  nameProduct: string
  amountProduct: number
  imageProduct: string
  ratingProduct: number
  priceProduct: number
  promotionProduct: number
  size: string
  type: string
  store: string
}

class ProductsControllers {
  getProducts(req: Request, res: Response) {
    let optionProduct = {}
    let optionSortProduct = {}
    if (req.query.name) {
      optionProduct = {
        $or: [{ nameProduct: req.query.name }, { typeProduct: req.query.name }]
      }
    }
    if (req.query.sorting) {
      if (req.query.sorting === 'rating') optionSortProduct = { ratingProduct: -1 }
      if (req.query.sorting === 'price') optionSortProduct = { promotionProduct: -1 }
    }
    if (req.params.id) {
      optionProduct = {
        _id: req.params.id
      }
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
        lastPriceProduct: req.body.priceProduct - (req.body.priceProduct * req.body.promotionProduct) / 100
        //lam tron
      }
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
    ;(req.files as []).forEach((file) => {
      img += file['path'] + ','
    })
    const dataProduct = {
      ...req.body,
      imageProduct: img
    }
    const handleSave = stores
      .findOne({ nameStore: dataProduct.store, shopOwner: req.user.email })
      .exec(async (err: any, store: any) => {
        if (!store) res.status(404).json({ messageError: 'Not found store' })
        else {
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
        console.log(store)
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
      const fileTypes = /jpeg|jpg|png|jfif/
      const mimeType = fileTypes.test(file.mimetype)
      const extname = fileTypes.test(path.extname(file.originalname))

      if (mimeType && extname) {
        return cb(null, true)
      }
      cb(null, true)
    }
  }).array('imageProduct', 3)
}

export default ProductsControllers
