const { Client } = require('pg');

async function insertPunto(data, client) {
    console.log("insertPunto");
    const res = await client.query("INSERT INTO home_punto(codigo, identificacion, proyecto_id, autoridad_ambiental_id, planta_id, vereda, municipio_id, departamento_id, latitud, longitud, altura, categoria_id, tipo_fu_sup_id, nombre_fu_sup, tipo_caudal_id, observaciones) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)", data)
    console.log("response", res.rowCount)
    //await client.end()
    return res;
}

async function selectPunto(idPunto, client) {
    const res = await client.query("SELECT codigo from home_punto WHERE codigo = $1", [idPunto])
    //await client.end()
    console.log("select", idPunto, res.rowCount)
    return res;
}

async function transformation(element, form, client) {
    let params2 = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    if (form["INFO_DETALLADA/PUNTOS_N/ID_PUNTO_NUEVO"] !== null) {
        params2[0] = form["INFO_DETALLADA/PUNTOS_N/ID_PUNTO_NUEVO"];
    }
    const countPunto = await selectPunto(params2[0], client);
    if (countPunto.rowCount === 0) { // no exiten regitro el base de datos con el codigo especificado
        if (form["INFO_DETALLADA/PUNTOS_N/NOMBRE"] !== "") {
            params2[1] = form["INFO_DETALLADA/PUNTOS_N/NOMBRE"];
        }
        if (form["INFO_DETALLADA/PUNTOS_N/PROY"] !== "") {
            params2[2] = form["INFO_DETALLADA/PUNTOS_N/PROY"]
        };
        if (form["INFO_DETALLADA/PUNTOS_N/AUTORIDAD_AMBIENTAL"] !== "") {
            params2[3] = form["INFO_DETALLADA/PUNTOS_N/AUTORIDAD_AMBIENTAL"]
        };
        if (form["INFO_DETALLADA/PUNTOS_N/PLANTA"] !== "") {
            params2[4] = form["INFO_DETALLADA/PUNTOS_N/PLANTA"]
        } else {
            params2[4] = null
        };
        if (form["INFO_DETALLADA/PUNTOS_N/VEREDA"] !== "") {
            params2[5] = form["INFO_DETALLADA/PUNTOS_N/VEREDA"]
        };
        if (form["INFO_DETALLADA/PUNTOS_N/MUNICIPIO"] !== "") {
            params2[6] = form["INFO_DETALLADA/PUNTOS_N/MUNICIPIO"]
        };
        if (form["INFO_DETALLADA/PUNTOS_N/DEPARTAMENTO"] !== "") {
            params2[7] = form["INFO_DETALLADA/PUNTOS_N/DEPARTAMENTO"]
        };
        if (form["INFO_DETALLADA/PUNTOS_N/LOCALIZACION_N"] !== "") {
            let arreglo1 = form["INFO_DETALLADA/PUNTOS_N/LOCALIZACION_N"].split(" ");
            params2[8] = arreglo1[0];
            params2[9] = arreglo1[1];
            params2[10] = arreglo1[2];
        };
        if (form["INFO_DETALLADA/PUNTOS_N/CATEGORIA"] !== "") {
            params2[11] = form["INFO_DETALLADA/PUNTOS_N/CATEGORIA"]
        };
        if (form["INFO_DETALLADA/PUNTOS_N/TIPO_FU_SUP"] !== "") {
            params2[12] = form["INFO_DETALLADA/PUNTOS_N/TIPO_FU_SUP"]
        };
        if (form["INFO_DETALLADA/PUNTOS_N/NOMBRE_FU_SUP"] !== "") {
            params2[13] = form["INFO_DETALLADA/PUNTOS_N/NOMBRE_FU_SUP"]
        };
        if (form["INFO_DETALLADA/PUNTOS_N/TIPO_CAUDAL"] !== "") {
            params2[14] = form["INFO_DETALLADA/PUNTOS_N/TIPO_CAUDAL"]
        };
        if (form["INFO_DETALLADA/PUNTOS_N/OBS_PTO_N"] !== "") {
            params2[15] = form["INFO_DETALLADA/PUNTOS_N/OBS_PTO_N"]
        };
        console.log(JSON.stringify(params2));
        let statusInsert = await insertPunto(params2, client);
        await client.query ('UPDATE home_punto set geom = (ST_SetSRID(ST_MakePoint($1,$2),4686)) WHERE codigo = $3', [params2[9],params2[8],params2[0]])
        return statusInsert.rowCount;
    }
}


module.exports = {
    insertPunto: insertPunto,
    transformation: transformation
}