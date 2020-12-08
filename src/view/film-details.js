import {createFilmPopup} from "./film-details.templalte.js";
import AbstractView from "./abstract.js";

export default class FilmsPopup extends AbstractView {
  constructor(movie) {
    super();
    this._movie = movie;
    this._popupCloseHandler = this._popupCloseHandler.bind(this);
  }

  getTemplate() {
    return createFilmPopup(this._movie);
  }
  _popupCloseHandler(evt) {
    evt.preventDefault();
    this._callback.popupClose();
  }
  setPopupCloseHandler(callback) {
    this._callback.popupClose = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._popupCloseHandler);
  }
}
