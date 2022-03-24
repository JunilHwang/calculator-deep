import { CalculatorContainer } from "./components";
import { NEW_CALCULATOR, store } from "./store";

export function App() {
  const { calculatorWindow } = store.state;

  if (calculatorWindow.length === 0) {
    store.commit(NEW_CALCULATOR);
    return "";
  }

  return Object.keys(calculatorWindow)
    .map(Number)
    .map((index) => CalculatorContainer({ index }))
    .join("");
}
