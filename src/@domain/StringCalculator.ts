import { Operator } from "./Operator";
import {
  InvalidCalculatorExecuteException,
  InvalidNumberExecuteException,
} from "./exceptions";

export class StringCalculator {
  private stack!: number[];
  private _record!: Array<number | string>;
  private _operator?: string;

  constructor() {
    this.reset();
  }

  public reset() {
    this.stack = [];
    this._record = [];
    this._operator = undefined;
  }

  public push(value: number | string) {
    const number = Number(value);
    if (isNaN(number)) {
      throw new InvalidNumberExecuteException();
    }
    if (this.stack.length === 0) {
      this.stack.push(number);
    } else {
      this.stack[1] = number;
    }
  }

  public set operator(symbol: string) {
    this._operator = Operator.valueOf(symbol).symbol;
  }

  public execute(): number {
    const { stack, _operator, _record } = this;
    const [x, y] = stack;
    if ([x, y, _operator].includes(undefined)) {
      throw new InvalidCalculatorExecuteException();
    }

    const result = Operator.calculate(_operator!, x, y);
    this.stack = [result, y];

    if (_record.length === 0) {
      _record.push(x);
    }
    _record.push(_operator!, y);

    return result;
  }

  public get record() {
    return Array.from(this._record);
  }
}
