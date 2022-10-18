import express from 'express';

import ProductController from "../../controllers/Product";

const router = express.Router();
const upload = require('multer')()

const controller = new ProductController()

router.post(
    '/',
    controller.upload,
    controller.create
)
router.get(
    '/',
    controller.getAll
)

export default router