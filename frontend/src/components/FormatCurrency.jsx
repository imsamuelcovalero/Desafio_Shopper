// cria e exporta a função formatCurrency
export default function formatCurrency(value) {
  // Verifique se value pode ser convertido em um número
  const parsedValue = parseFloat(String(value).replace(',', '.'));
  if (Number.isNaN(parsedValue)) {
    // Se não puder, retorne uma string vazia ou alguma outra indicação de erro
    return '';
  }

  // Se puder, formate como moeda e retorne
  const currencyOnString = parsedValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  const currency = `${currencyOnString}`;

  return currency;
}
