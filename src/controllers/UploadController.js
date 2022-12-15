
export const cargarArchivo = async(req, res) => {
    // try {
    //     if (!req.files || Object.keys(req.files).length === 0) {
    //         return res.status(400).json({ message: 'No se ha seleccionado ningun archivo' })
    //     }
    //     const { archivo } = req.files;
    //     const nombreCortado = archivo.name.split('.');
    //     const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    //     const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    //     if (!extensionesValidas.includes(extensionArchivo)) {
    //         return res.status(400).json({ message: 'No es una extension permitida' })
    //     }
    //     const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
    //     const path = `./uploads/${nombreArchivo}`;
    //     archivo.mv(path, (err) => {
    //         if (err) {
    //             console.log(err);
    //             return res.status(500).json({ message: 'Error al mover el archivo' })
    //         }
    //         res.json({ message: 'Archivo cargado correctamente' })
    //     })
    // } catch (error) {
    //     res.json({ message: error.message })
    // }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No se ha seleccionado ningun archivo' })
    }

    if (!req.files.archivo) {
        return res.status(400).json({ message: 'No se ha seleccionado ningun archivo' })
    }

    
}