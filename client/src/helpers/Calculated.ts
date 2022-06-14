import format from './formatHelpers';
// * Realiza a soma dos valores de Receita, Despesa, total @

interface ReturnResult {
  some: number | string;
  total: number | string;
  negative: number | string;
}

const result = (transanctions): ReturnResult => {
  let negative = 0;
  let some = 0;
  let total = 0;

  if (transanctions !== 0) {
    const balance = transanctions.report.map(transaction => {
      const { value, type } = transaction;
      return {
        value: parseFloat(value),
        type,
      };
    });

    some = balance.reduce((acc, curr) => {
      return curr.type === '+' ? acc + curr.value : acc + 0;
    }, 0);

    negative = balance.reduce((acc, curr) => {
      return curr.type === '-' ? acc + curr.value : acc + 0;
    }, 0);

    total = some - negative;

    return {
      negative: format.formatNumber(negative),
      some: format.formatNumber(some),
      total: format.formatNumber(total),
    };
  } else {
    return { some, negative, total };
  }
};

export default { result };
