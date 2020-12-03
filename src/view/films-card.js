import {createElement} from "../utils.js";

const createFilmsCard = (movie) => {
  const {name, rate, year, duration, genre, poster, descriptionShort, comments} = movie;

  return `<article class="film-card">
  <h3 class="film-card__title">${name}</h3>
  <p class="film-card__rating">${rate}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src="${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${descriptionShort}</p>
  <a class="film-card__comments">${comments} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
  </article>`;
};

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
