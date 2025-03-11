import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import logger from '@/logger.js'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/uploads/avatar', (req, res) => {
  res.json({
    message: 'Oke'
  })
})

app.post('/uploads/avatar', async (req, res) => {
  console.log(req.files, req.file)

  // try {
  //   const file = req.files // Lấy file từ form-data
  //   const result = await cloudinary.uploader.upload(file.path)
  //   res.json({ message: 'Upload successful', url: result.secure_url })
  // } catch (error) {
  //   res.status(500).json({ error: error.message })
  // }
})

app.listen(3005, () => {
  logger.info('Connect server port: ' + 3005)
})
