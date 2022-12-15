import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

/*----------  METODOS CRUD MASNA  ----------*/

export const getUsers = async(req, res) => {
    try {
        // extraer solo el id, nombre y correo de los usuarios
        const users = await UserModel.find({}, { _id: 1, nombre: 1, correo: 1 })
        res.status(200).json(users)
    } catch (error) {
        res.json({ mensaje: error })
    }
}

export const registerUser = async(req, res) => {
    // desestructuramos el body masna
    const { nombre, correo, password, confPassword } = req.body
    // validamos que el password y confPassword sean iguales
    if(password !== confPassword) return  res.status(400).json({ mensaje: "Las contraseñas no coinciden mi king" })
    // validamos que el correo no exista
    const user = await UserModel.findOne({ correo })
    
    // si el usuario existe
    if(user) return res.status(400).json({ mensaje: "Ya existe un usuario con este correo uu" }) 

    // encriptamos el password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    try {
        // creamos el usuario
        await UserModel.create({
            nombre,
            correo,
            password: hash
        })
        res.status(201).json({ mensaje: "Usuario registrado correctamente mi king" })
    } catch (error) {
        res.status(400).json({ mensaje: error })
    }
}

export const loginUser = async(req, res) => {
    try {
        // validamos que el correo exista
        const user = await UserModel.findOne({ correo: req.body.correo })
        // si el usuario no existe pues no existe :v
        if(!user) return res.status(400).json({ mensaje: "El usuario no existe, como el amor de ella" }) 

        // validamos que el password sea correcto
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(400).json({ mensaje: "Contraseña incorrecta causa" })
        const userId = user._id
        const nombre = user.nombre
        const correo = user.correo
        // creamos el rico token
        const token = jwt.sign({
            userId,
            nombre,
            correo
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
        // creamos el refresh token masna
        const refreshToken = jwt.sign({
            userId,
            nombre,
            correo
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
        // actualizamos el refresh token en la base de datos
        // await UserModel.update({ refresh_token: refreshToken }, { where: { id: userId } })
        await UserModel.updateOne({ _id: userId }, { refresh_token: refreshToken })
        res.cookie('refreshToken', refreshToken, { 
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        })
        res.json({ token })
    } catch (error) {
        res.status(400).json({ mensaje: error })
    }
}

export const logoutUser = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        // await UserModel.update({ refresh_token: null }, { where: { refresh_token: refreshToken } })
        await UserModel.updateOne({ refresh_token: refreshToken }, { refresh_token: null })
        res.clearCookie('refreshToken')
        res.json({ mensaje: "Sesion cerrada correctamente" })
    } catch (error) {
        res.status(400).json({ mensaje: error })
    }
}