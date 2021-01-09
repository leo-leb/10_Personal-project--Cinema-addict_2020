import {createMoviePopup} from "./movie-popup.templalte.js";
import SmartView from "../smart.js";

export default class MoviePopup extends SmartView {
  constructor(movie) {
    super();
    this._movie = movie;

    this._popupCloseHandler = this._popupCloseHandler.bind(this);

    this._watchlistToggleHandler = this._watchlistToggleHandler.bind(this);
    this._watchedToggleHandler = this._watchedToggleHandler.bind(this);
    this._favoriteToggleHandler = this._favoriteToggleHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createMoviePopup(this._movie);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseButtonClickHandler(this._callback.popupClose);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._watchlistToggleHandler);

    this.getElement()
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._watchedToggleHandler);

    this.getElement()
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._favoriteToggleHandler);
  }

  _popupCloseHandler(evt) {
    evt.preventDefault();
    this._callback.popupClose();
  }

  _watchlistToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isWatchList: !this._movie.isWatchList
    });
  }

  _watchedToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isWatched: !this._movie.isWatched
    });
  }

  _favoriteToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorite: !this._movie.isFavorite
    });
  }

  setCloseButtonClickHandler(callback) {
    this._callback.popupClose = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._popupCloseHandler);
  }
}
