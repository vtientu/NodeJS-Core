import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 //5MB
  },
  fileFilter: (_, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Không hỗ trợ định dạng file upload!'))
    }
  }
})

export const singleUploadImage = upload.single('avatar')
