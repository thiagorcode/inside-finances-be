import React from 'react'
import helperCalculated from "./helpers/Calculated"

import css from "./style.module.css";


export default function Balance({ transanctions }) {

   const result = helperCalculated.result(transanctions)

   return (
      <div className={css.flexRow}>
         <p>Lançamento: <span>{transanctions.length || 0}</span> </p>
         <p>Receita:<span style={{ color: "#26A69A" }}>R$ {result.some}</span>  </p>
         <p>Despesa:<span style={{ color: "red" }}>R$ {result.negative}</span> </p>
         <p>Saldo: <span style={{ color: "#26A69A" }}>R$ {result.total}</span> </p>
      </div>
   )
}

