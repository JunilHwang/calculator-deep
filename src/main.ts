import "./style.css";
import { selectElement } from "./utils";
import { App } from "./App";
import { store } from "./store";

const $app = selectElement("#app");

function main() {
  requestAnimationFrame(() => {
    $app.innerHTML = App();
  });
}

store.subscribe(() => {
  main();
});

main();
