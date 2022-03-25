import { addEvent } from "../@core";

interface Props {
  hide: () => void;
  index: number;
}

export function CalculatorWindowControl({ hide, index }: Props) {
  addEvent<MouseEvent>("click", `.hide[data-index="${index}"]`, (e) => {
    e.preventDefault();
    hide();
  });

  return `
    <div class="header">
      <a href="#" class="close" data-index="${index}">×</a>
      <a href="#" class="hide" data-index="${index}">-</a>
    </div>
  `;
}
