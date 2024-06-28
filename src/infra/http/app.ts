import '@/infra/adapters'
import 'express-async-errors'
import express from 'express'

import { errorHandler } from './middlewares/error-handler'
import { routes } from './routes'

export const app = express()

app.use(express.json())

app.use('/images', express.static('tmp'))
app.use(routes)
app.use(errorHandler)
