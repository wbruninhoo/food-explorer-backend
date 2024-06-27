import { Router } from 'express'

import { accountsRoutes } from '../controllers/accounts/routes'
import { categoriesRoutes } from '../controllers/categories/routes'

export const routes = Router()

routes.use(accountsRoutes)
routes.use('/categories', categoriesRoutes)
