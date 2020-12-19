import {createMoviePopup} from "./movie-popup.templalte.js";
import AbstractView from "../abstract.js";

export default class MoviePopup extends AbstractView {
  constructor(movie) {
    super();
    this._movie = movie;
    this._popupCloseHandler = this._popupCloseHandler.bind(this);
    this._popupChangeDataHandler = this._popupChangeDataHandler.bind(this);
  }

  getTemplate() {
    return createMoviePopup(this._movie);
  }
  _popupCloseHandler(evt) {
    evt.preventDefault();
    this._callback.popupClose();
  }
  _popupChangeDataHandler(evt) {
    evt.preventDefault();
    const target = evt.target;
    switch (target.tagName) {
      case `LABEL`:
        this._callback.changeData(target);
        break;
      default:
        break;
    }
  }
  delete() {
    this.getElement().remove();
    this.removeElement();
  }
  setPopupCloseHandler(callback) {
    this._callback.popupClose = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._popupCloseHandler);
  }
  setPopupChangeDataHandler(callback) {
    this._callback.changeData = callback;
    this.getElement().addEventListener(`click`, this._popupChangeDataHandler);
  }
}
