/*jshint esversion: 6 */
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})); 

//Genero arreglo de datos
var datos = [
    {'dato': 'dato1', 'nombre': 'dato uno'},
    {'dato': 'dato2', 'nombre': 'dato dos'},
    {'dato': 'dato3', 'nombre': 'dato tres'},
]; 

//Construyo las urls por las que voy a responder 

//URL raiz
app.get('/', (req, res) => {
    res.status(200).send('Bienvenida al Api-Rest con node');
});

//URL de consulta de todos los datos
app.get('/datos', (req, res) => {
    res.status(200).send(datos);
});

//Endpint Utilizando ULS params
app.get('/datos/:dato', (req,res) => {
    let esta = datos.find(function(dato) { 
        if(dato.dato === req.params.dato)
            return dato;
    });
    if (esta != null && esta != undefined)
        res.status(200).send('Dato encontrado')
    else
        res.status(404).send('No está el datos/:dato')
});


//Endpoint Utilizando los query params 
// uso: /datosFind?dato='<dato>'
app.get('/datosfind', (req,res) => {
    let esta = datos.find(function(dato) { 
        if(dato.dato === req.query.dato)
            return dato;
    });
    if (esta != null && esta != undefined)
        res.status(200).send('Dato encontrado'); 
    else
        res.status(404).send('No está el datosfind'); 
});

// Post en el que voy a insertar un dato
app.post('/datos', (req, res) => {
    datos.push(req.body);
    console.log(req.body.nombre); 
    res.status(200).send('Datos recibidos');
});

// Creamos el servidor

http.createServer(app).listen(3000, () =>{
    console.log('Servidor iniciado en http://localhost:3000');
});
