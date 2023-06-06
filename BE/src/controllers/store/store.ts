import { Request, Response, response } from 'express'
import multer from 'multer'
import path from 'path'

import users from '../../database/models/user'
import stores from '../../database/models/stores'
import products from '../../database/models/products'

class StoreControllers {
  getAll(req: Request, res: Response) {
    stores.find({}).exec(function (err: any, store: any) {
      if (!err) {
        if (store) res.json(store)
        else res.status(400).json({ messageError: 'Not found store' })
      } else res.json(err)
    })
  }
  getStore(req: Request, res: Response) {
    // console.log(req.params.id, req.body.nameStore)
    stores
      .findOne({ $or: [{ _id: req.params.id }, { nameStore: req.body.nameStore }] })
      .exec(function (err: any, store: any) {
        if (err) res.status(400).json({ messageError: 'Not found store' })
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
    try {
      const data = await stores
        .updateOne({ _id: req.params.id, shopOwner: req.user._id }, dataStore, (err: any, result: any) => {
          if (err) return
        })
        .clone()
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
    } catch (err) {
      res.status(404).json({ messageError: 'Cant update' })
    }
  }
  async delete(req: any, res: Response) {
    await users
      .findOne({ _id: req.user._id }, async function (err: any, user: any) {
        if (!user) {
          res.json('You are not authenticated!')
          return
        } else {
          stores.findOne({ _id: req.params.id }).exec(async (err: any, store: any) => {
            if (store && store.shopOwner === req.user._id) {
              await store.listProducts.forEach(async (item: any, index: any) => {
                await products.deleteOne({ _id: item._id.toString() }, function (err: any, product: any) {
                  if (err) res.json({ messageError: 'Delete Failure' })
                })
              })
              if (user.myShop === store._id.toString()) {
                user.myShop = ''
                users.updateOne({ _id: req.user._id }, user).exec((err: any, user: any) => {
                  if (err) res.json({ messageError: 'Other email' })
                })
              }
              await store.deleteOne({ _id: req.params.id }, function (err: any, products: any) {
                if (err) res.json({ messageError: 'Delete Failure' })
              })
              res.status(200).json('Delete successfully')
            } else {
              res.json('You are not authenticated!')
            }
          })
        }
      })
      .clone()
  }
  create(req: any, res: Response) {
    let img = ''
    ;(req.files as []).forEach((file) => {
      img += file['path'] + ','
    })
    const dataShop = {
      ...req.body,
      imgStore: img,
      shopOwner: req.user._id
    }
    users.findOne({ _id: req.user._id }, async function (err: any, user: any) {
      if (!user) {
        res.json('You are not authenticated!')
        return
      }
      if (!user.myShop) {
        stores.create(dataShop, function (err: any, store: any) {
          if (err) res.json({ messageError: 'Other store name' })
          else {
            user.myShop = store._id
            users.updateOne({ _id: req.user._id }, user).exec((err: any, user: any) => {
              if (err) return res.json({ messageError: 'Have error when create shop' })
            })
            res.json(store)
          }
        })
      } else res.json({ messageError: '1 account have only 1 shop' })
    })
  }
  // async updateAll(req: any, res: Response) {
  //   const data = await stores.find({})
  //   for ( const store of data){
  //     const datauser = await users.findOne({ email: store.shopOwner })
  //     store.shopOwner = datauser?._id.toString()
  //     await stores.updateOne({_id: store._id}, store)
  //   }
  //   // res.json({data})
  // }
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
