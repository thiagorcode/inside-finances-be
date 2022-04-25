// script para ler planilha excel e registrar os dados no sitema de controle de gasto.

const request = require('request');
const dotenv = require('dotenv');

const hostApi = 'http://localhost:3000'
console.log(fetch(`${hostApi}/categorys`))
request(`${hostApi}/categorys`, (err, res, body) => console.log(body))