import format from "./formatHelpers";
// * Realiza a soma dos valores de Receita, Despesa, total @
const result = (transanctions, value, type) => {
   console.log(value)
   const newBalance = { ...value, ...type }
   console.log(newBalance)
   let negative = 0
   let some = 0
   let total = 0
   if (transanctions !== 0) {
      let CurrentBalance = transanctions.report.map(transaction => {
         const { value, type } = transaction;
         return {
            value: parseFloat(value),
            type,
         }
      })
      console.log(CurrentBalance)
      some = CurrentBalance.reduce((acc, curr) => {
         return curr.type === "+" ? acc + curr.value : acc + 0;

      }, 0);

      negative = CurrentBalance.reduce((acc, curr) => {
         return curr.type === "-" ? acc + curr.value : acc + 0;

      }, 0);

      total = some - negative;

      return {
         negative: format.formatNumber(negative),
         some: format.formatNumber(some),
         total: format.formatNumber(total),
      }
   }
   else {
      return { some, negative, total }
   }
}

export default { result }