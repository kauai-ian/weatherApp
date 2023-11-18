import { createElement, getElement } from "./helpers";

function renderWeather() {
const div = createElement("div", "container");
const textBox = createElement("p", "results");
textBox.textContent = "The quick brown fox";
div.appendChild(textBox);
document.body.appendChild(div);
}

export {renderWeather}