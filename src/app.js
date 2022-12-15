import express from 'express'
import cors from 'cors'
import db from './database/db.js'
import dotenv from 'dotenv'
import agendaRutas from './routes/agendaRoutes.js'
import userRutas from './routes/userRoutes.js'
// import uploadRoute from './routes/uploadRoute.js'
// import fileUpload from 'express-fileupload'

// Empieza lo elegante
const app = express()
dotenv.config()
const port = process.env.PORT || 8000

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(fileUpload({
//     useTempFiles: true,
//     tempFileDir: '/tmp/'
// }))

// Rutas
app.use('/agenda', agendaRutas)
app.use('/user', userRutas)
// app.use('/upload', uploadRoute)

// try {
//     await db.authenticate()
//     console.log("Base de datos conectada")
// } catch (error) {
//     console.log(`Error al conectar la base de datos: ${error}`)
// }

app.get('/', (req, res) => {
    res.send('Bienvenido a mi API')
})

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})