import { CalculatorNumberPad } from "./CalculatorNumberPad";
import { CalculatorScreen } from "./CalculatorScreen";
import { CalculatorWindowControl } from "./CalculatorWindowControl";
import { addEvent, useState } from "../@core";

interface Props {
  index: number;
}

export function CalculatorContainer({ index }: Props) {
  const [hiding, setHiding] = useState(false);

  function hide() {
    setHiding(true);
  }

  function show() {
    setHiding(false);
  }

  addEvent("click", `[data-index="${index}"] .hide-box`, show);

  return `
    <div class="calculator ${hiding ? "hiding" : ""}" data-index="${index}">
      ${hiding ? `<button class="hide-box">계산기 ${index + 1}</button>` : ""}
    
      ${CalculatorWindowControl({ hide, index })}
    
      ${CalculatorScreen()}
    
      ${CalculatorNumberPad()}
    </div>
  `;
}
