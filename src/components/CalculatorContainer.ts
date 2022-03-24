import { CalculatorNumberPad } from "./CalculatorNumberPad";
import { CalculatorScreen } from "./CalculatorScreen";
import { CalculatorWindowControl } from "./CalculatorWindowControl";

interface Props {
  index: number;
}

export function CalculatorContainer({ index }: Props) {
  console.log(index);

  return `
    <div class="calculator">
      ${CalculatorWindowControl()}
    
      ${CalculatorScreen()}
    
      ${CalculatorNumberPad()}
    </div>
  `;
}
