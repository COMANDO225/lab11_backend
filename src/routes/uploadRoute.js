import express from 'express'
import { cargarArchivo } from '../controllers/UploadController'

const router = express.Router()

router.post('/', cargarArchivo)

export default router
