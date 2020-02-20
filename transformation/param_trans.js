const { Client } = require('pg');


async function insertInsitu(data, client){
    const res = await client.query("INSERT INTO insitu(nombre, condicion_deteccion, resultado, observaciones,cod_muestra) VALUES ($1, $2, $3, $4, $5)", data)
    console.log("response", res.rowCount)
    return res;
}

async function transformation(element, form, client) {
    console.log("excute param");
    let params7 = [null, null, null, null, null];//temperatura
    if (form["INFO_DETALLADA/IN_SITU/Resultados_temperatura/group_ce2bv42_temperatura_RESULTADO"]!==""){
        params7[0] = "1074";
        params7[2] = form["INFO_DETALLADA/IN_SITU/Resultados_temperatura/group_ce2bv42_temperatura_RESULTADO"];
    }
    if (form["INFO_DETALLADA/IN_SITU/Resultados_temperatura/group_ce2bv42_temperatura_CONDICI_N_DE_DETECCI_N"]!==""){
        params7[1] = form["INFO_DETALLADA/IN_SITU/Resultados_temperatura/group_ce2bv42_temperatura_CONDICI_N_DE_DETECCI_N"];
    }
    if (form["INFO_DETALLADA/IN_SITU/Resultados_temperatura/group_ce2bv42_temperatura_OBSERVACIONES"]!==""){
        params7[3] = form["INFO_DETALLADA/IN_SITU/Resultados_temperatura/group_ce2bv42_temperatura_OBSERVACIONES"];
    }
    if (form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]!==""){
        params7[4] = form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]
    }
    let params8 = [null, null, null, null, null];//OD
    if (form["INFO_DETALLADA/IN_SITU/Resultados_OD/group_ce2bv42_od_RESULTADO"]!==""){
        params8[0] = "1059";
        params8[2] = form["INFO_DETALLADA/IN_SITU/Resultados_OD/group_ce2bv42_od_RESULTADO"];
    }
    if (form["INFO_DETALLADA/IN_SITU/Resultados_OD/group_ce2bv42_od_CONDICI_N_DE_DETECCI_N"]!==""){
        params8[1] = form["INFO_DETALLADA/IN_SITU/Resultados_OD/group_ce2bv42_od_CONDICI_N_DE_DETECCI_N"];
    }
    if (form["INFO_DETALLADA/IN_SITU/Resultados_OD/group_ce2bv42_od_OBSERVACIONES"]!==""){
        params8[3] = form["INFO_DETALLADA/IN_SITU/Resultados_OD/group_ce2bv42_od_OBSERVACIONES"];
    }
    if (form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]!==""){
        params8[4] = form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]
    }   
    let params9 = [null, null, null, null, null];//pH
    if (form["INFO_DETALLADA/IN_SITU/Resultados_pH/group_ce2bv42_ph_RESULTADO"]!==""){
        params9[0] = "1059";
        params9[2] = form["INFO_DETALLADA/IN_SITU/Resultados_pH/group_ce2bv42_ph_RESULTADO"];
    }
    if (form["INFO_DETALLADA/IN_SITU/Resultados_pH/group_ce2bv42_ph_CONDICI_N_DE_DETECCI_N"]!==""){
        params9[1] = form["INFO_DETALLADA/IN_SITU/Resultados_pH/group_ce2bv42_ph_CONDICI_N_DE_DETECCI_N"];
    }
    if (form["INFO_DETALLADA/IN_SITU/Resultados_pH/group_ce2bv42_ph_OBSERVACIONES"]!==""){
        params9[3] = form["INFO_DETALLADA/IN_SITU/Resultados_pH/group_ce2bv42_ph_OBSERVACIONES"];
    }
    if (form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]!==""){
        params9[4] = form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]
    }   

    let params10 = [null, null, null, null, null];//Conductividad
    if (form["INFO_DETALLADA/IN_SITU/Resultados_conductividad/group_ce2bv42_conductividad_RESULTADO"]!==""){
        params10[0] = "1025";
        params10[2] = form["INFO_DETALLADA/IN_SITU/Resultados_conductividad/group_ce2bv42_conductividad_RESULTADO"];
    }
    if (form["INFO_DETALLADA/IN_SITU/Resultados_conductividad/group_ce2bv42_conductividad_CONDICI_N_DE_DETECCI_N"]!==""){
        params10[1] = form["INFO_DETALLADA/IN_SITU/Resultados_conductividad/group_ce2bv42_conductividad_CONDICI_N_DE_DETECCI_N"];
    }
    if (form["INFO_DETALLADA/IN_SITU/Resultados_conductividad/group_ce2bv42_conductividad_OBSERVACIONES"]!==""){
        params10[3] = form["INFO_DETALLADA/IN_SITU/Resultados_conductividad/group_ce2bv42_conductividad_OBSERVACIONES"];
    }
    if (form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]!==""){
        params10[4] = form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]
    } 
    
    let params11 = [null, null, null, null, null];//ssed
    if (form["INFO_DETALLADA/IN_SITU/Resultados_SSED/group_ce2bv42_ssed_RESULTADO"]!==""){
        params11[0] = "1069";
        params11[2] = form["INFO_DETALLADA/IN_SITU/Resultados_SSED/group_ce2bv42_ssed_RESULTADO"];
    }
    if (form["INFO_DETALLADA/IN_SITU/Resultados_SSED/group_ce2bv42_ssed_CONDICI_N_DE_DETECCI_N"]!==""){
        params11[1] = form["INFO_DETALLADA/IN_SITU/Resultados_SSED/group_ce2bv42_ssed_CONDICI_N_DE_DETECCI_N"];
    }
    if (form["INFO_DETALLADA/IN_SITU/Resultados_SSED/group_ce2bv42_ssed_OBSERVACIONES"]!==""){
        params11[3] = form["INFO_DETALLADA/IN_SITU/Resultados_SSED/group_ce2bv42_ssed_OBSERVACIONES"];
    }
    if (form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]!==""){
        params11[4] = form["INFO_DETALLADA/MUESTRA/COD_MUESTRA"]
    } 

    let status = [];
    console.log(JSON.stringify(params7));
    status [0] = insertInsitu(params7, client); 
    console.log(JSON.stringify(params8));
    status [1] = insertInsitu(params8, client);
    console.log(JSON.stringify(params9));
    status [2] = insertInsitu(params9, client); 
    console.log(JSON.stringify(params10));
    status [3] = insertInsitu(params10, client); 
    console.log(JSON.stringify(params11));
    status [4] = insertInsitu(params11, client); 
    for ( let i =0; i<status.length; i++){
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