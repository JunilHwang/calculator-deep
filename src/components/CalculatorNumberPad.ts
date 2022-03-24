import { Operator } from "../domain";

export function CalculatorNumberPad() {
  const numbers = Array(9)
    .fill(1)
    .map((v, k) => v + k)
    .reverse();

  return `
      <div class="number-pad-container">
        <div class="operators rows">
          <button type="button">C</button>
        </div>
        <div class="operators cols">
          <button type="button">${Operator.ADD.symbol}</button>
          <button type="button">${Operator.SUBTRACT.symbol}</button>
          <button type="button">${Operator.MULTIPLY.symbol}</button>
          <button type="button">${Operator.DIVISION.symbol}</button>
          <button type="button">${Operator.EQUALS}</button>
        </div>
        <div class="numbers">
          ${numbers.map((n) => `<button type="button">${n}</button>`).join("")}
          <button type="button">.</button>
          <button class="big" type="button">0</button>
        </div>
      </div>
  `;
}
