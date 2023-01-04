// script para ler planilha excel e registrar os dados no sitema de testeScriptControle de gasto.
const dotenv = require('dotenv');
const fetch = require('node-fetch')
const readXlsxFile = require('read-excel-file/node')
const dateFns = require('date-fns')

const userId = "fac56249-feaf-460d-9aa5-37dd6412cdb9"

async function loadCategory() {
  const res = await fetch('http://localhost:3333/api/category');
  const resJSON = await res.json()
  console.log(resJSON)
  return resJSON.category;
}

async function readSheetEarnings() {
  const sheet = await readXlsxFile('./controle.xlsm', { sheet: 'Receita' })

  const inconsistencyInDate = sheet.filter(row => row[2] !== null && row[0] === null)
  const inconsistencyInSalary = sheet.filter(row => row[2] === null && row[0] !== null)

  console.log('Quantidade de inconsistência na data: ' + inconsistencyInDate.length)
  console.log('Quantidade de inconsistência no salário: ' + inconsistencyInSalary.length)

  if (inconsistencyInDate.length || inconsistencyInSalary.length) {
    throw new Error('Inconsistência encontrada! Verifique e tente novamente')
  }

  const sheetRemovedRowsNull = sheet.filter(row => row[0] !== null && row[2] !== null)

  return sheetRemovedRowsNull
}

async function readSheetExpenditure() {
  const sheet = await readXlsxFile('./controle.xlsm', { sheet: 'Despesa' })

  const inconsistencyInDate = sheet.filter(row => row[0] === null && row[2] !== null && row[4] !== null)
  const inconsistencyInSalary = sheet.filter(row => row[0] !== null && row[2] !== null && row[4] === null)
  const inconsistencyInCategory = sheet.filter(row => row[0] !== null && row[2] === null && row[4] !== null)

  console.log('Quantidade de inconsistência na data: ' + inconsistencyInDate.length)
  console.log('Quantidade de inconsistência no saldo: ' + inconsistencyInSalary.length)
  console.log('Quantidade de inconsistência na categoria: ' + inconsistencyInCategory.length)

  if (inconsistencyInDate.length || inconsistencyInSalary.length || inconsistencyInCategory.length) {
    console.log(inconsistencyInDate[0])
    console.log(inconsistencyInSalary[0])
    console.log(inconsistencyInCategory[0])
    throw new Error('Inconsistência encontrada! Verifique e tente novamente')
  }

  const sheetRemovedRowsNull = sheet.filter(row => row[0] !== null && row[2] !== null)

  return sheetRemovedRowsNull
}


async function start() {
  console.log('Carregando categorias...');
  const category = await loadCategory()

  const typeTransfer = category.find(_category => _category.name === 'Transferência')
  console.log('Categorias carregadas!')

  console.log('Configuração da planilha de Ganhos | DATA - Categoria? - Valor')
  console.log('Carregando planilha - Ganhos...');
  const sheetEarnings = await readSheetEarnings()
  console.log('Planiha de ganhos carregada');

  console.log('Configuração da planilha de Ganhos | DATA - Descrição? - Categoria - Banco? - Valor - Especificação?')

  console.log('Carregando planilha - Despesas...');
  const sheetExpenditure = await readSheetExpenditure()
  console.log('Planiha de despesas carregada');

  console.log('Atualizando no sistema as transações das planilhas')
  await sheetEarnings.forEach(async row => {
    const selectCategory = category.find(_category => _category.name === row[1] && _category.type === '+')
    
    const body = {
      description: '',
      value: row[2],
      categoryId: selectCategory?.id || typeTransfer?.id,
      date: row[0],
      isPaid: dateFns.isBefore(row[0], new Date()),
      type: '+',
      // TODO: Ser dinamico o User
      // Criar um input para receber os dados de auth
      userId: userId,
    }

    await fetch('http://localhost:3333/api/transactions', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
  })
  // 0DATA - 1Descrição? - 2Categoria - 3Banco? - 4Valor - 5Especificação?'
  console.log(sheetExpenditure)
  await sheetExpenditure.forEach(async (row) => {
    const selectCategory = category.find(category => category.name === row[2] && category.type === '-')

    const body = {
      description: '',
      value: row[4],
      categoryId: selectCategory?.id || typeTransfer?.id,
      date: row[0],
      isPaid: dateFns.isBefore(row[0], new Date()),
      type: '-',
      specification: row[5] || '',
      bank: row[3] || '',
      // Ser dinamico o User
      // Criar um input para receber os dados de auth
      userId: userId,
    }
    await fetch('http://localhost:3333/api/transactions', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })


  })
  console.log('Atualização feita com sucesso.')



}

start()