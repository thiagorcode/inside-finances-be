const formatter = Intl.NumberFormat('pt-BR');

function formatNumber(value: number) {
  return formatter.format(value);
}

export default { formatNumber };
