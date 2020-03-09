const { Client } = require('pg');
const extract_images = require('./../utils/extract_images');

const url_base_image = "https://kc.kobotoolbox.org/media/original?media_file=monamb%2Fattachments%2Fd651580b8fc2481e889f98f0d519266a%2Fc2e9d796-3d24-4b86-b18f-7d3f3eacef83%2F";
const path="C:/Users/User/Documents/proyecto-node/imgs/";

async function insertImg(data, client){
    const res = await client.query("INSERT INTO laboratorio_fotografia(cod_muestra_id, panoramica, caudal, muestra, recipiente) VALUES ($1, $2, $3, $4, $5)", data)
    console.log("response", res.rowCount)
    return res;
}

async function transformation(element, form, client, config) {
    new Promise( (element, form, client, config) => {

    })
    let params9 = [null, null, null, null, null]; //Fotografia
    params9[0]= form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"];
    let folder = form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"];
    if (form["INFO_DETALLADA/MUESTRA/FOTO_PANORAMICA"] && form["INFO_DETALLADA/MUESTRA/FOTO_PANORAMICA"]!==""){
        params9[1] = form["INFO_DETALLADA/MUESTRA/FOTO_PANORAMICA"];
        let url_img = await searchImage(element, params9[1]);
        await extract_images.getImage(config, url_img, path + folder +"/", params9[1] );
    }
    if (form["INFO_DETALLADA/MUESTRA/FOTO_CAUDAL"] && form["INFO_DETALLADA/MUESTRA/FOTO_CAUDAL"] !== "") {
        params9[2] = form["INFO_DETALLADA/MUESTRA/FOTO_CAUDAL"]
        let url_img = await searchImage(element, params9[2]);
        await extract_images.getImage(config, url_img, path + folder +"/", params9[2] );
    }
    if (form["INFO_DETALLADA/MUESTRA/FOTO_MUESTRA"] && form["INFO_DETALLADA/MUESTRA/FOTO_MUESTRA"]!== "") {
        params9[3] = form["INFO_DETALLADA/MUESTRA/FOTO_MUESTRA"]
        let url_img = await searchImage(element, params9[3]);
        await extract_images.getImage(config, url_img, path + folder +"/", params9[3] );
    }
    if (form["INFO_DETALLADA/MUESTRA/FOTO_RECIPIENTE"] && form["INFO_DETALLADA/MUESTRA/FOTO_RECIPIENTE"] !== "") {
        params9[4] = form["INFO_DETALLADA/MUESTRA/FOTO_RECIPIENTE"]
        let url_img = await searchImage(element, params9[4]);
        await extract_images.getImage(config, url_img, path + folder +"/", params9[4] );
    }

    console.log(JSON.stringify(params9));
    return insertImg(params9, client);
}
/**
 * Buscar url de imagen que coincida con el nombre especificado
 * @param {*} element array con urls de imagenes
 * @param {*} nameImg nombre de la imagen
 */
async function searchImage(element, nameImg){
    let el  = element["_attachments"];
    for(let i = 0;i<el.length;i++){
        if(el[i].download_url.includes(nameImg)){
            return el[i].download_url;
        }
    }
}

module.exports = {
    transformation: transformation
}