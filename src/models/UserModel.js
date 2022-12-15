import db from '../database/db.js';
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        nombre: String,
        correo: String,
        password: String,
        refreshToken: String,
    },
    {collection: 'user'}
);

export default mongoose.model('user', userSchema);

// import { DataTypes } from 'sequelize';

// const UserModel = db.define('user', {
//     nombre: { type: DataTypes.STRING },
//     correo: { type: DataTypes.STRING },
//     password: { type: DataTypes.STRING },
//     refresh_token: { type: DataTypes.TEXT },
// })

// export default UserModel;