import React, { useState, useEffect } from 'react'
import Modal from "react-modal"

import ServiceHttp from "../services/TransactionService";
import css from "./helpers/modal.module.css";
import format from "../components/helpers/formatHelpers"

Modal.setAppElement('#root')

export default function ModalGrade({ onClose, identifier, change }) {
   // Style modal
   const customStyles = {
      content: {
         top: '50%',
         left: '50%',
         right: 'auto',
         bottom: 'auto',
         marginRight: '-50%',
         transform: 'translate(-50%, -50%)'
      }
   };
   const initialForm = {
      description: '',
      type: '',
      value: '',
      category: '',
      year: '',
      month: '',
      day: '',
      yearMonth: '',
      yearMonthDay: '',
   };

   const [gradeForm, setGradeForm] = useState(initialForm);
   // Busca os dados para preencher os campos do modal
   const getData = async (id) => {
      const find = await ServiceHttp.findOne(id) // Todo: Analisar funções assim para o effect
      setGradeForm(find.data.report)
   }

   useEffect(() => {
      if (change) getData(identifier)
   }, [identifier])

   let valueDate = ""
   const handleInputChange = (event) => {
      const { name, value } = event.target;
      if (name === "number") {
         const newValue = format.formatNumber(value)
         setGradeForm({ ...gradeForm, [name]: newValue });
         return
      }
      // * Tira os - de date separa campo YYYY-MM-DD
      if (name === "date") {
         valueDate = value.split("-");
         setGradeForm({
            ...gradeForm,
            day: parseInt(valueDate[2]),
            month: parseInt(valueDate[1]),
            year: parseInt(valueDate[0]),
            yearMonth: `${valueDate[0]}-${valueDate[1]}`,
            yearMonthDay: value
         });
         return
      }
      setGradeForm({ ...gradeForm, [name]: value });
   }

   const handleFormSubmit = async (event) => {
      event.preventDefault();

      const data = {
         description: gradeForm.description,
         type: gradeForm.type,
         value: parseInt(gradeForm.value),
         category: gradeForm.category,
         year: gradeForm.year,
         month: gradeForm.month,
         day: gradeForm.day,
         yearMonth: gradeForm.yearMonth,
         yearMonthDay: gradeForm.yearMonthDay,
      };
      const status = await ServiceHttp.create(data);
      console.log(status) // TODO: Colocar uma mensagem que fale que foi efetuado com sucesso

      onClose(null);
   }
   const handleClickUpdate = async (event) => {
      event.preventDefault();

      const data = {
         description: gradeForm.description,
         type: gradeForm.type,
         value: parseFloat(gradeForm.value),
         category: gradeForm.category,
         year: gradeForm.year,
         month: gradeForm.month,
         day: gradeForm.day,
         yearMonth: gradeForm.yearMonth,
         yearMonthDay: gradeForm.yearMonthDay,
      };
      const status = await ServiceHttp.update(gradeForm.id, data)
      console.log(status) // TODO: Colocar uma mensagem que fale que foi efetuado com sucesso

      onClose(null);
   }
   const handleModalClose = () => {
      onClose(null);
   };

   return (
      <div  >
         <Modal
            isOpen={true}
            style={customStyles}
         >
            <div className={css.row}>
               <div className={css.menu} >
                  <h3 className="">
                     {
                        !change ? "Novo Lançamento" : "Editar Lançamento"
                     }
                  </h3>
                  <button className="waves-effect waves-lights btn red dark-4"
                     onClick={handleModalClose}>X</button>
               </div>
               <form onSubmit={!change ? handleFormSubmit : handleClickUpdate}>
                  <div className={css.select}>
                     <p>
                        <label>
                           <input
                              name="type"
                              type="radio"
                              value="-"
                              required
                              disabled={change ? true : false}
                              checked={change && gradeForm.type === "-" ? true : null}
                              onChange={handleInputChange}
                           />
                           <span style={{ fontSize: "22px" }}>Despesa</span>
                        </label>
                     </p>
                     <p>
                        <label>
                           <input
                              name="type"
                              type="radio"
                              value="+"
                              required
                              disabled={change ? true : false}
                              checked={change && gradeForm.type === "+" ? true : null}
                              onChange={handleInputChange}
                           />
                           <span style={{ fontSize: "22px" }}>Receita</span>
                        </label>
                     </p>
                  </div>
                  <div className="input-field">
                     <input
                        type="text"
                        required
                        name="category"
                        id="category"
                        onChange={handleInputChange}
                        value={gradeForm.category}
                     />
                     <label htmlFor="category" className="active">Categoria:</label>
                  </div>
                  <div className="input-field">
                     <input
                        type="text"
                        id="description"
                        required
                        name="description"
                        onChange={handleInputChange}
                        value={gradeForm.description}
                     />
                     <label htmlFor="description" className="active">Descrição:</label>

                  </div>
                  <div className="row">
                     <div className="input-field col s6">
                        <input
                           type="number"
                           id="value"
                           required
                           name="value"
                           min="0"
                           step="0.05"
                           onChange={handleInputChange}
                           value={gradeForm.value}
                        />
                        <label htmlFor="value" className="active">Valor:</label>
                     </div>
                     <div className="input-field col s6">
                        <input
                           type="date"
                           name="date"
                           required
                           id="date"
                           onChange={handleInputChange}
                           value={gradeForm.yearMonthDay}
                        />
                        <label htmlFor="date" className="active">Data:</label>
                     </div>
                  </div>
                  <button className="btn waves-effect waves-ligh col s3" >Enviar</button>
               </form>
            </div>
         </Modal>
      </div>
   )
}
