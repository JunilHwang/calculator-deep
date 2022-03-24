interface Props {
  hide: () => void;
  close: () => void;
}

export function CalculatorWindowControl({ hide, close }: Props) {
  return `
    <div class="header">
      <a href="#" class="close">×</a>
      <a href="#" class="hide">-</a>
    </div>
  `;
}
