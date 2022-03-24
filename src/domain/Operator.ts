export class Operator {
  public static ADD = new Operator("+", (x, y) => x + y);
  public static SUBTRACT = new Operator("-", (x, y) => x - y);
  public static MULTIPLY = new Operator("X", (x, y) => x * y);
  public static DIVISION = new Operator("/", (x, y) => x / y);

  constructor(
    private readonly _operator: string,
    private readonly _calculate: (x: number, y: number) => number
  ) {}

  public get operator() {
    return this._operator;
  }

  public get calculate() {
    return this._calculate;
  }
}
