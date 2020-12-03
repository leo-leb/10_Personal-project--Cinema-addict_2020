import {createElement} from "../utils.js";

const createFilmsStatistic = () => {
  return `<p>130 291 movies inside</p>`;
};

export default class FilmsStatistic {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsStatistic();
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
