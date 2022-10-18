import express from 'express';

import Product from './product/product'
const router = express.Router();

router.use('/product', Product)

export default router