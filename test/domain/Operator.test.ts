import { describe, expect, it } from "vitest";
import { Operator } from "../../src/domain/Operator";

describe("연산자 테스트", () => {
  const x = 10;
  const y = 4;
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
});
