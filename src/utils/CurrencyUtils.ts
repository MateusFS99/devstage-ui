export function formatNumberToBrlCurrency(value: number): string {
  if (value === 0) return 'Gratuito'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
