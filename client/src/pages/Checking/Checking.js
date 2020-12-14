import React, { useState, useEffect } from 'react';

import Select from '../../components/Select';
import Balance from '../../components/Balance';
import Report from '../../components/Report';

import ServiceHttp from "../../services/TransactionService";

export default function Checking() {
  const [current, setCurrent] = useState(0);
  const [modified, setModified] = useState(0);
  const [yearMonth, setYearMonth] = useState("2019-01");
  const [changeFilter, setChangeFilter] = useState('')

  useEffect(() => {
    const getAll = async (yearMonth) => {

      const currentTrasanction = await ServiceHttp.getAll(yearMonth);
      const { data } = currentTrasanction;
      const investigate = data.report
        .map(report => {
          return {
            ...report,
            value: parseFloat(report.value),
          }
        })
        .filter(inv => {
          return inv.description.toLowerCase().indexOf(changeFilter.toLowerCase()) > -1;
        })
      const newData = { length: investigate.length, report: investigate }
      setCurrent(newData);
    }
    getAll(yearMonth)
    // Quando verifica que yearMonth alterou ou a modal fechou ou abriu faz uma nova consulta
  }, [yearMonth, modified, changeFilter])
  const handleClickDeleted = async (id) => {
    const status = await ServiceHttp.remove(id);
    setModified(status)
  }
  const handleFiler = (filter) => {
    setChangeFilter(filter)
  }
  // Verifica as datas
  const handleGetAll = (event) => {
    setYearMonth(event)
  }

  const handleModified = async (modal) => {
    setModified(modal)
  }

  return (
    <div className="container center">
      <h2>CFP</h2>

      <Select onChange={handleGetAll} />
      <Balance transanctions={current} />
      <Report
        transanctions={current}
        deleted={handleClickDeleted}
        modal={handleModified}
        filter={handleFiler}
      />
      <p>Feito por <a href="https://www.linkedin.com/in/thiagorodrig/" target="_blank">Thiago Rodrigues </a></p>
    </div>
  )
}

