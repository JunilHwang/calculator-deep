import {
  InvalidOperatorConstructException,
  InvalidOperatorParamException,
} from "./exceptions";

export class Operator {
  public static ADD = new Operator("+", (x, y) => x + y);
  public static SUBTRACT = new Operator("-", (x, y) => x - y);
  public static MULTIPLY = new Operator("X", (x, y) => x * y);
  public static DIVISION = new Operator("/", (x, y) => x / y);

  constructor(
    private readonly _operator: string,
    private readonly _calculate: (x: number, y: number) => number
  ) {
    if (_operator === undefined || _calculate === undefined) {
      throw new InvalidOperatorConstructException();
    }
  }

  public get operator() {
    return this._operator;
  }

  public calculate(x: number, y: number) {
    if (x === undefined || y === undefined) {
      throw new InvalidOperatorParamException();
    }
    return this._calculate(x, y);
  }
}
