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
    let img = req.file ? req.file.path : ''
    const data = {
      ...req.body,
      password: userPassword,
      avatar: img,
      salt
    }
    users.create(data, function (err: any, user: any) {
      if (err) res.json({ messageError: 'Email was registered' })
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
          let listLikeProduct: any[] = []
          user.listLikeProduct.forEach((product: any) => {
            listLikeProduct.push(product._id)
          })
          const dataUser = {
            token,
            id: user._id,
            isAdmin: user.isAdmin,
            myShop: user.myShop,
            listLikeProduct
          }
          res.json(dataUser)
        } else res.json({ messageError: 'Incorrect password' })
      }
    })
  }
  getProfile(req: any, res: any) {
    // console.log(req.user)
    if (req.user._id) {
      users.findOne({ _id: req.user._id }, (err: any, user: any) => {
        if (user) res.json(user)
        else res.json({ messageError: 'Not found' })
      })
    }
  }
  async updateProfile(req: any, res: any) {
    // console.log(req)
    let dataNew = { ...req.body }
    if (!!req.file) {
      dataNew = { ...dataNew, avatar: req.file.path }
    }
    // console.log(dataNew)
    users.updateOne({ _id: req.user._id }, dataNew).exec((err: any, user: any) => {
      if (err) res.json({ messageError: 'Email was registered' })
      else {
        if (!user.acknowledged) res.json('Nothing updated')
        else if (user.matchedCount) res.json('Update successfully')
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
    await products
      .findOne({ _id: req.body.id_product }, async (err: any, product: any) => {
        if (err) res.json({ messageError: 'Not found product' })
        if (!product) res.json({ messageError: 'Not found product' })
        else {
          users.findOne({ _id: req.user._id }, async function (err: any, user: any) {
            let check = 0
            //check if the product already exists in the favorites list
            await user.listLikeProduct.forEach(async (product: any, index: any) => {
              if (product._id.toString() === req.body.id_product) {
                // had found
                check += 1
                await user.listLikeProduct.splice(index, 1)
                await users.updateOne({ _id: req.user._id }, user)
                res.json('Delete like successfully')
              }
            })
            if (check === 0) {
              // Ended the search and couldn't find a product that matched the search query.
              await user.listLikeProduct.push(product)
              await users.updateOne({ _id: req.user._id }, user)
              res.json('Create like successfully')
            }
          })
        }
      })
      .clone()
  }
  // async deleteLikeProduct(req: any, res: any) {
  //   users.findOne({ _id: req.user._id }, async function (err: any, user: any) {
  //     let check = 0
  //     await user.listLikeProduct.forEach((product: any, index: any) => {
  //       if (product._id.toString() === req.params.id) {
  //         user.listLikeProduct.splice(index, 1)
  //         check += 1
  //       }
  //     })
  //     if (check === 0) res.json({ messageError: 'Not found product' })
  //     if (check > 0) {
  //       await users.updateOne({ _id: req.user._id }, user)
  //       res.json('Delete successfully')
  //     }
  //   })
  // }
  async createOrder(req: any, res: any) {
    const order = {
      listProducts: []
    }
    const arrayOwnerShop: object[] = []
    const listProducts: any[] = []
    // console.log(req.body)
    //sort product same in listProducts
    const idOfProduct = [...new Set(req.body.products.map((product: any) => product.idProduct))]
    const listProduct = idOfProduct.map((id: any) => {
      let productAns = { idProduct: '', nameProduct: '', imgProduct: '', amount: 0, price: 0 }
      for (const product of req.body.products) {
        if (product.idProduct === id) {
          if (!productAns.idProduct) {
            productAns = { ...product }
          } else productAns.amount += product.amount
        }
      }
      return productAns
    })

    //check sum amount of order with amount of shop. (check before create order)
    for (const product of listProduct) {
      try {
        const data = await products.findOne({ _id: product.idProduct })
        if (data)
          if (product.amount > data?.amountProduct) {
            res.json('Not enough products')
            return
          }
      } catch (err) {
        res.json('Co loi')
        // console.log(err)
      }
    }

    // create order
    for (const product of listProduct) {
      // console.log(product.amount)
      await products
        .findOne({ _id: product.idProduct }, async (err: any, oldProduct: any) => {
          if (oldProduct) {
            const data = {
              productOrder: oldProduct,
              amountOrder: product.amount
            }
            listProducts.push(data)
            const dataProduct = {
              ...oldProduct._doc,
              amountProduct: oldProduct.amountProduct - product.amount,
              soldProduct: oldProduct.soldProduct + product.amount
            }
            await products.updateOne({ _id: product.idProduct }, dataProduct)
            const store = await stores
              .findOne({ nameStore: dataProduct.store }, async (err: any, store: any) => {
                // console.log('ban dau:', store)
                if (data) {
                  const inforOrder = {
                    idOwner: store.shopOwner.toString(),
                    nameProduct: oldProduct.nameProduct,
                    amount: product.amount
                  }
                  arrayOwnerShop.push(inforOrder)
                }
                if (!store) {
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
          }
        })
        .clone()
        .catch(function (err) {
          console.log(err)
        })
    }
    Promise.all(arrayOwnerShop).then(async () => {
      order.listProducts = listProducts as []
      users
        .findOne({ _id: req.user._id }, async function (err: any, user: any) {
          if (err) console.log(err)
          user.listProductWasBuy = [...new Set([...user.listProductWasBuy, ...idOfProduct])]
          user.listOrder.push(order)
          await users.updateOne({ _id: req.user._id }, user)

          const dataReturn = {
            messageSuccess: 'Create new order successfully',
            arrayOwnerShop: arrayOwnerShop
          }
          // console.log(dataReturn)
          res.json(dataReturn)
        })
        .clone()
        .catch(function (err) {
          console.log(err)
        })
    })
  }
  async checkWasBuy(req: any, res: any) {
    try {
      const data = await users.findOne({ _id: req.user._id })
      if (data) {
        const index = data.listProductWasBuy.indexOf(req.body.idProduct)
        if (index > -1) {
          res.json('Was buy product')
        } else {
          res.json('Not was buy product')
        }
      }
    } catch (err) {
      console.log(err)
    }
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
      // console.log(file)
      const fileTypes = /jpeg|jpg|png|jfif/
      const mimeType = fileTypes.test(file.mimetype)
      const extname = fileTypes.test(path.extname(file.originalname))

      if (mimeType && extname) {
        return cb(null, true)
      }
      cb(null, true)
    }
  }).single('avatar')
}
export default UserControllers
