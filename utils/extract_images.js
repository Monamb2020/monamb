const axios = require('axios');
var fs = require('fs');

/**
 * Guardar archivo en una ruta especifica 
 * @param {*} path ruta donde se guarda el archivo
 * @param {*} nameFile nombre del archivo
 * @param {*} binary archivo en binario cargado en memoria
 */
async function saveFile(path, nameFile, binary) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    fs.writeFile(path + nameFile, binary, 'binary',
        function (err) {
            if (err) throw err;
            console.log('File saved.', path + nameFile)
        })
}
/**
 * Extrae la imagen de una url dada y la guarda en una ruta especifica
 * @param {*} config parametros de para llamar la url de la imagen
 * @param {*} url_base_image url de la imagen
 * @param {*} path ruta donde se almacena la imagen
 * @param {*} nameFile nombre de la imagen
 */
async function getImage(config, url_base_image, path, nameFile) {
    config.responseType = 'arraybuffer';
    axios.get(url_base_image, config)
        .then(res => {
            saveFile(path, nameFile, res.data);
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    getImage: getImage
}