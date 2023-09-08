import { Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import xlsx from 'node-xlsx'

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
  // async addNewField(req: any, res: any) {
  //   await products.updateMany({}, { $set: { couponProduct: [] } })
  //   res.json('Create success')
  // }
  async getProducts(req: Request, res: Response) {
    // const test = await products.find({})
    // console.log(test)
    let optionProduct = {}
    let optionSortProduct = {}
    if (req.params.category !== undefined && req.params.category !== 'undefined') {
      optionProduct = { categoryProduct: req.params.category }
    }
    if (req.params.idproduct) {
      optionProduct = {
        _id: req.params.idproduct
      }
    }
    if (req.query.search) {
      optionProduct = {
        ...optionProduct,
        $or: [{ nameProduct: req.query.search }, { typeProduct: req.query.search }]
      }
    }
    if (req.query.sorting) {
      if (req.query.sorting === 'rating') optionSortProduct = { ratingProduct: 1 }
      if (req.query.sorting === 'price') optionSortProduct = { promotionProduct: 1 }
    }
    products
      .find(optionProduct)
      .sort(optionSortProduct)
      .exec(function (err: any, products: any) {
        if (!err) {
          if (products.length > 0) res.json(products)
          else res.json({ messageError: 'Not Found' })
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
        .findOne({ nameStore: dataProduct.store, shopOwner: req.user._id })
        .exec(async (err: any, store: any) => {
          // console.log(store)
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
  updateInforProduct(req: any, res: Response) {
    let img = ''
    let dataProduct = {
      amountProduct: 0,
      ...req.body
    }
    // console.log(dataProduct)
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
      .findOne({ nameStore: dataProduct.store, shopOwner: req.user._id })
      .exec(async (err: any, store: any) => {
        console.log(store)
        if (!store) res.status(404).json({ messageError: 'Not found store' })
        else {
          const createData = await products.findOne({ _id: req.params.id, store: dataProduct.store })
          // console.log(Number(createData?.amountProduct))
          if (createData) {
            dataProduct = {
              ...dataProduct,
              amountProduct: Number(createData?.amountProduct) + Number(dataProduct.amountProduct)
            }
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
      stores.findOne({ nameStore: productList.store, shopOwner: req.user._id }).exec(async (err: any, store: any) => {
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
  storageFile = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const fileTypes = /xlsx/
      const mimeType = fileTypes.test(file.mimetype)
      const extname = fileTypes.test(path.extname(file.originalname))

      if (mimeType && extname) {
        return cb(null, Date.now() + '-' + file.originalname)
      }
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
  uploadFile = multer({
    storage: this.storageFile,
    fileFilter: (req, file, cb: any) => {
      const ext = path.extname(file.originalname)
      if (ext !== '.xlsx') {
        return cb('Không phải file xlsx', false)
      } else cb(null, true)
    }
  }).single('code')
  async review(req: any, res: any) {
    try {
      // console.log(req.user._id, req.body)
      const product = await products.findOne({ _id: req.body.idProduct })
      if (product) {
        if (!product.totalRating) product.totalRating = 0
        let checkUserWasReview = false
        //kiểm tra review đã được đánh giá hay chưa
        product.quantityReview.forEach((review: any) => {
          if (review.userId === req.user._id) {
            checkUserWasReview = true
            // nếu đã đánh giá tiến hành cập nhập lại điểm, ( - cũ , + mới ra tính trung bình)
            product.totalRating = Number(product.totalRating) - review.rating
            review.rating = req.body.rating
            product.totalRating += req.body.rating
            product.ratingProduct = Number((product.totalRating / product.quantityReview.length).toFixed(1))
          }
        })
        //sau khi hết vòng lặp không tìm thấy, nhận định đánh giá mới.
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
            const fullName =
              user.firstName && user.lastName
                ? user.firstName.charAt(0).toUpperCase() +
                  user.firstName.slice(1) +
                  ' ' +
                  user.lastName.charAt(0).toUpperCase() +
                  user.lastName.slice(1)
                : 'User'
            const avatar = user.avatar
            const data = {
              user: fullName,
              avatar,
              rating: req.body.rating,
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

  async UpdateCouponProduct(req: any, res: any) {
    if (req.file) {
      const product = await products.findOne({ _id: req.params.id })
      if (!product) {
        res.json('Cant found product')
        return
      }
      const store = await stores.findOne({ nameStore: product.store })
      if (!store) {
        res.json('Cant found store')
        return
      }
      if (store.shopOwner !== req.user._id) {
        res.json('Cant authenzition')
        return
      }
      const obj = xlsx.parse('./uploads/' + req.file.filename)
      const couponProduct = []
      for (var i = 0; i < obj.length; i++) {
        var sheet = obj[i]
        //loop through all rows in the sheet
        for (var j = 1; j < sheet['data'].length; j++) {
          //add the row to the rows array
          const [code_sale, value, time, state] = sheet['data'][j]
          couponProduct.push({
            code_sale,
            value,
            time,
            state
          })
        }
      }
      couponProduct.push(...product.couponProduct)
      const dataUpdate = { couponProduct }
      await products.updateOne({ _id: req.params.id }, dataUpdate)
      res.json('Update success')
    }
  }
  async postCoupon(req: any, res: any) {
    const nowDate = new Date()
    // console.log(req.params.id, req.body.code_sale)
    const product = await products.findOne({ _id: req.params.id })
    const result = product?.couponProduct.findIndex((code: any) => code.code_sale === req.body.code_sale)
    if (result === -1) {
      res.json('Code sai')
      return
    } else if (result) {
      const date = new Date(product?.couponProduct[result].time.split('/').reverse().join('-') + 'T00:00:00')
      if (date < nowDate) {
        res.json('Code het han')
        return
      } else {
        if (product?.couponProduct[result].state === 'da su dung') {
          res.json('Code da su dung')
        } else {
          res.json(product?.couponProduct[result])
        }
      }
    } else {
      res.json('co loi')
    }
  }
}

export default ProductsControllers
