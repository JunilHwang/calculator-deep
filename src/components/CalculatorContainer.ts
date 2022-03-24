import { Operator } from "../domain";

export function CalculatorContainer() {
  return `
    <div class="calculator">
      <div class="header">
        <a href="#" class="close">×</a>
        <a href="#" class="hide">-</a>
      </div>
    
      <div class="number-screen"></div>
    
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
          <button type="button">9</button>
          <button type="button">8</button>
          <button type="button">7</button>
          <button type="button">6</button>
          <button type="button">5</button>
          <button type="button">4</button>
          <button type="button">3</button>
          <button type="button">2</button>
          <button type="button">1</button>
          <button class="big" type="button">0</button>
          <button type="button">.</button>
        </div>
      </div>
    </div>
  `;
}
