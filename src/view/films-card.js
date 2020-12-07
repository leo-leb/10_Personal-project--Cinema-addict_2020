import {createElement} from "../utils.js";
import {createFilmsCard} from "./films-card.template.js";

export default class FilmsCard {
  constructor(movie) {
    this._movie = movie;
    this._element = null;
  }

  getTemplate() {
    return createFilmsCard(this._movie);
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
