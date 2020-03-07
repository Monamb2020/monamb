
const { Client } = require('pg');

async function insertAguaResidual(data, client){
    const res = await client.query("INSERT INTO proyectos_aguaresidual(cod_punto_id, tipo_id, horas_descarga, dias_descarga, pretratamiento, descrip_pt, tratamiento_primario, descrip_tp, tratamiento_secundario, descrip_ts, tratamiento_terciario, descrip_tt, otro_tratamiento, descrip_ot, fecha_mantenimiento, destino_final_id, observaciones) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)", data)
    console.log("response", res.rowCount)
    return res;
}
async function selectPunto(idPunto, client) {
    const res = await client.query("SELECT cod_punto_id from proyectos_aguaresidual WHERE cod_punto_id = $1", [idPunto])
    console.log("select", idPunto, res.rowCount)
    return res;
}
async function transformation(element, form, client) {
    console.log("excute AR");
    let params5 = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]; //aguas residuales
    let preg_1 = element["PREG1"]
    let matriz_ = await element["INFO_GENERAL/MATRIZ"]    
    if (preg_1 ==="1"){
        params5[0] = form["INFO_DETALLADA/PUNTOS_N/ID_PUNTO_NUEVO"]
    } else {
        params5[0] = form["INFO_DETALLADA/PUNTOS_E/ID_PUNTO_EXISTENTE"]
    }
    const countPunto = await selectPunto(params5[0], client);
    if (countPunto.rowCount === 0){
        if (form["INFO_DETALLADA/AR/TIPO_AR"]!==""){
            let matriz_ = await element["INFO_GENERAL/MATRIZ"];
            if (matriz_ ==="ARD"){
                params5[1]="D"
            }else{
                params5[1]="I"
            }
        }
        if (form["INFO_DETALLADA/AR/DESC_H"]!==""){
            params5[2] = parseInt(form["INFO_DETALLADA/AR/DESC_H"])
        }
        if (form["INFO_DETALLADA/AR/DESC_D"]!==""){
            params5[3] = parseInt(form["INFO_DETALLADA/AR/DESC_D"])
        }
        if (form["INFO_DETALLADA/AR/SIST_PRET"]!==""){
            params5[4] = form["INFO_DETALLADA/AR/SIST_PRET"]
        }
        if (form["INFO_DETALLADA/AR/S_PT"]!==""){
            params5[5] = form["INFO_DETALLADA/AR/S_PT"]
        }
        if (form["INFO_DETALLADA/AR/SIST_P"]!==""){
            params5[6] = form["INFO_DETALLADA/AR/SIST_P"]
        }
        if (form["INFO_DETALLADA/AR/S_P"]!==""){
            params5[7] = form["INFO_DETALLADA/AR/S_P"]
        }
        if (form["INFO_DETALLADA/AR/SIST_S"]!==""){
            params5[8] = form["INFO_DETALLADA/AR/SIST_S"]
        }
        if (form["INFO_DETALLADA/AR/S_S"]!==""){
            params5[9] = form["INFO_DETALLADA/AR/S_S"]
        }
        if (form["INFO_DETALLADA/AR/SIST_T"]!==""){
            params5[10] = form["INFO_DETALLADA/AR/SIST_T"]
        }
        if (form["INFO_DETALLADA/AR/S_T"]!==""){
            params5[11] = form["INFO_DETALLADA/AR/S_T"]
        }
        if (form["INFO_DETALLADA/AR/SIST_OTRO"]!==""){
            params5[12] = form["INFO_DETALLADA/AR/SIST_OTRO"]
        }
        if (form["INFO_DETALLADA/AR/S_OTRO"]!==""){
            params5[13] = form["INFO_DETALLADA/AR/S_OTRO"]
        }
        if (form["INFO_DETALLADA/AR/FECHA_MANT"]!==""){
            params5[14] = new Date(form["INFO_DETALLADA/AR/FECHA_MANT"])
        }
        if (form["INFO_DETALLADA/AR/DESTINO_FINAL"]!==""){
            params5[15] = form["INFO_DETALLADA/AR/DESTINO_FINAL"]
        }
        if (form["INFO_DETALLADA/AR/OBS_AR"]!==""){
            params5[16]= form["INFO_DETALLADA/AR/OBS_AR"]
        }
        console.log(JSON.stringify(params5));
        return insertAguaResidual(params5, client);   
    }
}
module.exports = {
    insertAguaResidual: insertAguaResidual,
    transformation: transformation
}