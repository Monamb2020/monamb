const axios = require('axios');
const { Client } = require('pg');

const punto = require('./transformation/punto_trans');
const muestra = require('./transformation/muestra_trans');
const aMarina_ = require('./transformation/matrix_monitoreo_am');
const asub_ = require('./transformation/matrix_monitoreo_as');
const ar_ = require('./transformation/matrix_monitoreo_ar');
const insitu_ = require('./transformation/param_trans');
const Counter = require('./utils/counter');
const fotos_lab = require('./transformation/fotos_lab');

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
    database: 'PRUEBAS_03',
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
    const res = await client.query('SELECT max(fecha_actualizacion) as ultima_actualizacion from laboratorio_muestra', [])
    console.log(res.rows)
    let fecha_ultima_actualizacion = res.rows[0].ultima_actualizacion;
    fecha_ultima_actualizacion.setDate(fecha_ultima_actualizacion.getDate() + 1);
    sendRequest(getFormattedDate(fecha_ultima_actualizacion));
    await client.end()
}

async function selectIdLab() {
    const client = new Client(pool)
    await client.connect()
    const res = await client.query("select max(id) as id from laboratorio_insitu", []);
    await client.end()
    return res.rows[0].id;
}

function getFormattedDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year + '-' + month + '-' + day;
}

async function transformation(data) {
    let secuential = await selectIdLab();
    console.log("secuential - Id", secuential);
    let count = new Counter(secuential);
    await data.forEach(async element => {
        if (element.INFO_DETALLADA) {
            await element.INFO_DETALLADA.forEach(async form => {
                element.secuential = count;
                await execute(element, form);
            });
        };
    });
    console.log("FINALIZACION");
}
async function execute(element, form) {
    const client = new Client(pool)
    await client.connect()
    try {
        await client.query('BEGIN')
        try {
            if (form["INFO_DETALLADA/PUNTOS_N/ID_PUNTO_NUEVO"] &&form["INFO_DETALLADA/PUNTOS_N/ID_PUNTO_NUEVO"]!==""){
                await punto.transformation(element, form, client);
            }
            await muestra.transformation(element, form, client);

            let matriz_ = element["INFO_GENERAL/MATRIZ"];
            if (matriz_ === "MAR") {
                await aMarina_.transformation(element, form, client);
            }
            if (matriz_ === "ASUB") {
                await asub_.transformation(element, form, client);
            }
            if (matriz_ === "ARND") {
                await ar_.transformation(element, form, client);
            }
            if (matriz_ === "ARD") {
                await ar_.transformation(element, form, client);
            }
            await insitu_.transformation(element, form, client);
            await fotos_lab.transformation(element, form, client, config);
            console.log("commit");
            await client.query('COMMIT')
        } catch (e) {
            console.log("rollback", e);
            client.query('ROLLBACK')
        }
    } finally {
        
    }
}
process.on('unhandledRejection', (err) => { 
    console.error(err);
    process.exit(1);
  })
selectLastestDate();
