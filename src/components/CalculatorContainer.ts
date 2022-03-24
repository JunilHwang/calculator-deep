import { CalculatorNumberPad } from "./CalculatorNumberPad";
import { CalculatorScreen } from "./CalculatorScreen";
import { CalculatorWindowControl } from "./CalculatorWindowControl";
import { HIDE_CALCULATOR, REMOVE_CALCULATOR, store } from "../store";

interface Props {
  index: number;
}

export function CalculatorContainer({ index }: Props) {
  const { stringCalculator } = store.state.calculatorWindow[index];

  function hide() {
    store.commit(HIDE_CALCULATOR, index);
  }

  function close() {
    store.commit(REMOVE_CALCULATOR, index);
  }

  return `
    <div class="calculator">
      ${CalculatorWindowControl({ hide, close })}
    
      ${CalculatorScreen()}
    
      ${CalculatorNumberPad()}
    </div>
  `;
}
