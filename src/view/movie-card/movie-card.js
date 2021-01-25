import {createMovieCard} from "./movie-card.template";
import {UserAction, UpdateType} from "../../consts";
import SmartView from "../smart";

export default class MovieCard extends SmartView {
  constructor(movie) {
    super();
    this._movie = movie;

    this._popupOpenHandler = this._popupOpenHandler.bind(this);

    this._watchlistToggleHandler = this._watchlistToggleHandler.bind(this);
    this._watchedToggleHandler = this._watchedToggleHandler.bind(this);
    this._favoriteToggleHandler = this._favoriteToggleHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createMovieCard(this._movie);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setMovieClickHandler(this._callback.popupOpen);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._watchlistToggleHandler);

    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._watchedToggleHandler);

    this.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._favoriteToggleHandler);
  }

  _popupOpenHandler(evt) {
    evt.preventDefault();
    const target = evt.target;
    switch (target.classList.value) {
      case `film-card__poster`:
      case `film-card__comments`:
      case `film-card__title`:
        this._callback.popupOpen();
        break;
      default:
        break;
    }
  }

  _watchlistToggleHandler(evt) {
    evt.preventDefault();
    this.updateData(UserAction.UPDATE_MOVIE, UpdateType.PATCH, {
      isWatchList: !this._movie.isWatchList
    });
  }

  _watchedToggleHandler(evt) {
    evt.preventDefault();
    this.updateData(UserAction.UPDATE_MOVIE, UpdateType.PATCH, {
      isWatched: !this._movie.isWatched
    });
  }

  _favoriteToggleHandler(evt) {
    evt.preventDefault();
    this.updateData(UserAction.UPDATE_MOVIE, UpdateType.PATCH, {
      isFavorite: !this._movie.isFavorite
    });
  }

  setMovieClickHandler(callback) {
    this._callback.popupOpen = callback;
    this.getElement().addEventListener(`click`, this._popupOpenHandler);
  }

  // _watchlistToggleHandler(evt) {
  //   evt.preventDefault();
  //   this.updateData({
  //     isWatchList: !this._movie.isWatchList
  //   });
  // }

  // _watchedToggleHandler(evt) {
  //   evt.preventDefault();
  //   this.updateData({
  //     isWatched: !this._movie.isWatched
  //   });
  // }

  // _favoriteToggleHandler(evt) {
  //   evt.preventDefault();
  //   this.updateData({
  //     isFavorite: !this._movie.isFavorite
  //   });
  // }
}
