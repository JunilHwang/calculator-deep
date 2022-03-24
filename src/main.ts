import "./style.css";
import { selectElement } from "./utils";
import { App } from "./App";

const $app = selectElement("#app");

$app.innerHTML = App();
