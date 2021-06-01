export default function ConvertCurrency(value) {
  return value?.toLocaleString('pt-br', {minimumFractionDigits: 2});
}
