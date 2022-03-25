import { addEvent, useMemo, useState } from "../@core";
import { CalculatorNumberPad } from "./CalculatorNumberPad";
import { CalculatorScreen } from "./CalculatorScreen";
import { CalculatorWindowControl } from "./CalculatorWindowControl";
import { REMOVE_CALCULATOR, SET_STRING_CALCULATOR, store } from "../store";

interface Props {
  index: number;
}

export function CalculatorContainer({ index }: Props) {
  const [hiding, setHiding] = useState(false);
  const [currentNumber, setCurrentNumber] = useState("0");

  const stringCalculator = useMemo(
    () => store.state.calculators[index],
    [index]
  );

  function hide() {
    setHiding(true);
  }

  function show() {
    setHiding(false);
  }

  function close() {
    store.commit(REMOVE_CALCULATOR, index);
  }

  function pushNumber(n: number) {
    stringCalculator.push(n);
    store.commit(SET_STRING_CALCULATOR, {
      stringCalculator,
      index,
    });
  }

  function appendNumberString(character: string) {
    const newNumber = currentNumber + character;
    if (isNaN(Number(newNumber))) return;
    setCurrentNumber(newNumber);
  }

  function reset() {
    stringCalculator.reset();
    setCurrentNumber("0");
  }

  addEvent("click", `[data-index="${index}"] .hide-box`, show);

  return `
    <div class="calculator ${hiding ? "hiding" : ""}" data-index="${index}">
      ${hiding ? `<button class="hide-box">계산기 ${index + 1}</button>` : ""}
    
      ${CalculatorWindowControl({ hide, close, index })}
    
      ${CalculatorScreen({ currentNumber })}
    
      ${CalculatorNumberPad({ index, pushNumber, appendNumberString, reset })}
    </div>
  `;
}
