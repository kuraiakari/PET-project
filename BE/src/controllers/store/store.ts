import { Request, Response } from 'express'
import multer from 'multer'
import path from 'path'

import stores from '../../database/models/stores'

class StoreControllers {
    getAll(req: Request, res: Response) {
        stores.find({})
      .exec(function (err: any, store: any) {
        if (!err) res.json(store)
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
      imageStore: img
    }
    stores.create(data, function (err: any, store: any) {
      if (err) res.json("Other store name")
      else res.json(store)
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
