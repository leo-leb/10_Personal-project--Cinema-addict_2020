import MovieCardView from "../view/movie-card/movie-card.js";
import MoviePopupView from "../view/movie-popup/movie-popup.js";
import MoviesListPresenter from "./movies-list2.js";
import NavigationPresenter from "./navigation.js";
import {getRightId} from "../mock/movies.js";
import {isEscEvent} from "../utils/common.js";
import {compareRate, compareComments} from "../utils/common.js";
import {siteBody, navigation, movies, filters} from "../main.js";
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
    this._changeMovieCardDataHandler = this._changeMovieCardDataHandler.bind(this);
    this._changeMoviePopupDataHandler = this._changeMoviePopupDataHandler.bind(this);
  }

  init(movie) {
    this._movie = movie;

    const prevMovieComponent = this._movieComponent;
    const prevMoviePopupComponent = this._moviePopupComponent;

    this._movieComponent = new MovieCardView(movie);
    this._moviePopupComponent = new MoviePopupView(movie);
    this._MoviesListPresenter = new MoviesListPresenter(this._movies);

    this._movieComponent.setMovieCardOpenHandler(() => this._openMoviePopupHandler());

    this._movieComponent.setMovieCardChangeDataHandler((evt) => this._changeMovieCardDataHandler(evt));
    this._moviePopupComponent.setPopupChangeDataHandler((evt) => this._changeMoviePopupDataHandler(evt));

    if (prevMovieComponent === null) {
      render(this._moviesListContainer, this._movieComponent, RenderPosition.BEFOREEND);
      this._movieComponent.getElement().setAttribute(`data-id`, this._movie.id);
      return;
    }

    replace(this._movieComponent, prevMovieComponent);
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

  _changeMovieCardDataHandler(evt) {
    switch (evt.textContent) {
      case `Add to watchlist`:
        this._changeData(
            Object.assign(
                {},
                this._movie,
                {
                  isWatchList: !this._movie.isWatchList
                }
            )
        );
        break;
      case `Mark as watched`:
        this._changeData(
            Object.assign(
                {},
                this._movie,
                {
                  isWatched: !this._movie.isWatched
                }
            )
        );
        break;
      case `Mark as favorite`:
        this._changeData(
            Object.assign(
                {},
                this._movie,
                {
                  isFavorite: !this._movie.isFavorite
                }
            )
        );
        break;
      default:
        break;
    }
  }

  _changeMoviePopupDataHandler(evt) {
    switch (evt.textContent) {
      case `Add to watchlist`:
        this._changeData(
            Object.assign(
                {},
                this._movie,
                {
                  isWatchList: !this._movie.isWatchList
                }
            )
        );
        break;
      case `Already watched`:
        this._changeData(
            Object.assign(
                {},
                this._movie,
                {
                  isWatched: !this._movie.isWatched
                }
            )
        );
        break;
      case `Add to favorites`:
        this._changeData(
            Object.assign(
                {},
                this._movie,
                {
                  isFavorite: !this._movie.isFavorite
                }
            )
        );
        break;
      default:
        break;
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
