
async function insertMuestra(data, pool) {
    const client = new Client(pool)
    await client.connect()
    const res = await client.query("INSERT INTO muestra(cod_punto, codigo_muestra, fecha_toma, hora_toma, responsable, fecha_analisis, tipo_muestreo, numero_verticales, numero_submuestras, intervalo_tiempo, duracion,temperatura_ambiente, caudal, metodo_caudal, color_agua, turbidez, olor, causa, material_flotante, iridiscencia, observaciones) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)", data)
    console.log("response", res)
    await client.end()
}
function transformation(element, form, pool) {
    let params1 = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
    let preg_1 = element["PREG1"]
    //preguntar a Chucho
    if (preg_1 === "1") {
        params1[0] = form["INFO_DETALLADA/PUNTOS_N/ID_PUNTO_NUEVO"]
    } else {
        params1[0] = form["INFO_DETALLADA/PUNTOS_E/ID_PUNTO_EXISTENTE"]
    };
    if (form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"] !== "") {
        params1[1] = form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]
    };
    if (form["INFO_DETALLADA/MUESTRA/FECHA"] !== "") {
        params1[2] = form["INFO_DETALLADA/MUESTRA/FECHA"]
    };
    if (form["INFO_DETALLADA/MUESTRA/HORA"] !== "") {
        params1[3] = form["INFO_DETALLADA/MUESTRA/HORA"]
    };
    let responsable_ = element["INFO_GENERAL/RESPONSABLE"];
    if (responsable_ !== "") {
        params1[4] = responsable_
    };
    if (form["INFO_DETALLADA/MUESTRA/FECHA"] !== "") {
        params1[5] = form["INFO_DETALLADA/MUESTRA/FECHA"] + 1
    };// preguntar a Chucho
    let tipoMonitoreo_ = element["INFO_GENERAL/TIPO_MONITOREO"]
    if (tipoMonitoreo_ !== "") {
        params1[6] = tipoMonitoreo_
    }
    if (form["INFO_DETALLADA/MUESTRA/VERTICAL"] !== "") {
        params1[7] = form["INFO_DETALLADA/MUESTRA/VERTICAL"]
    }
    if (form["INFO_DETALLADA/MUESTRA/SUBMUESTRA"] !== "") {
        params1[8] = form["INFO_DETALLADA/MUESTRA/SUBMUESTRA"]
    }
    if (form["INFO_DETALLADA/MUESTRA/INTERVALO"] !== "") {
        params1[9] = form["INFO_DETALLADA/MUESTRA/INTERVALO"]
    }
    if (form["INFO_DETALLADA/MUESTRA/DURACION"] !== "") {
        params1[10] = form["INFO_DETALLADA/MUESTRA/DURACION"]
    }
    if (form["INFO_DETALLADA/IN_SITU/Resultados_temperatura/group_ce2bv42_temperatura_RESULTADO"] !== "") {
        params1[11] = form["INFO_DETALLADA/IN_SITU/Resultados_temperatura/group_ce2bv42_temperatura_RESULTADO"]
    }
    if (form["INFO_DETALLADA/MUESTRA/CAUDAL"] !== "") {
        params1[12] = form["INFO_DETALLADA/MUESTRA/CAUDAL"]
    }
    if (form["INFO_DETALLADA/PUNTOS_N/TIPO_CAUDAL"] !== "") {
        params1[13] = form["INFO_DETALLADA/PUNTOS_N/TIPO_CAUDAL"]
    }
    if (form["INFO_DETALLADA/MUESTRA/COLOR"] !== "") {
        params1[14] = form["INFO_DETALLADA/MUESTRA/COLOR"]
    }
    if (form["INFO_DETALLADA/MUESTRA/TURBIDEZ"] !== "") {
        params1[15] = form["INFO_DETALLADA/MUESTRA/TURBIDEZ"]
    }
    if (form["INFO_DETALLADA/MUESTRA/OLOR"] !== "") {
        params1[16] = form["INFO_DETALLADA/MUESTRA/OLOR"]
    }
    if (form["INFO_DETALLADA/MUESTRA/CAUSA"] !== "") {
        params1[17] = form["INFO_DETALLADA/MUESTRA/CAUSA"]
    }
    if (form["INFO_DETALLADA/MUESTRA/MATERIAL_FLOTANTE"] !== "") {
        params1[18] = form["INFO_DETALLADA/MUESTRA/MATERIAL_FLOTANTE"]
    }
    if (form["INFO_DETALLADA/MUESTRA/IRIDISCENCIA"] !== "") {
        params1[19] = form["INFO_DETALLADA/MUESTRA/IRIDISCENCIA"]
    }
    let observ_ = element["INFO_GENERAL/OBS_GEN"]
    if (observ_ !== "") {
        params1[20] = observ_
    };
    //console.log(params1);
}

module.exports = {
    transformation: transformation,
    insertMuestra: insertMuestra
}