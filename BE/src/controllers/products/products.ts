import { Request, Response } from 'express'
import multer from 'multer'
import path from 'path'

import products from '../../database/models/products'

interface Product {
  nameProduct: String
  amountProduct: Number
  imageProduct: String
  ratingProduct: Number
  priceProduct: Number
  promotionProduct: Number
  size: String
  type: String
  producer: String
}

class ProductsControllers {
  getProducts(req: Request, res: Response) {
    let optionProduct = {}
    let optionSortProduct = {}
    console.log(req.query)
    if (req.query.name ) {
      optionProduct = {
        $or: [{ nameProduct: req.query.name }, { producer: req.query.name }]
      }
    }
    if ( req.query.sorting ) {
      if ( req.query.sorting === 'rating' ) optionSortProduct = { ratingProduct: -1 }
      if ( req.query.sorting === 'price' ) optionSortProduct = { priceProduct: 1 }
    }
    products
      .find(optionProduct)
      .sort(optionSortProduct)
      .exec(function (err: any, products: any) {
        if (!err) res.json(products)
        else res.json(err)
      })
  }
  create(req: Request, res: Response) {
    let img = ''
    ;(req.files as []).forEach((file) => {
      img += file['path'] + ','
    })
    const data = {
      ...req.body,
      imageProduct: img
    }
    products.create(data, function (err: any, products: any) {
      if (err) res.json(err)
      else res.json(products)
    })
  }
  update(req: Request, res: Response) {
    products.updateOne({_id: req.params.id}, req.body, function (err: any, products: any) {
      if (err) res.json(err)
      else res.json(products)
    })
  }
  delete(req: Request, res: Response) {
    products.deleteOne({_id: req.params.id}, function (err: any, products: any) {
      if(!err) res.json("Delete Success")
      else res.json("Delete Failure")
    })
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
