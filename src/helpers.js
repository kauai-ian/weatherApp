// helpers
function createElement(tag, className) {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  return element;
}
function getElement(selector) {
  const element = document.querySelector(selector);
  return element;
}

export { createElement, getElement };
// exports these two functions
