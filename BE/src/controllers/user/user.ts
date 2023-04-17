import { Request, Response } from 'express'
import multer from 'multer'
import path from 'path'

import { GenerateSalt, GeneratePassword, ValidatePassword, GenerateSignature } from '../../utils'
import users from '../../database/models/user'
import products from '../../database/models/products'
import stores from '../../database/models/stores'

class UserControllers {
  async create(req: any, res: any) {
    let salt = await GenerateSalt()
    let userPassword = await GeneratePassword(req.body.password, salt)
    let img = ''
    if (req.file) {
      ;(req.files as []).forEach((file) => {
        img += file['path'] + ','
      })
    }
    const data = {
      ...req.body,
      password: userPassword,
      avatar: img,
      salt
    }
    users.create(data, function (err: any, user: any) {
      if (err) res.json({ messageError: 'Other email name' })
      else res.json(user)
    })
  }
  async login(req: Request, res: Response) {
    users.findOne({ email: req.body.email }, async function (err: any, user: any) {
      if (!user) res.json({ messageError: 'Not found user' })
      else {
        const validPassword = await ValidatePassword(req.body.password, user.password, user.salt)
        if (validPassword) {
          const token = await GenerateSignature({ email: user.email, _id: user._id, isAdmin: user.isAdmin })
          res.json({ token: token })
        } else res.json({ messageError: 'Incorrect password' })
      }
    })
  }
  getProfile(req: any, res: any) {
    if (req.user._id) {
      users.findOne({ _id: req.user._id }, (err: any, user: any) => {
        if (user) res.json(user)
        else res.json({ messageError: 'Not found' })
      })
    }
  }
  async updateProfile(req: any, res: any) {
    const dataNew = { ...req.body }
    users.updateOne({ _id: req.user._id }, dataNew).exec((err: any, user: any) => {
      if (err) res.json({ messageError: 'Other email' })
      else {
        if (user.matchedCount) res.json('Update successfully')
      }
    })
  }
  async deleteProfile(req: any, res: any) {
    users.deleteOne({ _id: req.user._id }).exec((err: any, user: any) => {
      if (user.deletedCount === 0) res.json({ messageError: 'Not found' })
      else res.json('Delete successfully')
    })
  }
  async createLikeProduct(req: any, res: any) {
    await products.findOne({ _id: req.body.id_product }, async (err: any, product: any) => {
      if (err) res.json({ messageError: 'Not found product' })
      if (!product) res.json({ messageError: 'Not found product' })
      else {
        users.findOne({ _id: req.user._id }, async function (err: any, user: any) {
          let check = 0
          await user.listLikeProduct.forEach((product: any, index: any) => {
            if (product._id.toString() === req.body.id_product) {
              user.listLikeProduct.splice(index, 1)
              check += 1
            }
          })
          if (check === 0) {
            await user.listLikeProduct.push(product)
            await users.updateOne({ _id: req.user._id }, user)
            res.json('Create like successfully')
          } else res.json({ messageError: 'Create like failed' })
        })
      }
    })
  }
  async deleteLikeProduct(req: any, res: any) {
    users.findOne({ _id: req.user._id }, async function (err: any, user: any) {
      let check = 0
      await user.listLikeProduct.forEach((product: any, index: any) => {
        if (product._id.toString() === req.params.id) {
          user.listLikeProduct.splice(index, 1)
          check += 1
        }
      })
      if (check === 0) res.json({ messageError: 'Not found product' })
      if (check > 0) {
        await users.updateOne({ _id: req.user._id }, user)
        res.json('Delete successfully')
      }
    })
  }
  async createOrder(req: any, res: any) {
    const order = {
      listProducts: []
    }
    const listProducts: any[] = []
    let checkAmount = false
    for (const product of req.body.products) {
      if (!checkAmount) {
        await products
          .findOne({ _id: product.idProduct }, async (err: any, oldProduct: any) => {
            if (oldProduct) {
              if (oldProduct.amountProduct - product.amount >= 0) {
                const data = {
                  productOrder: oldProduct,
                  amountOrder: product.amount
                }
                listProducts.push(data)
                const dataProduct = { ...oldProduct._doc, amountProduct: oldProduct.amountProduct - product.amount }
                const dataTest = await products.updateOne({ _id: product.idProduct }, dataProduct)
                if (!dataTest.matchedCount) {
                  checkAmount = true
                  res.status(404).json({ messageError: 'Not found product' })
                }
                await stores
                  .findOne({ nameStore: dataProduct.store }, async (err: any, store: any) => {
                    // console.log('ban dau:', store)
                    if (!store) {
                      checkAmount = true
                      res.status(404).json({ messageError: 'Not found store' })
                    } else {
                      await store.listProducts.forEach((productStore: any, index: any) => {
                        if (productStore._id.toString() === product.idProduct) {
                          store.listProducts[index] = dataProduct
                        }
                      })
                      // console.log('sau khi:', store)
                      const dataTest1 = await stores.updateOne({ nameStore: dataProduct.store }, store)
                    }
                  })
                  .clone()
                  .catch(function (err) {
                    console.log(err)
                  })
              } else {
                checkAmount = true
              }
            }
          })
          .clone()
          .catch(function (err) {
            console.log(err)
          })
      }
    }
    if (checkAmount) {
      res.json('Not enough products')
      return
    }
    order.listProducts = listProducts as []
    await users
      .findOne({ _id: req.user._id }, async function (err: any, user: any) {
        if (err) console.log(err)
        user.listOrder.push(order)
        await users.updateOne({ _id: req.user._id }, user)
        res.json('Create new order successfully')
      })
      .clone()
      .catch(function (err) {
        console.log(err)
      })
  }
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './images/user')
    },
    filename: (req, file, cb) => {
      cb(null, 'avatar' + Date.now() + path.extname(file.originalname))
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
  }).array('avatar', 1)
}
export default UserControllers
