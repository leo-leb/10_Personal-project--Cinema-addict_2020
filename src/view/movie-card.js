import {createMovieCard} from "./movie-card.template.js";
import AbstractView from "./abstract.js";

export default class MovieCard extends AbstractView {
  constructor(movie) {
    super();
    this._movie = movie;
    this._movieCardOpenHandler = this._movieCardOpenHandler.bind(this);
  }

  getTemplate() {
    return createMovieCard(this._movie);
  }
  _movieCardOpenHandler(evt) {
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
  setMovieCardOpenHandler(callback) {
    this._callback.popupOpen = callback;
    this.getElement().addEventListener(`click`, this._movieCardOpenHandler);
  }
}
