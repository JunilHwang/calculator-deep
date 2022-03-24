import { beforeAll, describe, expect, it } from "vitest";
import {
  InvalidCalculatorExecuteException,
  Operator,
  StringCalculator,
} from "../../src/domain";

describe("문자열 계산기 테스트", () => {
  let stringCalculator;
  beforeAll(() => {
    stringCalculator = new StringCalculator();
  });

  describe("검증", () => {
    it("입력 받은게 아예 없을 경우 오류 발생", () => {
      expect(() => stringCalculator.execute()).toThrow(
        InvalidCalculatorExecuteException
      );
    });

    it("입력 받은 숫자 없이 실행할 경우 오류 발생", () => {
      stringCalculator.operator = Operator.ADD;

      expect(() => stringCalculator.execute()).toThrow(
        InvalidCalculatorExecuteException
      );
    });

    it("입력 받은 연산자 없이 실행할 경우", () => {
      stringCalculator.push("1");
      stringCalculator.push("2");
      expect(() => stringCalculator.execute()).toThrow(
        InvalidCalculatorExecuteException
      );
    });
  });

  describe("형변환", () => {
    it("문자열 > 숫자: 1", () => {
      stringCalculator.push("1");
      expect(stringCalculator.record).toBe([1]);
    });

    it("문자열 > 숫자: -1", () => {
      stringCalculator.push("-1");
      expect(stringCalculator.record).toBe([-1]);
    });

    it("문자열 > 숫자: 1.123", () => {
      stringCalculator.push("1.123");
      expect(stringCalculator.record).toBe([1.123]);
    });

    it("숫자 > 숫자", () => {
      stringCalculator.push(1);
      expect(stringCalculator.record).toBe([1]);
    });
  });

  describe("덧셈", () => {
    it("1 + 2 = 3", () => {
      stringCalculator.push("1");
      stringCalculator.push("2");
      stringCalculator.operator = Operator.ADD;
      expect(stringCalculator.execute()).toBe(3);
      expect(stringCalculator.record).toBe([1]);
    });

    it("1 + 2 + 3 = 6", () => {
      stringCalculator.push("1");
      stringCalculator.push("2");
      stringCalculator.operator = Operator.ADD;
      expect(stringCalculator.execute()).toBe(3);
      stringCalculator.push("3");
      expect(stringCalculator.execute()).toBe(6);
      expect(stringCalculator.record).toBe("1 + 2 + 3 = 6");
    });
  });

  describe("뺄셈", () => {
    it("1 - 2 = -1", () => {
      stringCalculator.push("1");
      stringCalculator.push("2");
      stringCalculator.operator = Operator.SUBTRACT;
      expect(stringCalculator.execute()).toBe(-1);
      expect(stringCalculator.record).toBe("1 - 2 = -1");
    });

    it("1 - 2 - 3 = -5", () => {
      stringCalculator.push("1");
      stringCalculator.push("2");
      stringCalculator.operator = Operator.ADD;
      expect(stringCalculator.execute()).toBe(-1);
      stringCalculator.push("3");
      expect(stringCalculator.execute()).toBe(-5);
      expect(stringCalculator.record).toBe("1 - 2 - 3 = -5");
    });
  });

  describe("곱셈", () => {
    it("2 X 3 = 6", () => {
      stringCalculator.push("2");
      stringCalculator.push("3");
      stringCalculator.operator = Operator.MULTIPLY;
      expect(stringCalculator.execute()).toBe(6);
      expect(stringCalculator.record).toBe("2 X 3 = 6");
    });

    it("2 X 3 X 4 = 24", () => {
      stringCalculator.push("2");
      stringCalculator.push("3");
      stringCalculator.operator = Operator.MULTIPLY;
      expect(stringCalculator.execute()).toBe(6);
      stringCalculator.push("4");
      expect(stringCalculator.execute()).toBe(24);
      expect(stringCalculator.record).toBe("2 X 3 = 6");
    });
  });

  describe("나눗셈", () => {
    it("2 / 4 = 0.5", () => {
      stringCalculator.push("2");
      stringCalculator.push("3");
      stringCalculator.operator = Operator.DIVISION;
      expect(stringCalculator.execute()).toBe(0.5);
      expect(stringCalculator.record).toBe("2 / 3 = 1.5");
    });

    it("2 / 4 / 0.5 = 1", () => {
      stringCalculator.push("2");
      stringCalculator.push("4");
      stringCalculator.operator = Operator.MULTIPLY;
      expect(stringCalculator.execute()).toBe(0.5);
      stringCalculator.push("0.5");
      expect(stringCalculator.execute()).toBe(1);
      expect(stringCalculator.record).toBe("2 / 4 / 0.5 = 1");
    });
  });

  it("이전 연산 중복 수행", () => {
    stringCalculator.push("2");
    stringCalculator.push("3");
    stringCalculator.operator = Operator.ADD;
    expect(stringCalculator.execute()).toBe(5);
    expect(stringCalculator.execute()).toBe(8);
    expect(stringCalculator.execute()).toBe(11);
    expect(stringCalculator.record).toBe([
      2,
      Operator.ADD,
      3,
      Operator.ADD,
      3,
      Operator.ADD,
      3,
    ]);
  });

  it("계산기 리셋", () => {
    stringCalculator.push("2");
    stringCalculator.push("3");
    stringCalculator.operator = Operator.ADD;
    expect(stringCalculator.execute()).toBe(5);
    expect(stringCalculator.record).toBe([2, Operator.ADD, 3]);

    stringCalculator.reset();
    expect(stringCalculator.record).toBe([]);

    expect(() => stringCalculator.execute()).toThrow(
      InvalidCalculatorExecuteException
    );
  });
});
