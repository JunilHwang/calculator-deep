interface Props {
  currentNumber: string;
}

export function CalculatorScreen({ currentNumber }: Props) {
  const [natural, decimal] = currentNumber.split(".");
  const formatNumber = Number(natural).toLocaleString();
  const prefix = decimal !== undefined ? `.${decimal.substring(0, 5)}` : "";

  return `
    <div class="number-screen">${formatNumber + prefix}</div>
  `;
}
