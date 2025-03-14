import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'
import helmet from 'helmet'
import compression from 'compression'
import router from '@/v1/routers/index.js'
import { handleUploadError } from '@/v1/middleware/errorHandler.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

app.use('/api/v1', router)

app.use(handleUploadError)

export default app
