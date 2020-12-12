import React from 'react'


export default function Action({ id, click, deleted, edit }) {
   // edit
   const handleClickEdi = () => {
      edit(id)
   }
   // remove

   const handleClickDel = () => {
      deleted(id)
   }

   return (
      <div>
         <button
            className="btn waves-effect waves-ligh col s3"
            style={{ zIndex: "0" }}
            onClick={handleClickEdi}
         >
            <i className="small material-icons">edit</i>
         </button>

         <button
            className="btn waves-effect waves-ligh col s3 red"
            style={{ zIndex: "0" }}
            onClick={handleClickDel}
         >
            <i className="small material-icons">delete</i>
         </button>
      </div>
   )
}
