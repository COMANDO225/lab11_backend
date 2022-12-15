import Express from 'express';
import { createContacto, deleteContacto, getContacto, getContactos, updateContacto } from '../controllers/AgendaController.js';
const upload = require('../helpers/multer.js');

const router = Express.Router();

// mostrar todos los contactos
router.get('/', getContactos)
// mostrar un contacto
router.get('/:id', getContacto)
// crear un contacto
router.post('/', upload.single('image'), createContacto)
// actualizar un contacto
router.put('/:id', upload.single('image'), updateContacto)
// eliminar un contacto
router.delete('/:id', deleteContacto)

export default router;