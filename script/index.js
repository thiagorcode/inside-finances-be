// script para ler planilha excel e registrar os dados no sitema de controle de gasto.
const dotenv = require('dotenv');
const fetch = require('node-fetch')
const readXlsxFile = require('read-excel-file/node')
// console.log(`${hostApi}/categorys`)

async function loadCategorys() {
  console.log('Carregando categorias...');
  const res = await fetch('http://localhost:3333/categorys');
  const resJSON = await res.json()
  return resJSON.categorys;
}

function readSheet() {
  readXlsxFile('./testeScriptControle.xlsm', { sheet: 'Receita' }).then((row) => {
    console.log(row)
  })
}

async function start() {
  const categorys = await loadCategorys()

  readSheet()
}

start()