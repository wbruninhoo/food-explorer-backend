import { Router } from 'express'

import { accountsRoutes } from '../controllers/accounts/routes'

export const routes = Router()

routes.use(accountsRoutes)
