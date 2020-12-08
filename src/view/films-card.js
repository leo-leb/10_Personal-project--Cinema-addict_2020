import {createFilmsCard} from "./films-card.template.js";
import AbstractView from "./abstract.js";

export default class FilmsCard extends AbstractView {
  constructor(movie) {
    super();
    this._movie = movie;
    this._filmsCardOpenHandler = this._filmsCardOpenHandler.bind(this);
  }

  getTemplate() {
    return createFilmsCard(this._movie);
  }
  _filmsCardOpenHandler(evt) {
    evt.preventDefault();
    this._callback.popupOpen();
  }
  setFilmsCardOpenHandler(callback) {
    this._callback.popupOpen = callback;
    this.getElement().querySelector(`img`).addEventListener(`click`, this._filmsCardOpenHandler);
    this.getElement().querySelector(`h3`).addEventListener(`click`, this._filmsCardOpenHandler);
    this.getElement().querySelector(`a`).addEventListener(`click`, this._filmsCardOpenHandler);
  }
}
