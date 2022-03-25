import "./style.scss";
import { selectElement } from "./utils";
import { App } from "./App";
import { store } from "./store";
import { render } from "./@core";

const $app = selectElement("#app");

function main() {
  render(App, $app);
}

store.subscribe(() => {
  main();
});

main();
