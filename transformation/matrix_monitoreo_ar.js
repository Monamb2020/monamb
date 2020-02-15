async function insertAguaSubterranea(data){
    const client = new Client(pool)
    await client.connect()
    const res = await client.query("INSERT INTO agua_subterranea(cod_punto, tipo, diametro_perforacion, profundidad, condicion, nivel_estatico, nivel_piezometrico, observaciones) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, )", data)
    console.log("response", res)
    await client.end()
}
function transformation(element, form, pool) {
    let params5 = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]; //aguas residuales
    if (preg_1 ==="1"){
        params4[0] = form["INFO_DETALLADA/PUNTOS_N/ID_PUNTO_NUEVO"]
    } else {
        params4[0] = form["INFO_DETALLADA/PUNTOS_E/ID_PUNTO_EXISTENTE"]
    };
    if (form["INFO_DETALLADA/AR/TIPO_AR"]!==""){
        params5[1] = form["INFO_DETALLADA/AR/TIPO_AR"]
    };
    if (form["INFO_DETALLADA/AR/DESC_H"]!==""){
        params5[2] = form["INFO_DETALLADA/AR/DESC_H"]
    };
    if (form["INFO_DETALLADA/AR/DESC_D"]!==""){
        params5[3] = form["INFO_DETALLADA/AR/DESC_D"]
    };
    if (form["INFO_DETALLADA/AR/SIST_PRET"]!==""){
        params5[4] = form["INFO_DETALLADA/AR/SIST_PRET"]
    };
    if (form["INFO_DETALLADA/AR/S_PT"]!==""){
        params5[5] = form["INFO_DETALLADA/AR/S_PT"]
    };
    if (form["INFO_DETALLADA/AR/SIST_P"]!==""){
        params5[6] = form["INFO_DETALLADA/AR/SIST_P"]
    };
    if (form["INFO_DETALLADA/AR/S_P"]!==""){
        params5[7] = form["INFO_DETALLADA/AR/S_P"]
    };
}
module.exports = {
    insertPunto: insertPunto,
    transformation: transformation
}