import { createHooks } from "./hooks";
import { debounceFrame } from "../utils";

interface EventStoreItem {
  eventType: string;
  $target: Element;
  callback: (event: unknown) => void;
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

    removeEvents();
    $root.innerHTML = rootComponent();
    bindEvents();
  });

  function addEvent(
    eventType: string,
    selector: string,
    callback: (e: unknown) => void
  ) {
    context.$root!.querySelectorAll(selector).forEach(($target: Element) => {
      eventStore.push({
        eventType,
        $target,
        callback,
      });
    });
  }

  function removeEvents() {
    eventStore.forEach(({ eventType, $target, callback }) => {
      $target.removeEventListener(eventType, callback);
    });
    eventStore.length = 0;
  }

  function bindEvents() {
    eventStore.forEach(({ eventType, $target, callback }) => {
      $target.addEventListener(eventType, callback);
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
