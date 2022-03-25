import { CalculatorContainer } from "./components";
import { NEW_CALCULATOR, store } from "./store";
import { addEvent } from "./@core";

export function App() {
  const { calculators } = store.state;

  function appendCalculator() {
    store.commit(NEW_CALCULATOR);
  }

  if (calculators.length === 0) {
    appendCalculator();
    return "";
  }

  addEvent("click", ".appender", () => {
    appendCalculator();
  });

  return `
    <ul class="calculator-wrap">
      ${Object.keys(calculators)
        .map(Number)
        .map((index) => `<li>${CalculatorContainer({ index })}</li>`)
        .join("")}
      
      <li>
        <button class="appender"></button>
      </li>
    </ul>
  `;
}
