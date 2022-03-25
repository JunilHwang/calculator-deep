import { Operator } from "../@domain";
import { addEvent, useMemo } from "../@core";

interface Props {
  index: number;
  appendNumberString: (c: string) => void;
  reset: () => void;
  pushNumberAndOperator: (operator: string) => void;
  calculate: () => void;
}

export function CalculatorNumberPad({
  index,
  appendNumberString,
  reset,
  pushNumberAndOperator,
  calculate,
}: Props) {
  const numbers = useMemo(
    () =>
      Array(9)
        .fill(1)
        .map((v, k) => v + k)
        .reverse(),
    []
  );

  const RESET_SYMBOL = "C";

  addEvent<{ target: HTMLElement }>(
    "click",
    `[data-index="${index}"] .numbers button`,
    ({ target }) => {
      appendNumberString(target.innerHTML);
    }
  );

  addEvent<{ target: HTMLElement }>(
    "click",
    `[data-index="${index}"] .operators button`,
    ({ target }) => {
      const symbol = target.innerHTML;
      switch (symbol) {
        case RESET_SYMBOL:
          return reset();
        case Operator.EQUALS:
          return calculate();
        default:
          pushNumberAndOperator(symbol);
          break;
      }
    }
  );

  return `
    <div class="number-pad-container">
      <div class="operators rows">
        <button type="button" class="reset">${RESET_SYMBOL}</button>
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
