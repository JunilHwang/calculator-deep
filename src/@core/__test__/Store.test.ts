import { describe, expect, it, beforeAll } from "vitest";
import { NotFoundActionTypeException, Store } from "../Store";

describe("저장소 코어 로직 테스트", () => {
  let store: Store<{ foo: string }>;

  beforeAll(() => {
    store = new Store({
      state: {
        foo: "bar",
      },
      mutations: {
        setFoo(state, payload) {
          state.foo = payload;
        },
      },
    });
  });

  it("값을 직접적으로 변경할 수 없음", () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      store.state = {};
    }).toThrow(TypeError);

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      store.state.foo = "test";
    }).toThrow(TypeError);
  });

  it("존재하지 않는 commit을 실행했을 때 오류 발생", () => {
    expect(() => store.commit("test")).toThrow(NotFoundActionTypeException);
  });

  it("값은 commit을 통해서만 변경 가능함", () => {
    store.commit("setFoo", "changed");

    expect(store.state.foo).toBe("changed");
  });

  it("commit이 완료되면 subscribe에 등록된 것들을 실행", () => {
    let foo = "bar";
    store.subscribe(() => {
      foo = "test";
    });
    store.commit("setFoo", "changed");

    expect(foo).toBe("test");
  });
});
