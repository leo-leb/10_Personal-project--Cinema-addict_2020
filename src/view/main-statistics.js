import {createElement} from "../utils.js";

export const createMainStatisics = () => {
  return `<a href="#stats" class="main-navigation__additional">Stats</a>`;
};

export default class MainStatistics {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMainStatisics();
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
