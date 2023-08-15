import { Router } from 'express'

import produtRoutes from './product'

const router = Router()

router.use('/product', produtRoutes)

export default router