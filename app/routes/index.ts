import { Router } from 'express'

import produtRoutes from './product'
import cartRoutes from './cart';

const router = Router()

router.use('/product', produtRoutes)
router.use('/cart', cartRoutes)

export default router