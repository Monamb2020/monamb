const { Client } = require('pg');

async function insertAguaMarina(data, client){
    const res = await client.query("INSERT INTO proyectos_aguamarina(cod_punto_id, temporada_id, profundidad_muestra, estado_id, profundidad_disco_secchi, observaciones) VALUES ($1, $2, $3, $4, $5, $6)", data)
    console.log("response", res.rowCount)
    //await client.end()
    return res;
}
async function selectPunto(idPunto, client) {
    const res = await client.query("SELECT cod_punto_id from proyectos_aguamarina WHERE cod_punto_id = $1", [idPunto])
    console.log("select", idPunto, res.rowCount)
    return res;
}
async function transformation(element, form, client) {
    console.log("excute AM");
    let params3 = [null, null, null, null, null, null];// agua marina
    let preg_1 = element["PREG1"];
    if (preg_1 ==="1"){
        params3[0] = form["INFO_DETALLADA/PUNTOS_N/ID_PUNTO_NUEVO"]
    } else {
        params3[0] = form["INFO_DETALLADA/PUNTOS_E/ID_PUNTO_EXISTENTE"]
    }
    const countPunto = await selectPunto(params3[0], client);
    if (countPunto.rowCount === 0){
        if (form["INFO_DETALLADA/AMARINAS/TEMPORADA"]!==""){
            params3[1] = form["INFO_DETALLADA/AMARINAS/TEMPORADA"]
        }
        if (form["INFO_DETALLADA/AMARINAS/PROF_M"]!==""){
            params3[2] = form["INFO_DETALLADA/AMARINAS/PROF_M"]
        }
        if (form["INFO_DETALLADA/AMARINAS/CONDICIONES_MAR"]!==""){
            params3[3] = form["INFO_DETALLADA/AMARINAS/CONDICIONES_MAR"]
        }
        if (form["INFO_DETALLADA/AMARINAS/DISCO_SECCHI"]!==""){
            params3[4] = form["INFO_DETALLADA/AMARINAS/DISCO_SECCHI"]
        }
        if (form["INFO_DETALLADA/AMARINAS/OBS_MARINA"]!==""){
            params3[5]=form["INFO_DETALLADA/AMARINAS/OBS_MARINA"]
        }
        console.log(JSON.stringify(params3));
        return insertAguaMarina(params3, client);
    }   
}

module.exports = {
    insertAguaMarina: insertAguaMarina,
    transformation: transformation
}