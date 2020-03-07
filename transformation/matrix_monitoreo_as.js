const { Client } = require('pg');

async function insertAguaSubterranea(data, client){
    const res = await client.query("INSERT INTO proyectos_aguasubterranea(cod_punto_id, tipo_id, diametro_perforacion, profundidad, condicion_id, nivel_estatico, nivel_piezometrico, observaciones) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", data)
    console.log("response", res.rowCount)
    return res;
}
async function selectPunto(idPunto, client) {
    const res = await client.query("SELECT cod_punto_id from proyectos_aguasubterranea WHERE cod_punto_id = $1", [idPunto])
    console.log("select", idPunto, res.rowCount)
    return res;
}
async function transformation(element, form, client) {
    console.log("excute as");
    let params4 = [null, null, null, null, null, null, null, null]; //agua subterranea
    let preg_1 = element["PREG1"]
    if (preg_1 ==="1"){
        params4[0] = form["INFO_DETALLADA/PUNTOS_N/ID_PUNTO_NUEVO"]
    } else {
        params4[0] = form["INFO_DETALLADA/PUNTOS_E/ID_PUNTO_EXISTENTE"]
    }
    const countPunto = await selectPunto(params4[0], client);
    if (countPunto.rowCount === 0){
        if (form["INFO_DETALLADA/ASUB/TIPO_ASUB"]!==""){
            params4[1] = form["INFO_DETALLADA/ASUB/TIPO_ASUB"]
        }
        if (form["INFO_DETALLADA/ASUB/DIAMETRO"]!==""){
            params4[2] = form["INFO_DETALLADA/ASUB/DIAMETRO"]
        }
        if (form["INFO_DETALLADA/ASUB/PROFUNDIDAD_ASUB"]!==""){
            params4[3] = form["INFO_DETALLADA/ASUB/PROFUNDIDAD_ASUB"]
        }
        if (form["INFO_DETALLADA/ASUB/CONDICION"]!==""){
            params4[4] = form["INFO_DETALLADA/ASUB/CONDICION"]
        }
        if (form["INFO_DETALLADA/ASUB/N_ESTATICO"]!==""){
            params4[5] = form["INFO_DETALLADA/ASUB/N_ESTATICO"]
        }
        if (form["INFO_DETALLADA/ASUB/N_PIEZOMETRICO"]!==""){
            params4[6] = form["INFO_DETALLADA/ASUB/N_PIEZOMETRICO"]
        }
        if (form["INFO_DETALLADA/ASUB/OBS_ASUB"]!==""){
            params4[7] = form["INFO_DETALLADA/ASUB/OBS_ASUB"]
        }
        console.log(JSON.stringify(params4));
        return insertAguaSubterranea(params4, client);
    }  
}

module.exports = {
    insertAguaSubterranea: insertAguaSubterranea,
    transformation: transformation
}