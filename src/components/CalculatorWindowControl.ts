import { addEvent } from "../@core";

interface Props {
  hide: () => void;
  close: () => void;
  index: number;
}

export function CalculatorWindowControl({ hide, close, index }: Props) {
  addEvent<MouseEvent>("click", `.hide[data-index="${index}"]`, (e) => {
    e.preventDefault();
    hide();
  });

  addEvent<MouseEvent>("click", `.close[data-index="${index}"]`, (e) => {
    e.preventDefault();
    close();
  });

  return `
    <div class="header">
      <a href="#" class="close" data-index="${index}">×</a>
      <a href="#" class="hide" data-index="${index}">-</a>
    </div>
  `;
}
