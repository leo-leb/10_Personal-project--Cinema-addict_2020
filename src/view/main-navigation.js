import {createElement} from "../utils.js";

export const createMainNavigation = () => {
  return `<nav class="main-navigation"></nav>`;
};

export default class MainNavigation {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMainNavigation();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
