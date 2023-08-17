const { request, response } = require('express');
const db = require('../models/controlriego/index');
const moment = require('moment')

const SerialPort = require("serialport");
const ReadLine = require('@serialport/parser-readline');

const port = new SerialPort(
    "COM3", {
    baudRate: 9600
});

const parser = new ReadLine();
port.pipe(parser);

// const parser = port.pipe(new ReadLine({ delimiter: '\n' }));



const Datos = db.datos;


const getriegos = async (req = request, res = response) => {
    try {
        const riegos = await Datos.findAll();
        res.render('riegos', { riegos });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Ocurrió un error interno en el servidor"
        });
    }
};
const getUltimo_registro = async (req = request, res = response) => {
    try {
        const riegos = await Datos.findAll();
        const ultimoIndice = riegos.length - 1
        const riego = riegos[ultimoIndice]
        res.render('veriegosultimo', { riego });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Ocurrió un error interno en el servidor"
        });
    }
};
const getGrafica = async (req = request, res = response) => {
    try {
        const riegos = await Datos.findAll();
        const datos = [];
        const humedadAmbiente = [];

        const fechas = [];
        for (let i = 0; i < riegos.length; i++) {

            datos.push(parseFloat(riegos[i].dataValues.temperaturaAmbiente))
            humedadAmbiente.push(parseFloat(riegos[i].dataValues.humedadAmbiente))
            fechas.push(riegos[i].hora.split(" ")[5])
        }
        res.render('vergrafico', { datos, fechas, humedadAmbiente });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Ocurrió un error interno en el servidor"
        });
    }
};

parser.on('data', async (data) => {
    // Aquí puedes procesar los datos recibidos desde Arduino
    const [humidity, temperature, humedadTierra, sensorLluvia] = data.split(';');
    const currentDateTime = moment();

    const fechaFormateada = moment(currentDateTime).locale('es').format('dddd DD [de] MMMM [del] YYYY h:mm:ss a');
    console.log(humedadTierra);
    if (humedadTierra == 0) {
        humedadT = "No se necesita riego"
    } else {
        humedadT = "Se necesita riego"
    };


    if (sensorLluvia == 0) {
        sensorLl = "Está lloviendo"
    } else {
        sensorLl = "No está lloviendo"

    }


    await db.datos.create({
        hora: fechaFormateada,
        humedadAmbiente: humidity,
        temperaturaAmbiente: temperature,
        humedadTierra: humedadT,
        sensorLluvia: sensorLl,

    });

    // Aquí puedes hacer lo que necesites con los datos, como enviarlos a tu interfaz web.
});

port.on('open', () => {
    console.log('Conexión establecida con Arduino.');
});

port.on('error', (err) => {
    console.error('Error en la conexión:', err);
});

module.exports = {
    getriegos,
    getUltimo_registro,
    getGrafica
}