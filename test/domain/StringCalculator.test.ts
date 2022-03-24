import { beforeEach, describe, expect, it } from "vitest";
import {
  InvalidCalculatorExecuteException,
  InvalidNumberExecuteException,
  Operator,
  StringCalculator,
} from "../../src/domain";

describe("문자열 계산기 테스트", () => {
  let stringCalculator;
  beforeEach(() => {
    stringCalculator = new StringCalculator();
  });

  describe("검증", () => {
    it("바로 실행할 경우 오류 발생", () => {
      expect(() => stringCalculator.execute()).toThrow(
        InvalidCalculatorExecuteException
      );
    });

    it("연산자만 입력 받은 후에 실행할 경우 오류 발생", () => {
      stringCalculator.operator = Operator.ADD.symbol;

      expect(() => stringCalculator.execute()).toThrow(
        InvalidCalculatorExecuteException
      );
    });

    it("숫자 한개와 연산자만 입력 받은 후에 실행할 경우 오류 발생", () => {
      stringCalculator.push("1");
      stringCalculator.operator = Operator.ADD.symbol;

      expect(() => stringCalculator.execute()).toThrow(
        InvalidCalculatorExecuteException
      );
    });

    it("숫자가 아닌 값을 입력받을 경우 오류 발생", () => {
      expect(() => stringCalculator.push("x")).toThrow(
        InvalidNumberExecuteException
      );
    });
  });

  describe("덧셈", () => {
    it("1 + 2 = 3", () => {
      stringCalculator.push("1");
      stringCalculator.operator = Operator.ADD.symbol;
      stringCalculator.push("2");
      expect(stringCalculator.execute()).toBe(3);
      expect(stringCalculator.record).toEqual([1, Operator.ADD.symbol, 2]);
    });

    it("1 + 2 + 3 = 6", () => {
      stringCalculator.push("1");
      stringCalculator.push("2");
      stringCalculator.operator = Operator.ADD.symbol;
      expect(stringCalculator.execute()).toBe(3);
      stringCalculator.push("3");
      expect(stringCalculator.execute()).toBe(6);
      expect(stringCalculator.record).toEqual([
        1,
        Operator.ADD.symbol,
        2,
        Operator.ADD.symbol,
        3,
      ]);
    });
  });

  describe("뺄셈", () => {
    it("1 - 2 = -1", () => {
      stringCalculator.push("1");
      stringCalculator.push("2");
      stringCalculator.operator = Operator.SUBTRACT.symbol;
      expect(stringCalculator.execute()).toBe(-1);
      expect(stringCalculator.record).toEqual([1, Operator.SUBTRACT.symbol, 2]);
    });

    it("1 - 2 - 3 = -5", () => {
      stringCalculator.push("1");
      stringCalculator.push("2");
      stringCalculator.operator = Operator.SUBTRACT.symbol;
      expect(stringCalculator.execute()).toBe(-1);
      stringCalculator.push("3");
      expect(stringCalculator.execute()).toBe(-4);
      expect(stringCalculator.record).toEqual([
        1,
        Operator.SUBTRACT.symbol,
        2,
        Operator.SUBTRACT.symbol,
        3,
      ]);
    });
  });

  describe("곱셈", () => {
    it("2 X 3 = 6", () => {
      stringCalculator.push("2");
      stringCalculator.push("3");
      stringCalculator.operator = Operator.MULTIPLY.symbol;
      expect(stringCalculator.execute()).toBe(6);
      expect(stringCalculator.record).toEqual([2, Operator.MULTIPLY.symbol, 3]);
    });

    it("2 X 3 X 4 = 24", () => {
      stringCalculator.push("2");
      stringCalculator.push("3");
      stringCalculator.operator = Operator.MULTIPLY.symbol;
      expect(stringCalculator.execute()).toBe(6);
      stringCalculator.push("4");
      expect(stringCalculator.execute()).toBe(24);
      expect(stringCalculator.record).toEqual([
        2,
        Operator.MULTIPLY.symbol,
        3,
        Operator.MULTIPLY.symbol,
        4,
      ]);
    });
  });

  describe("나눗셈", () => {
    it("2 / 4 = 0.5", () => {
      stringCalculator.push("2");
      stringCalculator.push("4");
      stringCalculator.operator = Operator.DIVISION.symbol;
      expect(stringCalculator.execute()).toBe(0.5);
      expect(stringCalculator.record).toEqual([2, Operator.DIVISION.symbol, 4]);
    });

    it("2 / 4 / 0.5 = 1", () => {
      stringCalculator.push("2");
      stringCalculator.push("4");
      stringCalculator.operator = Operator.DIVISION.symbol;
      expect(stringCalculator.execute()).toBe(0.5);
      stringCalculator.push("0.5");
      expect(stringCalculator.execute()).toBe(1);
      expect(stringCalculator.record).toEqual([
        2,
        Operator.DIVISION.symbol,
        4,
        Operator.DIVISION.symbol,
        0.5,
      ]);
    });
  });

  it("이전 연산 중복 수행", () => {
    stringCalculator.push("2");
    stringCalculator.push("3");
    stringCalculator.operator = Operator.ADD.symbol;
    expect(stringCalculator.execute()).toBe(5);
    expect(stringCalculator.execute()).toBe(8);
    expect(stringCalculator.execute()).toBe(11);
    expect(stringCalculator.record).toEqual([
      2,
      Operator.ADD.symbol,
      3,
      Operator.ADD.symbol,
      3,
      Operator.ADD.symbol,
      3,
    ]);
  });

  it("계산기 리셋", () => {
    stringCalculator.push("2");
    stringCalculator.push("3");
    stringCalculator.operator = Operator.ADD.symbol;
    expect(stringCalculator.execute()).toBe(5);
    expect(stringCalculator.record).toEqual([2, Operator.ADD.symbol, 3]);

    stringCalculator.reset();
    expect(stringCalculator.record).toEqual([]);

    expect(() => stringCalculator.execute()).toThrow(
      InvalidCalculatorExecuteException
    );
  });
});
