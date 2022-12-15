// importamos la conexion a la base de datos klk?
// import db from '../database/db.js';
import mongoose from 'mongoose';

// creamos el esquema de la base de datos
const Schema = mongoose.Schema;

//instanciamos el esquema
const agendaSchema = new Schema(
    {
        nombre: String,
        celular: String,
        correo: String,
        image_url: String,
        cloudinary_id: String,
    },
    {
        collection: 'agenda',
        timestamps: true,
    }
);

export default mongoose.model('agenda', agendaSchema);

// import { DataTypes } from 'sequelize';

// const AgendaModel = db.define('agenda', {
//     nombre: { type: DataTypes.STRING },
//     celular: { type: DataTypes.STRING },
//     correo: { type: DataTypes.STRING },
// })

// export default AgendaModel;