const { Client } = require('pg');

async function insertInsitu(data, client){
    const res = await client.query("INSERT INTO laboratorio_insitu(parametro_id, condicion_deteccion, resultado, observaciones,cod_muestra_id, id) VALUES ($1, $2, $3, $4, $5, $6)", data)
    console.log("response", res.rowCount)
    return res;
}
async function transformation(element, form, client) {
    console.log("excute param");
    let status = [];
    let c = -1;  
    if (parseFloat(form["INFO_DETALLADA/IN_SITU/Resultados_temperatura/group_ce2bv42_temperatura_RESULTADO"])!== 0){
        let params7 = [null, null, null, null, null, null];//temperatura
        params7[0] = "1074";
        params7[2] = parseFloat(form["INFO_DETALLADA/IN_SITU/Resultados_temperatura/group_ce2bv42_temperatura_RESULTADO"]);
        if (form["INFO_DETALLADA/MUESTRA/FOTO_PANORAMICA"]!==""){
            let arregloID = form["INFO_DETALLADA/MUESTRA/FOTO_PANORAMICA"].split(".");
            params7[5] = element.secuential.getCounter();
        }
        if (form["INFO_DETALLADA/IN_SITU/Resultados_temperatura/group_ce2bv42_temperatura_CONDICI_N_DE_DETECCI_N"]=="<"){
            params7[1] = form["INFO_DETALLADA/IN_SITU/Resultados_temperatura/group_ce2bv42_temperatura_CONDICI_N_DE_DETECCI_N"];     
            }
        if (form["INFO_DETALLADA/IN_SITU/Resultados_temperatura/group_ce2bv42_temperatura_OBSERVACIONES"]!==""){
            params7[3] = form["INFO_DETALLADA/IN_SITU/Resultados_temperatura/group_ce2bv42_temperatura_OBSERVACIONES"];
        }
        if (form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]!==""){
            params7[4] = form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]
        }    
        c++;    
        console.log(JSON.stringify(params7));
        status [c] = await insertInsitu(params7, client);  
    }
    
    if (parseFloat(form["INFO_DETALLADA/IN_SITU/Resultados_OD/group_ce2bv42_od_RESULTADO"])!==0){
        let params8 = [null, null, null, null, null, null];//OD
        params8[0] = "1059";
        params8[2] = parseFloat(form["INFO_DETALLADA/IN_SITU/Resultados_OD/group_ce2bv42_od_RESULTADO"]);
        if (form["INFO_DETALLADA/MUESTRA/FOTO_PANORAMICA"]!==""){
            let arregloID1 = form["INFO_DETALLADA/MUESTRA/FOTO_PANORAMICA"].split(".");
            params8[5] = element.secuential.getCounter();
        }
        if (form["INFO_DETALLADA/IN_SITU/Resultados_OD/group_ce2bv42_od_CONDICI_N_DE_DETECCI_N"]=="<"){
            params8[1] = form["INFO_DETALLADA/IN_SITU/Resultados_OD/group_ce2bv42_od_CONDICI_N_DE_DETECCI_N"];   
            }
        if (form["INFO_DETALLADA/IN_SITU/Resultados_OD/group_ce2bv42_od_OBSERVACIONES"]!==""){
            params8[3] = form["INFO_DETALLADA/IN_SITU/Resultados_OD/group_ce2bv42_od_OBSERVACIONES"];
        }
        if (form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]!==""){
            params8[4] = form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]
        }
        c++;
        console.log(JSON.stringify(params8));
        status [c] = await insertInsitu(params8, client);
    }
    
    if (parseFloat(form["INFO_DETALLADA/IN_SITU/Resultados_pH/group_ce2bv42_ph_RESULTADO"])!==0){
        let params9 = [null, null, null, null, null, null];//pH
        params9[0] = "1077";
        params9[2] = parseFloat(form["INFO_DETALLADA/IN_SITU/Resultados_pH/group_ce2bv42_x_RESULTADO"]);
        if (form["INFO_DETALLADA/MUESTRA/FOTO_PANORAMICA"]!==""){
            let arregloID2 = form["INFO_DETALLADA/MUESTRA/FOTO_PANORAMICA"].split(".");
            params9[5] = element.secuential.getCounter();
        }
        if (form["INFO_DETALLADA/IN_SITU/Resultados_pH/group_ce2bv42_ph_CONDICI_N_DE_DETECCI_N"]=="<"){
            params9[1] = form["INFO_DETALLADA/IN_SITU/Resultados_pH/group_ce2bv42_ph_CONDICI_N_DE_DETECCI_N"];     
            }
        if (form["INFO_DETALLADA/IN_SITU/Resultados_pH/group_ce2bv42_ph_OBSERVACIONES"]!==""){
            params9[3] = form["INFO_DETALLADA/IN_SITU/Resultados_pH/group_ce2bv42_ph_OBSERVACIONES"];
        }
        if (form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]!==""){
            params9[4] = form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]
        }  
        c++;
        console.log(JSON.stringify(params9));
        status [c] = await insertInsitu(params9, client); 
    }

    if (parseFloat(form["INFO_DETALLADA/IN_SITU/Resultados_conductividad/group_ce2bv42_conductividad_RESULTADO"])!==0){
        let params10 = [null, null, null, null, null, null];//Conductividad
        params10[0] = "1025";
        params10[2] = parseFloat(form["INFO_DETALLADA/IN_SITU/Resultados_conductividad/group_ce2bv42_conductividad_RESULTADO"]);
        if (form["INFO_DETALLADA/MUESTRA/FOTO_PANORAMICA"]!==""){
            let arregloID3 = form["INFO_DETALLADA/MUESTRA/FOTO_PANORAMICA"].split(".");
            params10[5] = element.secuential.getCounter();
        }
        if (form["INFO_DETALLADA/IN_SITU/Resultados_conductividad/group_ce2bv42_conductividad_CONDICI_N_DE_DETECCI_N"]=="<"){
            params10[1] = form["INFO_DETALLADA/IN_SITU/Resultados_conductividad/group_ce2bv42_conductividad_CONDICI_N_DE_DETECCI_N"];
        }
        if (form["INFO_DETALLADA/IN_SITU/Resultados_conductividad/group_ce2bv42_conductividad_OBSERVACIONES"]!==""){
            params10[3] = form["INFO_DETALLADA/IN_SITU/Resultados_conductividad/group_ce2bv42_conductividad_OBSERVACIONES"];
        }
        if (form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]!==""){
            params10[4] = form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]
        } 
        c++;
        console.log(JSON.stringify(params10));
        status [c] = await insertInsitu(params10, client); 
    }
    
    if (parseFloat(form["INFO_DETALLADA/IN_SITU/Resultados_SSED/group_ce2bv42_ssed_RESULTADO"])!==0){
        let params11 = [null, null, null, null, null, null];//ssed
        params11[0] = "1069";
        params11[2] = parseFloat(form["INFO_DETALLADA/IN_SITU/Resultados_SSED/group_ce2bv42_ssed_RESULTADO"]);;
        if (form["INFO_DETALLADA/MUESTRA/FOTO_PANORAMICA"]!==""){
            let arregloID4 = form["INFO_DETALLADA/MUESTRA/FOTO_PANORAMICA"].split(".");
            params11[5] = element.secuential.getCounter();
        }
        if (form["INFO_DETALLADA/IN_SITU/Resultados_SSED/group_ce2bv42_ssed_CONDICI_N_DE_DETECCI_N"]=="<"){
            params11[1] = form["INFO_DETALLADA/IN_SITU/Resultados_SSED/group_ce2bv42_ssed_CONDICI_N_DE_DETECCI_N"];
        }
        if (form["INFO_DETALLADA/IN_SITU/Resultados_SSED/group_ce2bv42_ssed_OBSERVACIONES"]!==""){
            params11[3] = form["INFO_DETALLADA/IN_SITU/Resultados_SSED/group_ce2bv42_ssed_OBSERVACIONES"];
        }
        if (form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]!==""){
            params11[4] = form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]
        } 
        c++;
        console.log(JSON.stringify(params11));
        status [c] = await insertInsitu(params11, client);
    }
    for ( let i =0; i<=status.length; i++){
        if (status[i] === 0){
            return 0;
        }
    }
    return 1;
}

module.exports = {
    insertInsitu: insertInsitu,
    transformation: transformation
}