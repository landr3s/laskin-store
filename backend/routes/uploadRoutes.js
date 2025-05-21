import path from 'path'
import multer from 'multer'
import { Router } from 'express'

const router = Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname)
    cb(null, `${file.fieldname}-${Date.now()}${extname}`)
  }
})

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpe?g|png|webp/
  const mimeTypes = /image\/jpe?g|image\/png|image\/webp/
  const fileType = path.extname(file.originalname).toLowerCase()
  const mimeType = file.mimetype
  if (fileTypes.test(fileType) && mimeTypes.test(mimeType)) {
    cb(null, true)
  } else {
    cb(new Error('Only images'), false)
  }
}

const upload = multer({ storage, fileFilter })
const uploadSingleImage = upload.single('image')

router.post('/', (req, res) => {
  uploadSingleImage(req, res, err => {
    if (err) {
      res.status(400).send({ message: err.message })
    } else if (req.file) {
      res.status(200).send({
        message: 'Image uploaded successfully',
        image: `/${req.file.path}`
      })
    } else {
      res.status(400).send({ message: 'Not image' })
    }
  })
})

export default router
