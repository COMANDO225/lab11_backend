import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await UserModel.findOne({ where: { refresh_token: refreshToken } });
        if(!user) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user.id;
            const nombre = user.nombre;
            const correo = user.correo;
            const token = jwt.sign({
                userId,
                nombre,
                correo
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
            res.json({ token });
        });
    } catch (error) {
        console.log(error);
    }
}