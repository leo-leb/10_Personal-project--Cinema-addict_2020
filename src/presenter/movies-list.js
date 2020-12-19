import MovieListContainerView from "../view/movie-list-container/movie-list-container.js";
import NoMoviesView from "../view/no-movies.js";
import ShowMoreButtonView from "../view/show-more-movies.js";
import Movie from "./movie.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {getRightId} from "../mock/movies.js";

const MOVIE_SORT_COUNT = 5;
const MOVIE_SORT_EXTRA_COUNT = 5;
const MOVIE_EXTRA_COUNT = 2;

let updateCount = 0;

const siteMain = document.querySelector(`main`);

export default class MoviesList {
  constructor(moviesSection) {
    this._moviesSection = moviesSection;

    this._movieListContainerComponent = new MovieListContainerView();
    this._noMoviesComponent = new NoMoviesView();

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(moviesList) {
    this._moviesList = moviesList.slice();
    render(siteMain, this._movieListContainerComponent.getElement(), RenderPosition.BEFOREEND);
    this._renderMoviesList(this._moviesList);
  }

  _renderMoviesListContent(list) {
    const movie = new Movie(list);
    movie._renderGeneralMovies(0, MOVIE_SORT_COUNT);
    if (updateCount < 1) {
      this._renderShowMoreButton(list);
    }
    movie._renderMostRatedMovies(0, MOVIE_EXTRA_COUNT);
    movie._renderMostCommentedMovies(0, MOVIE_EXTRA_COUNT);
    updateCount += 1;
  }

  _renderMoviesListContentExtra(list, count) {
    const movie = new Movie(list);
    movie._renderGeneralMovies(0, count);
    if (updateCount < 1) {
      this._renderShowMoreButton(list);
    }
    movie._renderMostRatedMovies(0, MOVIE_EXTRA_COUNT);
    movie._renderMostCommentedMovies(0, MOVIE_EXTRA_COUNT);
    updateCount += 1;
  }

  _renderMoviesList(list) {
    if (list.length === 0) {
      this._renderNoMovies();
      return;
    }
    this._renderMoviesListContent(list);
  }

  _renderMoviesListExtra(list, count) {
    if (list.length === 0) {
      this._renderNoMovies();
      return;
    }
    this._renderMoviesListContentExtra(list, count);
  }

  _renderNoMovies() {
    render(siteMain, this._noMoviesComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick(list) {
    const movie = new Movie(list);
    const mainFilmsContainer = siteMain.querySelector(`.films-list__container`);

    let actualMovieStorageSize = mainFilmsContainer.children.length;
    let extraCount = actualMovieStorageSize + MOVIE_SORT_EXTRA_COUNT;

    if (this._moviesList.length - actualMovieStorageSize <= 5) {
      movie._renderGeneralMovies(actualMovieStorageSize, extraCount);
      this._showMoreButtonComponent.getElement().remove();
      this._showMoreButtonComponent.removeElement();
      return;
    }

    movie._renderGeneralMovies(actualMovieStorageSize, extraCount);
  }

  _renderShowMoreButton(list) {
    const mainFilmsList = siteMain.querySelector(`.films-list`);

    render(mainFilmsList, this._showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    const currentFunc = () => this._handleShowMoreButtonClick(list);

    this._showMoreButtonComponent.setClickHandler(currentFunc);
  }

  destroy(list) {
    const movie = new Movie(list);
    movie._clearMoviesContainer();
  }

  _updateMoviesList(list) {
    const filmsListGeneral = siteMain.querySelector(`.films`).children[0];
    const moviesContainer = filmsListGeneral.querySelector(`.films-list__container`);
    let count = moviesContainer.children.length;
    if (count > 5) {
      this.destroy(list);
      this._renderMoviesListExtra(list, count);
    } else {
      this.destroy(list);
      this._renderMoviesList(list);
    }
  }
}
