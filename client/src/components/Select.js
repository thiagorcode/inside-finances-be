import React, { useState, useEffect } from 'react'
import css from "./style.module.css"

export default function Select({ onChange }) {
   const [period, setPeriod] = useState([]);
   const [currentPeriod, setCurrentPeriod] = useState(0);
   const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
   const years = [2019, 2020, 2021, 2022];

   useEffect(() => {
      const select = Array.from(document.querySelectorAll("select"))
      setPeriod(select[0])
   }, [setPeriod, setCurrentPeriod])


   const handleSelect = (event) => {
      setCurrentPeriod(period.selectedIndex)
      onChange(period.value); // Devolve para APP os dados do select (value dos options)
   }
   const handleClickButton = ({ target }) => {
      if (target.value === ">") {
         ++period.selectedIndex
         setCurrentPeriod(period.selectedIndex);
      } else {
         --period.selectedIndex
         setCurrentPeriod(period.selectedIndex)
      }
      handleSelect();
   }

   return (
      <div className={css.container} >
         <button
            className="btn waves-effect waves-ligh"
            style={{ zIndex: "0" }}
            onClick={handleClickButton}
            value="<"
            disabled={currentPeriod > 0 ? false : true}
         >{"<"}
         </button>
         <select
            className={css.select}
            onChange={handleSelect}
            value={currentPeriod.value}
         >
            {
               years.map(year => {
                  return (
                     months.map((month, index) => {
                        return (
                           <option
                              key={`${year}${index}`}
                              value={`${year}-${++index <= 9 ? "0" + index : index}`}
                           >
                              {`${month}/${year}`}
                           </option>
                        )
                     })
                  )
               })
            }
         </select>
         <button
            className="btn waves-effect waves-ligh"
            style={{ zIndex: "0" }}
            onClick={handleClickButton}
            value=">"
            disabled={currentPeriod < 35 ? false : true}
         >{">"}
         </button>
      </ div>
   )
}

