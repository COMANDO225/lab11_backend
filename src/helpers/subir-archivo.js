import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']) => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        if (!extensionesValidas.includes(extensionArchivo)) {
            return reject(`La extension ${extension} no es permitida - ${extensionesValidas}`);
            // return res.status(400).json({ message: `La extensión ${extensionArchivo} no es permitida, ${extensionesValidas}` })
        }

        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', nombreTemp);

        res.json({ extension })
        archivo.mv(uploadPath, function(err) {
            if (err) {
                return res.status(500).json({err})
            }

            res.json({ message: 'Archivo subido al' + uploadPath })
        });

    })
}