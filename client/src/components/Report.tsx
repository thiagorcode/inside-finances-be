import React, { useState } from 'react';
import ModalGrade from './ModalGrade';
import Action from './Action';
import Spinner from '../helpers/Spinner';

import css from "../helpers/report.module.css";
import format from "../helpers/formatHelpers";

export default function Report({ transanctions, deleted, modal, filter }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [identifier, setIdentifier] = useState(0);

  const report = transanctions !== 0 ? transanctions
    .report
    .map(transanction => {
      return { ...transanction, isDeleted: true }
    })
    .sort((a, b) => {
      return a.day - b.day;
    })
    : 0;
  let idKey = 0
  // * Realiza operações com o modal
  const handleModal = (edit, id) => {
    setIdentifier(id)
    setChange(edit)
    setIsModalOpen(true)
    modal(true)
  }

  const handleClose = () => {
    setIsModalOpen(false);
    modal(false)
  };

  const handleClickDeleted = (id) => {
    deleted(id)
  }

  const handleChangeFilter = (event) => {
    filter(event.target.value)
  }
  return (
    <div>
      <div className="row">
        <button
          className="btn waves-effect waves-ligh col s3"
          style={{ zIndex: "0" }}
          onClick={() => handleModal(false)}
        >+ Novo Lançamento</button>
        <input
          className="col s9"
          type="text"
          placeholder="Filtro"
          onChange={handleChangeFilter}
        />
      </div>
      {report === 0 ? <Spinner /> : report.map(transanction => {
        const {
          day,
          category,
          description,
          value,
          type,
          id,
        } = transanction;
        return (

          <div className={css.flexRow}
            style={type === "-" ? styles.backgroundNegative : styles.backgroundPositive}
            key={idKey++}>
            <div className={css.containerFlex}>
              <span style={styles.bold}>{day <= 9 ? "0" + day : day}</span>
              <div className={css.flexColumn}>
                <span style={styles.bold}>{category}</span>
                <span>{description}</span>
              </div>
            </div>
            <div className={css.containerValue}>
              <span style={styles.bold}>R$ {format.formatNumber(value)}</span>
              <Action
                id={id}
                deleted={handleClickDeleted}
                edit={() => handleModal(true, id)}
              />

            </div>
          </div>
        )
      })}
      {isModalOpen && (
        <ModalGrade
          change={change}
          onClose={handleClose}
          identifier={identifier}
        />
      )
      }
    </div>
  )
}

const styles = {
  backgroundPositive: {
    padding: "15px",
    margin: "5px 0",
    backgroundColor: "#A1F0DC"
  },
  backgroundNegative: {
    padding: "15px",
    margin: "5px 0",
    backgroundColor: "#F0A1A8"
  },
  bold: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    padding: "0 5px"
  }
}
