import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'
import helmet from 'helmet'
import compression from 'compression'

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

export default app
