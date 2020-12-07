import {createElement} from "../utils.js";
import {createMainFilmsSctructure} from "./main-films.template.js";

export default class MainFilmsSctructure {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMainFilmsSctructure();
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
