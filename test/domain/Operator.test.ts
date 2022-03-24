import { describe, expect, it } from "vitest";
import { Operator } from "../../src/domain";

describe("연산자 테스트", () => {
  const x = 10;
  const y = 4;

  describe("덧셈, 뺄셈, 나눗셈, 곱셈 심볼 검사", () => {
    it("덧셈 = +", () => {
      expect(Operator.PLUS.operator).toBe("+");
    });
    it("뺄셈 = -", () => {
      expect(Operator.SUBTRACT.operator).toBe("-");
    });
    it("나눗셈 = /", () => {
      expect(Operator.DIVISION.operator).toBe("/");
    });
    it("곱셈 = X", () => {
      expect(Operator.MULTIPLY.operator).toBe("X");
    });
  });

  describe("덧셈, 뺄셈, 나눗셈, 곱셈을 지원", () => {
    it("덧셈", () => {
      expect(Operator.PLUS.calculate(x, y)).toBe(x + y);
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
});
