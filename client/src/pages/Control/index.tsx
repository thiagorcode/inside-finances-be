import React, { useState, useEffect } from 'react';
import MobileMenu from '../../components/MobileMenu';

import ServiceHttp from '../../services/TransactionService';

import './checking.css';

interface ITransaction {
  report: {
    day: string;
    category: string;
    description: string;
    value: string;
    type: string;
    id: string;
  }[];
}
const Dashboard: React.FC = () => {
  const time = new Date();
  const currentYear = time.getFullYear();
  const currentMonth = +time.getMonth();

  const [current, setCurrent] = useState({});
  const [modified, setModified] = useState({});
  const [yearMonth, setYearMonth] = useState<string>(
    `${currentYear}-${currentMonth}`,
  );
  const [changeFilter, setChangeFilter] = useState('');

  useEffect(() => {
    const getAll = async (yearMonth: string) => {
      const currentTrasanction = await ServiceHttp.getAll(yearMonth);
      const { report }: ITransaction = currentTrasanction.data;
      const investigate = report
        .map(report => {
          return {
            ...report,
            value: parseFloat(report.value),
          };
        })
        .filter(inv => {
          return (
            inv.description.toLowerCase().indexOf(changeFilter.toLowerCase()) >
            -1
          );
        });

      const newData = { length: investigate.length, report: investigate };
      setCurrent(newData);
    };
    getAll(yearMonth);
    // Quando verifica que yearMonth alterou ou a modal fechou ou abriu faz uma nova consulta
  }, [yearMonth, modified, changeFilter]);

  const handleClickDeleted = async (id: string) => {
    const status = await ServiceHttp.remove(id);
    setModified(status);
  };
  const handleFilter = (filter: string) => {
    setChangeFilter(filter);
  };
  // Verifica as datas
  const handleGetAll = (event: string) => {
    setYearMonth(event);
    console.log(current);
  };

  const handleModified = async (modal: string) => {
    setModified(modal);
  };

  return (
    <div className="container center">
      <h2>WebFinances</h2>

      <p>
        Feito com S2 por{' '}
        <a href="https://www.linkedin.com/in/thiagorodrig/" target="_blank">
          Thiago Rodrigues{' '}
        </a>
      </p>
      <MobileMenu />
    </div>
  );
};

export default Dashboard;
