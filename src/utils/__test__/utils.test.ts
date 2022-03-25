import { beforeAll, describe, expect, it } from "vitest";
import { debounceFrame, selectElement, selectElements } from "../index";

describe("Utils", () => {
  describe("선택자 테스트", () => {
    let $root: HTMLDivElement;
    beforeAll(() => {
      $root = document.createElement("div");
      $root.innerHTML = `
        <article>
          <section>
            <h1>제목</h1>
            <ul>
              <li>내용</li>
              <li>내용</li>
              <li>내용</li>
            </ul>
          </section>
        </article>
      `.trim();
    });

    it("단일 선택", () => {
      const $article = selectElement("article", $root);
      expect($article.childElementCount).toBe(1);
    });

    it("여러개 중 한 개 선택", () => {
      const $li = selectElement("li", $root);
      expect($li).not.toBe(null);
      expect($li.parentNode).toBe(selectElement("ul", $root));
    });

    it("다중 선택", () => {
      const $lis = selectElements("li", $root);
      expect($lis.length).toBe(3);
    });

    it("자동 배열 변환", () => {
      const $lis = selectElements("li", $root);
      expect(Array.isArray($lis)).toBe(true);
    });
  });

  it("debounce 함수 테스트", () => {
    let i = 0;
    const fn = debounceFrame(() => {
      i += 1;
    });

    fn();
    fn();
    fn();
    fn();
    expect(i).toBe(0);
    const nextFrameExpected = (): Promise<void> =>
      new Promise((resolve) => {
        requestAnimationFrame(() => {
          expect(i).toBe(1);
          resolve();
        });
      });

    nextFrameExpected()
      .then(nextFrameExpected)
      .then(nextFrameExpected)
      .then(nextFrameExpected);
  });
});
