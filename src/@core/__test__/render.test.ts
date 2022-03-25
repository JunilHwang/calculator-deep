import { beforeAll, describe, expect, it } from "vitest";
import { addEvent, render, useState } from "../render";

describe("@core/render", () => {
  let $root: HTMLDivElement;
  beforeAll(() => {
    $root = document.createElement("div");
  });

  it("render는 바로 실행되지 않는다.", () => {
    render(() => "test", $root);
    expect($root.innerHTML).toBe("");
  });

  it("render는 1frame 뒤에 실행된다.", () => {
    render(() => "test", $root);
    requestAnimationFrame(() => {
      expect($root.innerHTML).toBe("test");
    });
  });

  it("render를 동시에 실행할 경우, 실제로는  한 번만 실행된다.", () => {
    let count = 0;
    const fn = () => {
      count += 1;
      return `${fn}`;
    };
    render(fn, $root);
    render(fn, $root);
    render(fn, $root);
    render(fn, $root);
    requestAnimationFrame(() => {
      expect(count).toBe(1);
    });
  });

  it("이벤트 등록 테스트", () => {
    const App = () => {
      const [text, setText] = useState("foo");

      addEvent("click", "#test", () => {
        setText("bar");
      });
      return `
        <div id="test">${text}</div>
      `;
    };

    render(App, $root);
    requestAnimationFrame(() => {
      const $test = $root.querySelector("#test")! as HTMLElement;
      expect($test!.innerHTML).toBe("foo");
      $test.click();
      expect($test!.innerHTML).toBe("foo");
      requestAnimationFrame(() => {
        expect($test!.innerHTML).toBe("bar");
      });
    });
  });
});
