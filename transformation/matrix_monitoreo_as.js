
async function insertAguaResidual(data){
    const client = new Client(pool)
    await client.connect()
    const res = await client.query("INSERT INTO agua_residual(cod_punto, tipo, horas_descarga, dias_descarga, pretratamiento, descrip_pt, tratamiento_primario, descrip_tp, tratamiento_secundario, descrip_ts, tratamiento_terciario, descrip_tt, otro_tratamiento, descrip_ot, fecha_mantenimiento, destino_final, observaciones) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)", data)
    console.log("response", res)
    await client.end()
}
function transformation(element, form, pool) {
    let params4 = [null, null, null, null, null, null, null, null]; //agua subterranea
    if (preg_1 ==="1"){
        params4[0] = form["INFO_DETALLADA/PUNTOS_N/ID_PUNTO_NUEVO"]
    } else {
        params4[0] = form["INFO_DETALLADA/PUNTOS_E/ID_PUNTO_EXISTENTE"]
    };
    if (form["INFO_DETALLADA/ASUB/TIPO_ASUB"]!==""){
        params4[1] = form["INFO_DETALLADA/ASUB/TIPO_ASUB"]
    };
    if (form["INFO_DETALLADA/ASUB/DIAMETRO"]!==""){
        params4[2] = form["INFO_DETALLADA/ASUB/DIAMETRO"]
    };
    if (form["INFO_DETALLADA/ASUB/PROFUNDIDAD_ASUB"]!==""){
        params4[3] = form["INFO_DETALLADA/ASUB/PROFUNDIDAD_ASUB"]
    };
    if (form["INFO_DETALLADA/ASUB/CONDICION"]!==""){
        params4[4] = form["INFO_DETALLADA/ASUB/CONDICION"]
    };
    if (form["INFO_DETALLADA/ASUB/N_ESTATICO"]!==""){
        params4[5] = form["INFO_DETALLADA/ASUB/N_ESTATICO"]
    };
    if (form["INFO_DETALLADA/ASUB/N_PIEZOMETRICO"]!==""){
        params4[6] = form["INFO_DETALLADA/ASUB/N_PIEZOMETRICO"]
    };
    if (form["INFO_DETALLADA/ASUB/OBS_ASUB"]!==""){
        params4[7] = form["INFO_DETALLADA/ASUB/OBS_ASUB"]
    };
}

module.exports = {
    insertPunto: insertPunto,
    transformation: transformation
}