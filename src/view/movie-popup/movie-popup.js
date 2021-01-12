import {createMoviePopup} from "./movie-popup.templalte";
import SmartView from "../smart";

export default class MoviePopup extends SmartView {
  constructor(movie) {
    super();
    this._movie = movie;

    this._popupCloseHandler = this._popupCloseHandler.bind(this);

    this._watchlistToggleHandler = this._watchlistToggleHandler.bind(this);
    this._watchedToggleHandler = this._watchedToggleHandler.bind(this);
    this._favoriteToggleHandler = this._favoriteToggleHandler.bind(this);

    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._emotionHandler = this._emotionHandler.bind(this);

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

    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._commentInputHandler);

    this.getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, this._emotionHandler);
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

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      commentsLib: evt.target.value
    }, true);
  }

  _emotionHandler(evt) {
    evt.preventDefault();
    const target = evt.target;
    const popupWindow = document.querySelector(`.film-details`);
    switch (target.parentElement.getAttribute(`for`)) {
      case `emoji-smile`:
        this.updateData({
          emotionStorage: `smile`
        }, false, popupWindow.scrollTop);
        break;
      case `emoji-sleeping`:
        this.updateData({
          emotionStorage: `sleeping`
        }, false, popupWindow.scrollTop);
        break;
      case `emoji-puke`:
        this.updateData({
          emotionStorage: `puke`
        }, false, popupWindow.scrollTop);
        break;
      case `emoji-angry`:
        this.updateData({
          emotionStorage: `angry`
        }, false, popupWindow.scrollTop);
        break;
      default:
        break;
    }
  }

  setCloseButtonClickHandler(callback) {
    this._callback.popupClose = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._popupCloseHandler);
  }
}
