import MovieCardView from "../view/movie-card/movie-card.js";
import MoviePopupView from "../view/movie-popup/movie-popup.js";
import MoviesListPresenter from "./movies-list.js";
import {isEscEvent} from "../utils/common.js";
import {siteBody, movies} from "../main.js";
import {remove, render, replace, RenderPosition} from "../utils/render.js";

export default class Movie {
  constructor(moviesListContainer, changeData) {
    this._moviesListContainer = moviesListContainer;
    this._changeData = changeData;
    this._movies = movies;

    this._movieComponent = null;
    this._moviePopupComponent = null;

    this._openMoviePopupHandler = this._openMoviePopupHandler.bind(this);
    this._closePopupInClickHandler = this._closePopupInClickHandler.bind(this);
    this._closePopupInEscHandler = this._closePopupInEscHandler.bind(this);
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

    if (prevMovieComponent === null) {
      render(this._moviesListContainer, this._movieComponent, RenderPosition.BEFOREEND);
      this._movieComponent.getElement().setAttribute(`data-id`, this._movie.id);
      return;
    }

    replace(this._movieComponent, prevMovieComponent);
    this._movieComponent.getElement().setAttribute(`data-id`, this._movie.id);
    replace(this._moviePopupComponent, prevMoviePopupComponent);

    remove(prevMovieComponent);
    remove(prevMoviePopupComponent);
  }

  _openMoviePopupHandler() {
    const existingPopup = siteBody.querySelector(`.film-details`);

    if (existingPopup) {
      existingPopup.remove();
      render(siteBody, this._moviePopupComponent, RenderPosition.BEFOREEND);
    } else {
      render(siteBody, this._moviePopupComponent, RenderPosition.BEFOREEND);
    }

    this._moviePopupComponent.setPopupCloseHandler(() => this._closePopupInClickHandler());
    document.addEventListener(`keydown`, this._closePopupInEscHandler);
  }

  _closePopupInClickHandler() {
    this._moviePopupComponent.delete();
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

  _closePopupInEscHandler(evt) {
    isEscEvent(evt, () => {
      this._moviePopupComponent.delete();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    });
  }

  _destroy() {
    remove(this._movieComponent);
  }
}
