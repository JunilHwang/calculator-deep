import { describe, expect, it } from "vitest";
import { Operator } from "../../src/domain/Operator";

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
      expect(Operator.PLUS.calulate(x, y)).toBe(x + y);
    });
    it("뺄셈", () => {
      expect(Operator.SUBTRACT.calulate(x, y)).toBe(x - y);
    });
    it("나눗셈", () => {
      expect(Operator.DIVISION.calulate(x, y)).toBe(x / y);
    });
    it("곱셈", () => {
      expect(Operator.MULTIPLY.calulate(x, y)).toBe(x * y);
    });
  });

  describe("연산자 확장", () => {
    it("제곱 연산", () => {
      const operator = new Operator("^", (x, y) => x ** y);
      expect(operator.calulate(2, 0)).toBe(1);
      expect(operator.calulate(2, 1)).toBe(2);
      expect(operator.calulate(2, 2)).toBe(2 * 2);
      expect(operator.calulate(2, 3)).toBe(2 * 2 * 2);
      expect(operator.calulate(2, 4)).toBe(2 * 2 * 2 * 2);
      expect(operator.calulate(2, 5)).toBe(2 * 2 * 2 * 2 * 2);
      expect(operator.calulate(2, 6)).toBe(2 * 2 * 2 * 2 * 2 * 2);
      expect(operator.calulate(2, 7)).toBe(2 * 2 * 2 * 2 * 2 * 2 * 2);
      expect(operator.calulate(2, 8)).toBe(2 * 2 * 2 * 2 * 2 * 2 * 2 * 2);
    });

    it("나머지 연산", () => {
      const operator = new Operator("%", (x, y) => x % y);
      expect(operator.calulate(3, 1)).toBe(1);
      expect(operator.calulate(3, 2)).toBe(2);
      expect(operator.calulate(3, 3)).toBe(0);
      expect(operator.calulate(3, 4)).toBe(1);
      expect(operator.calulate(3, 5)).toBe(2);
      expect(operator.calulate(3, 6)).toBe(0);
    });
  });
});
