import express from 'express'
import cors from 'cors'
import multer from 'multer'
import morgan from 'morgan'
import logger from './logger.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
        cb(null, new Date().toDateString() + "-" + file.originalname);

    },
})

const upload = multer({
    storage,
})

app.post('/uploads/avatar', upload.single('avatar'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: "No file uploaded!"
        })
    }
    logger.info("Upload file successful!")
    return res.status(200).json({
        message: "Upload avatar successful!"
    })
})

app.listen(3000, () => {
    logger.info("Connect server port: " + 3000)
})