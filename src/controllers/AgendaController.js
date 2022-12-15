// Importando el modelo de Agenda
import AgendaModel from "../models/AgendaModel.js";
import cloudinary from "../helpers/cloudinary.js";

/*----------  METODOS CRUD MASNA  ----------*/

// Metodo para listar todos los contactos
export const getContactos = async (req, res) => {
    try {
        const contactos = await AgendaModel.find();
        res.status(200).json(contactos)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// Metodo para listar un contacto
export const getContacto = async (req, res) => {
    const id = req.params.id;
    try {
        const contacto = await AgendaModel.findById(id);
        res.status(200).json(contacto)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// Metodo para crear un contacto con imagen a cloduinary
export const createContacto = async (req, res) => {
    const { nombre, celular, correo } = req.body;
    try {
        // const result = await cloudinary.uploader.upload(req.files.image.tempFilePath);
        const result = await cloudinary.uploader.upload(req.file.path);
        const newContacto = new AgendaModel({
            nombre,
            celular,
            correo,
            image_url: result.secure_url,
            cloudinary_id: result.public_id
        });
        await newContacto.save();
        res.status(201).json(newContacto);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

// Metodo para actualizar un contacto con imagen a cloduinary
export const updateContacto = async (req, res) => {
    // const id = req.params.id;
    // const contacto = req.body;
    // try {
    //     await AgendaModel.updateOne({ _id: id }, contacto )
    //     res.status(200).json({ 
    //         message: "Contacto actualizado correctamente" 
    //     })
    // } catch (error) {
    //     res.json({ message: error.message })
    // }
    const id = req.params.id;
    const { nombre, celular, correo } = req.body;
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const contacto = await AgendaModel.findById(id);
        await cloudinary.uploader.destroy(contacto.cloudinary_id);
        const updatedContacto = await AgendaModel.updateOne({ _id: id }, {
            nombre,
            celular,
            correo,
            image_url: result.secure_url,
            cloudinary_id: result.public_id
        });
        res.status(200).json(updatedContacto);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Metodo para eliminar un contacto y su imagen de cloudinary
export const deleteContacto = async (req, res) => {
    const id = req.params.id;
    try {
        const contacto = await AgendaModel.findById(id);
        await cloudinary.uploader.destroy(contacto.cloudinary_id);
        await AgendaModel.deleteOne({ _id: id });
        res.status(200).json({ message: "Contacto eliminado correctamente mi king" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}