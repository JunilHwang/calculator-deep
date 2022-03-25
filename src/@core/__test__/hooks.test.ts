import { describe, expect, it } from "vitest";
import { createHooks } from "../hooks";

describe("@core/hooks.test", () => {
  describe("useState", () => {
    it("useState로 state를 만들 수 있다.", () => {
      const { useState } = createHooks(render);

      function render() {
        const [a] = useState("foo");
        const [b] = useState("bar");

        return `a: ${a}, b: ${b}`;
      }

      expect(render()).toBe(`a: foo, b: bar`);
    });

    it("setState를 실행할 경우, callback이 다시 실행된다.", () => {
      const { useState } = createHooks(callback);

      let callCount = 0;

      function callback() {
        const [, setA] = useState("foo");
        callCount += 1;
        return { setA };
      }

      const { setA } = callback();
      expect(callCount).toBe(1);

      setA("test");
      expect(callCount).toBe(2);
    });

    it("state의 값이 이전과 동일할 경우, 다시 실행되지 않는다.", () => {
      const { useState } = createHooks(callback);

      let callCount = 0;

      function callback() {
        const [, setA] = useState("foo");
        callCount += 1;
        return { setA };
      }

      const { setA } = callback();
      expect(callCount).toBe(1);

      setA("test");
      expect(callCount).toBe(2);

      setA("test");
      expect(callCount).toBe(2);
    });

    it("resetContext를 실행해줘야 값이 정상적으로 반영된다.", () => {
      const { useState, resetContext } = createHooks(callback);

      let result = "";

      function callback() {
        resetContext();

        const [a, setA] = useState("foo");
        const [b, setB] = useState("bar");

        result = `a: ${a}, b: ${b}`;

        return { setA, setB };
      }

      const { setA, setB } = callback();

      expect(result).toBe(`a: foo, b: bar`);

      setA("foo-change");

      expect(result).toBe(`a: foo-change, b: bar`);

      setB("bar-change");

      expect(result).toBe(`a: foo-change, b: bar-change`);
    });
  });

  describe("useMemo", () => {
    it("useMemo를 이용하여 값을 만들수 있다.", () => {
      const { useMemo } = createHooks(() => null);
      const memo = useMemo(() => [], []);

      expect(memo).toEqual([]);
    });

    it("useMemo로 만들어진 값은 캐싱된다.", () => {
      const { useMemo, resetContext } = createHooks(getMemo);

      function getMemo() {
        resetContext();
        return useMemo(() => [], []);
      }

      const memo1 = getMemo();
      const memo2 = getMemo();

      expect(memo1).toBe(memo2);
    });

    it("useMemo의 값을 변경하고 싶으면, 인자를 추가한다.", () => {
      const { useMemo, resetContext } = createHooks(getMemo);

      let param = 1;
      function getMemo() {
        resetContext();
        return useMemo(() => [], [param]);
      }

      const memo1 = getMemo();
      param = 2;

      const memo2 = getMemo();
      const memo3 = getMemo();
      expect(memo1).not.toBe(memo2);
      expect(memo2).toBe(memo3);
      param = 3;
      const memo4 = getMemo();
      expect(memo3).not.toBe(memo4);
    });
  });
});
