import { describe, expect, it } from "vitest";
import {
  InvalidOperatorConstructException,
  InvalidOperatorParamException,
  NotFoundOperatorException,
  Operator,
} from "../../src/domain";

describe("연산자 테스트", () => {
  const x = 10;
  const y = 4;

  describe("검증", () => {
    it("생성자 검증", () => {
      expect(() => new Operator(undefined, undefined)).toThrow(
        InvalidOperatorConstructException
      );
    });

    it("연산 검증", () => {
      expect(() => Operator.ADD.calculate(undefined, undefined)).toThrow(
        InvalidOperatorParamException
      );
    });
  });

  describe("덧셈, 뺄셈, 나눗셈, 곱셈 심볼 검사", () => {
    it("덧셈 = +", () => {
      expect(Operator.ADD.symbol).toBe("+");
    });
    it("뺄셈 = -", () => {
      expect(Operator.SUBTRACT.symbol).toBe("-");
    });
    it("나눗셈 = /", () => {
      expect(Operator.DIVISION.symbol).toBe("/");
    });
    it("곱셈 = X", () => {
      expect(Operator.MULTIPLY.symbol).toBe("X");
    });
  });

  describe("덧셈, 뺄셈, 나눗셈, 곱셈을 지원", () => {
    it("덧셈", () => {
      expect(Operator.ADD.calculate(x, y)).toBe(x + y);
    });

    it("뺄셈", () => {
      expect(Operator.SUBTRACT.calculate(x, y)).toBe(x - y);
    });

    it("나눗셈", () => {
      expect(Operator.DIVISION.calculate(x, y)).toBe(x / y);
    });

    it("곱셈", () => {
      expect(Operator.MULTIPLY.calculate(x, y)).toBe(x * y);
    });
  });

  describe("연산자 확장", () => {
    it("제곱 연산", () => {
      const operator = new Operator("^", (x, y) => x ** y);
      expect(operator.calculate(2, 0)).toBe(1);
      expect(operator.calculate(2, 1)).toBe(2);
      expect(operator.calculate(2, 2)).toBe(2 * 2);
      expect(operator.calculate(2, 3)).toBe(2 * 2 * 2);
      expect(operator.calculate(2, 4)).toBe(2 * 2 * 2 * 2);
      expect(operator.calculate(2, 5)).toBe(2 * 2 * 2 * 2 * 2);
      expect(operator.calculate(2, 6)).toBe(2 * 2 * 2 * 2 * 2 * 2);
      expect(operator.calculate(2, 7)).toBe(2 * 2 * 2 * 2 * 2 * 2 * 2);
      expect(operator.calculate(2, 8)).toBe(2 * 2 * 2 * 2 * 2 * 2 * 2 * 2);
    });

    it("나머지 연산", () => {
      const operator = new Operator("%", (x, y) => x % y);
      expect(operator.calculate(1, 3)).toBe(1);
      expect(operator.calculate(2, 3)).toBe(2);
      expect(operator.calculate(3, 3)).toBe(0);
      expect(operator.calculate(4, 3)).toBe(1);
      expect(operator.calculate(5, 3)).toBe(2);
      expect(operator.calculate(6, 3)).toBe(0);
    });
  });

  describe("문자열에 대한 연산 수행", () => {
    it("존재하지 않는 연산 수행시 오류 발생", () => {
      expect(() => Operator.calculate("test", 1, 2)).toThrow(
        NotFoundOperatorException
      );
    });

    it("덧셈", () => {
      expect(Operator.calculate(Operator.ADD.symbol, 1, 2)).toBe(3);
    });

    it("뺄셈", () => {
      expect(Operator.calculate(Operator.SUBTRACT.symbol, 1, 2)).toBe(-1);
    });

    it("곱셈", () => {
      expect(Operator.calculate(Operator.MULTIPLY.symbol, 2, 3)).toBe(6);
    });

    it("나눗셈", () => {
      expect(Operator.calculate(Operator.DIVISION.symbol, 3, 2)).toBe(1.5);
    });

    it("연산자 추가", () => {
      const symbol = "%";
      new Operator(symbol, (x, y) => x % y);
      expect(Operator.calculate(symbol, 1, 3)).toBe(1);
    });
  });
});
