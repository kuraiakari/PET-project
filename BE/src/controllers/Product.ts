import { Product } from '../model/product'
import multer, { FileFilterCallback } from 'multer'
import path from "path";

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

class ProductController {
    create = async(request: any, response: any) => {
        try {
            let data = {
                ...request.body,
                image: request.file.path.replace(/\\/g, '/')
            }
            console.log(data);
            const product = await Product.create(data)
            response.status(201).send(product)
        } catch (e: any) {
            console.log(e)
        }
    }
    getAll = async(request: any, response: any) => {
        try {
            const data = await Product.findAll()
            response.status(200).send(data)
        } catch (e: any) {
            console.log(e)
        }
    }
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            let path = './images/products'
            cb(null, path)
        },
        filename: (req, file, cb) => {
            cb(null,Date.now()+".jpg");
        }
    })

    upload = multer({
        storage: this.storage,
        limits: {fileSize: 1000000},
        fileFilter: (req, file, cb) => {
            const fileTypes = /jpeg|jpg|png/
            const mimeType = fileTypes.test(file.mimetype)
            const extname = fileTypes.test(path.extname(file.originalname))
        
            if (mimeType && extname) {
                return cb(null, true)
            }
            cb(null, false)
        }
    }).single('image')
}
export default ProductController