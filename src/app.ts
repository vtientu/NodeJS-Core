import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'
import helmet from 'helmet'
import compression from 'compression'
import router from '@routers/index.js'
import { globalErrorHandler, notFoundHandler } from '@middleware/errorHandler.js'
import { apiKey, permission } from '@/v1/auth/authMiddleware.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// app.use(apiKey)
// app.use(permission('0000'))
// checkOverload()

app.use('/api/v1', router)

app.use(notFoundHandler)
app.use(globalErrorHandler)

export default app
