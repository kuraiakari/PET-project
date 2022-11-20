import { Request, Response } from 'express'

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
  getAllProducts(req: Request, res: Response) {
    products.find({}, function (err: any, products: any) {
      if (!err) res.json(products)
    })
  }
  getProduct(req: Request, res: Response) {
    products.find(
      { $or: [{ nameProduct: req.params.nameProduct }, { producer: req.params.nameProduct }] },
      function (err: any, products: Product) {
        if (!err) res.json(products)
      }
    )
  }
}

export default ProductsControllers
