import MovieCardView from "../view/movie-card/movie-card.js";
import MoviePopupView from "../view/movie-popup/movie-popup.js";
import MoviesListPresenter from "./movies-list.js";
import {isEscEvent} from "../utils/common.js";
import {siteBody, movies} from "../main.js";
import {remove, render, replace, RenderPosition} from "../utils/render.js";

const Mode = {
  POPUP_CLOSED: `CLOSED`,
  POPUP_OPEN: `OPEN`
};

export default class Movie {
  constructor(moviesListContainer, changeData) {
    this._moviesListContainer = moviesListContainer;
    this._changeData = changeData;
    this._movies = movies;

    this._movieComponent = null;
    this._moviePopupComponent = null;
    this._mode = Mode.POPUP_CLOSED;

    this._handleOpenClick = this._handleOpenClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._onPopupEsc = this._onPopupEsc.bind(this);
  }

  init(movie) {
    this._movie = movie;

    const prevMovieComponent = this._movieComponent;
    const prevMoviePopupComponent = this._moviePopupComponent;

    this._movieComponent = new MovieCardView(movie);
    this._moviePopupComponent = new MoviePopupView(movie);
    this._MoviesListPresenter = new MoviesListPresenter(this._movies);

    this._movieComponent.setMovieClickHandler(() => this._handleOpenClick());
    this._movieComponent.setControlsClickHandler((evt) => this._changeData(evt));
    this._moviePopupComponent.setControlsClickHandler((evt) => this._changeData(evt));

    if (prevMovieComponent === null || prevMoviePopupComponent === null) {
      render(this._moviesListContainer, this._movieComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._moviesListContainer.contains(prevMovieComponent.getElement())) {
      replace(this._movieComponent, prevMovieComponent);
    }

    if (this._mode === Mode.POPUP_OPEN) {
      replace(this._moviePopupComponent, prevMoviePopupComponent);
      this._moviePopupComponent.setCloseButtonClickHandler(() => this._handleCloseClick());
    }

    remove(prevMovieComponent);
    remove(prevMoviePopupComponent);
  }

  _openPopup() {
    const currentPopup = siteBody.querySelector(`.film-details`);

    if (currentPopup) {
      currentPopup.remove();
      render(siteBody, this._moviePopupComponent, RenderPosition.BEFOREEND);
    } else {
      render(siteBody, this._moviePopupComponent, RenderPosition.BEFOREEND);
    }

    this._moviePopupComponent.setCloseButtonClickHandler(() => this._handleCloseClick());
    document.addEventListener(`keydown`, this._onPopupEsc);
    this._mode = Mode.POPUP_OPEN;
  }

  _closePopup() {
    this._moviePopupComponent.delete();
    this._mode = Mode.POPUP_CLOSED;
    document.removeEventListener(`keydown`, this._closePopupIfEscHandler);
  }

  _handleOpenClick() {
    this._openPopup();
  }

  _handleCloseClick() {
    this._closePopup();
  }

  _onPopupEsc(evt) {
    isEscEvent(evt, () => {
      this._closePopup();
    });
  }
}
