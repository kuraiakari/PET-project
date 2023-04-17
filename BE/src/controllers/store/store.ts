import { Request, Response } from 'express'
import multer from 'multer'
import path from 'path'

import users from '../../database/models/user'
import stores from '../../database/models/stores'
import products from '../../database/models/products'

class StoreControllers {
  getAll(req: Request, res: Response) {
    stores.find({}).exec(function (err: any, store: any) {
      if (!err) res.json(store)
      else res.json(err)
    })
  }
  getStore(req: Request, res: Response) {
    stores.findOne({ _id: req.params.id }).exec(function (err: any, store: any) {
      if (err) res.status(400).json(err)
      else {
        if (store) res.status(500).json(store)
        else res.status(400).json({ messageError: 'Not found store' })
      }
    })
  }
  async update(req: any, res: Response) {
    let img = ''
    ;(req.files as []).forEach((file) => {
      img += file['path'] + ','
    })
    const dataStore = {
      ...req.body,
      imageStore: img
    }
    const data = await stores.updateOne({ _id: req.params.id, shopOwner: req.user.email }, dataStore)
    if (!data.matchedCount) res.status(404).json({ messageError: 'Not found store' })
    else {
      if (dataStore.nameStore) {
        stores.findOne({ _id: req.params.id }).exec(async (err: any, store: any) => {
          await store.listProducts.forEach(async (item: any, index: any) => {
            products.findOne({ _id: item._id.toString() }).exec(async (err: any, product: any) => {
              // console.log(product.store)
              product.store = dataStore.nameStore
              await products.updateOne({ _id: item._id.toString() }, product)
            })
            store.listProducts[index].store = dataStore.nameStore
          })
          await stores.updateOne({ _id: req.params.id }, store)
        })
      }
      res.status(200).json('Update successfully')
    }
  }
  delete(req: any, res: Response) {
    stores.findOne({ _id: req.params.id }).exec(async (err: any, store: any) => {
      if (store && store.shopOwner === req.user.email) {
        await store.listProducts.forEach(async (item: any, index: any) => {
          products.deleteOne({ _id: item._id.toString() }, function (err: any, products: any) {
            if (err) res.json({ messageError: 'Delete Failure' })
          })
        })
        await users.findOne({ _id: req.user._id }, async function (err: any, user: any) {
          const index = user.myShop.indexOf(store._id)
          if (index > -1) {
            user.myShop.splice(index, 1)
            users.updateOne({ _id: req.user._id }, user).exec((err: any, user: any) => {
              if (err) res.json({ messageError: 'Other email' })
            })
          }
          else {
            res.json({ messageError: 'Delete Failure' })
          }
        }).clone()
        await store.deleteOne({ _id: req.params.id }, function (err: any, products: any) {
          if (err) res.json({ messageError: 'Delete Failure' })
        })
        res.status(200).json('Delete successfully')
      } else {
        res.status(404).json({ messageError: 'Not found store' })
      }
    })
  }
  create(req: any, res: Response) {
    let img = ''
    ;(req.files as []).forEach((file) => {
      img += file['path'] + ','
    })
    const data = {
      ...req.body,
      imgStore: img,
      shopOwner: req.user.email
    }
    stores.create(data, function (err: any, store: any) {
      if (err) res.json({ messageError: 'Other store name' })
      else {
        users.findOne({ _id: req.user._id }, async function (err: any, user: any) {
          user.myShop.push(store._id)
          users.updateOne({ _id: req.user._id }, user).exec((err: any, user: any) => {
            if (err) res.json({ messageError: 'Other email' })
          })
        })
        res.json(store)
      }
    })
  }
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './images/store')
    },
    filename: (req, file, cb) => {
      cb(null, 'store' + Date.now() + path.extname(file.originalname))
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
  }).array('imgStore', 3)
}

export default StoreControllers
