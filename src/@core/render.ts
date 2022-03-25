import { createHooks } from "./hooks";
import { debounceFrame } from "../utils";

interface EventStoreItem {
  eventType: string;
  selector: string;
  callback: (event?: any) => void;
}

function Render() {
  const context: {
    $root?: HTMLElement;
    rootComponent?: () => string;
  } = {};

  const eventStore: EventStoreItem[] = [];

  function isInitialized(): boolean {
    return Boolean(context.$root && context.rootComponent);
  }

  const _render = debounceFrame(() => {
    const { $root, rootComponent } = context;

    if (!$root || !rootComponent) {
      throw new Error();
    }

    // removeEvents();
    $root.innerHTML = rootComponent();
    bindEvents();
    console.log("_render");
  });

  function addEvent<T>(
    eventType: string,
    selector: string,
    callback: (e: T) => void
  ) {
    eventStore.push({
      eventType,
      selector,
      callback,
    });
  }

  // function removeEvents() {
  //   eventStore.forEach(({ eventType, $target, callback }) => {
  //     $target.removeEventListener(eventType, callback);
  //   });
  //   eventStore.length = 0;
  // }

  function bindEvents() {
    eventStore.forEach(({ eventType, selector, callback }) => {
      context.$root!.querySelectorAll(selector).forEach(($target: Element) => {
        $target.addEventListener(eventType, callback);
      });
    });
  }

  function render(rootComponent: () => string, $root: HTMLElement) {
    if (!isInitialized()) {
      context.$root = $root;
      context.rootComponent = rootComponent;
    }
    _render();
  }

  const { useState } = createHooks(_render);

  return { render, addEvent, useState };
}

const { render, addEvent, useState } = Render();

export { render, addEvent, useState };
