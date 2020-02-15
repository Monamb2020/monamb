async function insertPunto(data) {
    const client = new Client(pool)
    await client.connect()
    const res = await client.query("INSERT INTO punto(codigo, identificacion, proyecto, autoridad_ambiental, planta, vereda, municipio, departamento, latitud, longitud, altura, categoria, tipo_fu_sup, nombre_fu_sup, tipo_caudal, observaciones) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)", data)
    console.log("response", res)
    await client.end()
}

function transformation(element, form, pool) {
    let params2 = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
    if (form["INFO_DETALLADA/PUNTOS_N/ID_PUNTO_NUEVO"] !== null) {
        params2[0] = form["INFO_DETALLADA/PUNTOS_N/ID_PUNTO_NUEVO"]
    };
    if (form["INFO_DETALLADA/PUNTOS_N/NOMBRE"] !== "") {
        params2[1] = form["INFO_DETALLADA/PUNTOS_N/NOMBRE"]
    };
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
    /*if (form["INFO_DETALLADA/PUNTOS_N/LOCALIZACION_N"]!==""){
        let arreglo1 = form["INFO_DETALLADA/PUNTOS_N/LOCALIZACION_N"].split(" ");
        params2[8] = arreglo1[0];
        params2[9] = arreglo1[1];
        params2[10] = arreglo1[2];
    };*/
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
    console.log(params2);
    //insertPunto(params2);
}


module.exports = {
    insertPunto: insertPunto,
    transformation: transformation
}