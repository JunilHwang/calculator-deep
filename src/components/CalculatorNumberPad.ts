import { Operator } from "../domain";
import { addEvent, useMemo } from "../@core";

interface Props {
  index: number;
  pushNumber: (n: number) => void;
  appendNumberString: (c: string) => void;
}

export function CalculatorNumberPad({ index, appendNumberString }: Props) {
  const numbers = useMemo(
    () =>
      Array(9)
        .fill(1)
        .map((v, k) => v + k)
        .reverse(),
    []
  );

  addEvent<{ target: HTMLElement }>(
    "click",
    `[data-index="${index}"] .numbers button`,
    ({ target }) => {
      appendNumberString(target.innerHTML);
    }
  );

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
