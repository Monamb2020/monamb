const axios = require('axios');
const { Client } = require('pg');

const punto = require('./transformation/punto_trans');
const muestra = require('./transformation/muestra_trans');

const url = 'https://kc.kobotoolbox.org/api/v1/data/';
const project = "399050";
let config = {
    headers: {
        'Authorization': 'Token a56dfca4511aba852c1f8c38cf62a09823abb056',
    }
}
const pool = {
    user: 'postgres',
    host: 'localhost',
    database: 'Monamb',
    password: '2581161625',
    port: 5432,
};

function getDateForms(date) {
    return `${url}${project}?query={"end": {"$gte": "${date}"}}`;
}

function sendRequest(date) {
    let url_request = getDateForms(date);
    console.log("url_request", url_request);
    axios.get(url_request, config)
        .then(res => {
            transformation(res.data);
        })
        .catch(err => {
            console.log(err);
        });
}

async function selectLastestDate() {
    const client = new Client(pool)
    await client.connect()
    const res = await client.query('SELECT max(fecha_actualizacion) as ultima_actualizacion from muestra', [])
    console.log(res.rows)
    let fecha_ultima_actualizacion = res.rows[0].ultima_actualizacion;
    fecha_ultima_actualizacion.setDate(fecha_ultima_actualizacion.getDate() + 1);
    sendRequest(getFormattedDate(fecha_ultima_actualizacion));
    await client.end()
}

/*
async function insertInsitu(data){
    const client = new Client(pool)
    await client.connect()
    const res = await client.query("INSERT INTO insitu(nombre, condicion_deteccion, resultado, observaciones,cod_muesta) VALUES ($1, $2, $3, $4, $5)", data)
    console.log("response", res)
    await client.end()
}
*/

function getFormattedDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year + '-' + month + '-' + day;
}

function transformation(data) {

    data.forEach(element => {
        if (element.INFO_DETALLADA) {
            element.INFO_DETALLADA.forEach(form => {
                execute(element, form);
            });
        };
    });
}
async function execute(element, form) {
    const client = new Client(pool)
    await client.connect()
    try {
        await client.query('BEGIN')
        try {
            await punto.transformation(element, form, client);
            await muestra.transformation(element, form, client);
    
            let matriz_ = element["INFO_GENERAL/MATRIZ"];
            if (matriz_ === "MAR") {
    
            } else if (matriz_ === "ASUB") {
    
            } else if (matriz_ === "ARND" || matriz_ === "ARD") {
    
            }
            console.log("commit");
            await client.query('COMMIT')
        } catch (e) {
            console.log("rollback", e);
            client.query('ROLLBACK')
        }
    } finally {
        
    }
}

selectLastestDate();
