import { CalculatorNumberPad } from "./CalculatorNumberPad";
import { CalculatorScreen } from "./CalculatorScreen";
import { CalculatorWindowControl } from "./CalculatorWindowControl";

export function CalculatorContainer() {
  return `
    <div class="calculator">
      ${CalculatorWindowControl()}
    
      ${CalculatorScreen()}
    
      ${CalculatorNumberPad()}
    </div>
  `;
}
