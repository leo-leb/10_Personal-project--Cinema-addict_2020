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

    this._openMoviePopupHandler = this._openMoviePopupHandler.bind(this);
    this._closePopupInClickHandler = this._closePopupInClickHandler.bind(this);
    this._closePopupIfEscHandler = this._closePopupIfEscHandler.bind(this);
    this._changeDataHandler = this._changeDataHandler.bind(this);
  }

  init(movie) {
    this._movie = movie;

    const prevMovieComponent = this._movieComponent;
    const prevMoviePopupComponent = this._moviePopupComponent;

    this._movieComponent = new MovieCardView(movie);
    this._moviePopupComponent = new MoviePopupView(movie);
    this._MoviesListPresenter = new MoviesListPresenter(this._movies);

    this._movieComponent.setMovieCardOpenHandler(() => this._openMoviePopupHandler());
    this._movieComponent.setMovieCardChangeDataHandler((evt) => this._changeDataHandler(evt));
    this._moviePopupComponent.setPopupChangeDataHandler((evt) => this._changeDataHandler(evt));

    if (prevMovieComponent === null || prevMoviePopupComponent === null) {
      render(this._moviesListContainer, this._movieComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._moviesListContainer.contains(prevMovieComponent.getElement())) {
      replace(this._movieComponent, prevMovieComponent);
    }

    if (this._mode === Mode.POPUP_OPEN) {
      replace(this._moviePopupComponent, prevMoviePopupComponent);
      this._moviePopupComponent.setPopupCloseHandler(() => this._closePopupInClickHandler());
    }

    remove(prevMovieComponent);
    remove(prevMoviePopupComponent);
  }

  _openMoviePopupHandler() {
    const currentPopup = siteBody.querySelector(`.film-details`);

    if (currentPopup) {
      currentPopup.remove();
      render(siteBody, this._moviePopupComponent, RenderPosition.BEFOREEND);
    } else {
      render(siteBody, this._moviePopupComponent, RenderPosition.BEFOREEND);
    }

    this._moviePopupComponent.setPopupCloseHandler(() => this._closePopupInClickHandler());
    document.addEventListener(`keydown`, this._closePopupIfEscHandler);
    this._mode = Mode.POPUP_OPEN;
  }

  _closePopupInClickHandler() {
    this._moviePopupComponent.delete();
    this._mode = Mode.POPUP_CLOSED;
  }

  _closePopupIfEscHandler(evt) {
    isEscEvent(evt, () => {
      this._moviePopupComponent.delete();
      document.removeEventListener(`keydown`, this._closePopupIfEscHandler);
      this._mode = Mode.POPUP_CLOSED;
    });
  }

  _changeDataHandler(evt) {
    if (evt.className.includes(`watchlist`)) {
      this._changeData(
          Object.assign(
              {},
              this._movie,
              {
                isWatchList: !this._movie.isWatchList
              }
          )
      );
    }
    if (evt.className.includes(`watched`)) {
      this._changeData(
          Object.assign(
              {},
              this._movie,
              {
                isWatched: !this._movie.isWatched
              }
          )
      );
    }
    if (evt.className.includes(`favorite`)) {
      this._changeData(
          Object.assign(
              {},
              this._movie,
              {
                isFavorite: !this._movie.isFavorite
              }
          )
      );
    }
  }

  _destroy() {
    remove(this._movieComponent);
    remove(this._moviePopupComponent);
  }
}
