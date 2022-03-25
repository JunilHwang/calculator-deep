import { Operator } from "./Operator";
import {
  InvalidCalculatorExecuteException,
  InvalidNumberExecuteException,
} from "./exceptions";

export class StringCalculator {
  #stack!: number[];
  #record!: Array<number | string>;
  #operator?: string;

  constructor() {
    this.reset();
  }

  public reset() {
    this.#stack = [];
    this.#record = [];
    this.#operator = undefined;
  }

  public push(value: number | string) {
    const number = Number(value);
    if (isNaN(number)) {
      throw new InvalidNumberExecuteException();
    }
    if (this.#stack.length === 0) {
      this.#stack.push(number);
    } else {
      this.#stack[1] = number;
    }
  }

  public set operator(symbol: string) {
    this.#operator = Operator.valueOf(symbol).symbol;
  }

  public execute(): number {
    const operator = this.#operator;
    const record = this.#record;
    const [x, y] = this.#stack;

    if ([x, y, operator].includes(undefined)) {
      throw new InvalidCalculatorExecuteException();
    }

    const result = Operator.calculate(operator!, x, y);
    this.#stack = [result, y];

    if (record.length === 0) {
      record.push(x);
    }
    record.push(operator!, y);

    return result;
  }

  public get record() {
    return Array.from(this.#record);
  }
}
