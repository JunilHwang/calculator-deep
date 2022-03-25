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

    $root!.innerHTML = rootComponent!();
    bindEvents();
    resetContext();
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

  function bindEvents() {
    eventStore.forEach(({ eventType, selector, callback }) => {
      context.$root!.querySelectorAll(selector).forEach(($target: Element) => {
        $target.addEventListener(eventType, callback);
      });
    });
    eventStore.length = 0;
  }

  function render(rootComponent: () => string, $root: HTMLElement) {
    if (!isInitialized()) {
      context.$root = $root;
      context.rootComponent = rootComponent;
    }
    _render();
  }

  const { useState, useMemo, resetContext } = createHooks(_render);

  return { render, addEvent, useState, useMemo };
}

const { render, addEvent, useState, useMemo } = Render();

export { render, addEvent, useState, useMemo };
