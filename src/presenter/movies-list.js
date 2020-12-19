import MovieListContainerView from "../view/movie-list-container/movie-list-container.js";
import NoMoviesView from "../view/no-movies.js";
import ShowMoreButtonView from "../view/show-more-movies.js";
import MoviePresenter from "./movie.js";
import {render, RenderPosition, getRightMoviesContainer, remove} from "../utils/render.js";
import {compareRate, compareComments, updateItem} from "../utils/common.js";

const GENERAL_MOVIES_COUNT = 5;
const GENERAL_MOVIES_EXTRA_COUNT = 5;
const EXTRA_MOVIES_COUNT = 2;

const ALL_MOVIES_NAME = `All movies. Upcoming`;
const MOST_RATED_MOVIES_NAME = `Top rated`;
const MOST_COMMENTED_MOVIES_NAME = `Most commented`;

export default class MoviesList {
  constructor(moviesContainer) {
    this._moviesContainer = moviesContainer;
    this._moviePresenter = {};

    this._renderedGeneralMoviesCount = GENERAL_MOVIES_COUNT;
    this._renderedExtraMoviesCount = EXTRA_MOVIES_COUNT;
    this._renderedExtraGeneralMoviesCount = GENERAL_MOVIES_EXTRA_COUNT;

    this._movieListContainerComponent = new MovieListContainerView();
    this._noMoviesComponent = new NoMoviesView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleMoviesChange = this._handleMoviesChange.bind(this);
  }

  init(movies) {
    this._movies = movies.slice();
    this._mostRatedMovies = movies.slice().sort(compareRate);
    this._mostCommentedMovies = movies.slice().sort(compareComments);

    render(this._moviesContainer, this._movieListContainerComponent, RenderPosition.BEFOREEND);
    this._renderMoviesList();
  }

  _renderNoMovies() {
    render(this._moviesContainer, this._noMoviesComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    const generalMovieList = getRightMoviesContainer(ALL_MOVIES_NAME);
    const generalMoviesVolume = generalMovieList.querySelector(`.films-list__container`).children.length;

    if (generalMoviesVolume < this._movies.length) {
      render(generalMovieList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    }

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _handleShowMoreButtonClick() {
    const generalContainer = getRightMoviesContainer(ALL_MOVIES_NAME).querySelector(`.films-list__container`);
    const generalMoviesVolume = generalContainer.children.length;
    let generalMoviesExtraCount = generalMoviesVolume + this._renderedExtraGeneralMoviesCount;

    if (this._movies.length - generalMoviesVolume <= 5) {
      this._renderMovies(this._movies, generalContainer, generalMoviesVolume, generalMoviesExtraCount);
      this._showMoreButtonComponent.delete();
      return;
    }

    this._renderMovies(this._movies, generalContainer, generalMoviesVolume, generalMoviesExtraCount);
  }

  _renderMovie(place, movie) {
    const moviePresenter = new MoviePresenter(place, this._handleMoviesChange);
    moviePresenter.init(movie);
    this._moviePresenter[movie.id] = moviePresenter;
  }

  _handleMoviesChange(updatedMovie) {
    this._movies = updateItem(this._movies, updatedMovie);
    this._moviePresenter[updatedMovie.id].init(updatedMovie);
  }

  _renderMovies(source, place, from, to) {
    source
      .slice(from, to)
      .forEach((movie) => this._renderMovie(place, movie));
  }

  _renderAllMovies(toForGeneral) {
    const generalContainer = getRightMoviesContainer(ALL_MOVIES_NAME).querySelector(`.films-list__container`);
    const mostRatedContainer = getRightMoviesContainer(MOST_RATED_MOVIES_NAME).querySelector(`.films-list__container`);
    const mostCommentedContainer = getRightMoviesContainer(MOST_COMMENTED_MOVIES_NAME).querySelector(`.films-list__container`);

    this._renderMovies(this._movies, generalContainer, 0, toForGeneral);
    this._renderMovies(this._mostRatedMovies, mostRatedContainer, 0, this._renderedExtraMoviesCount);
    this._renderMovies(this._mostCommentedMovies, mostCommentedContainer, 0, this._renderedExtraMoviesCount);
  }

  _renderMoviesList() {
    if (this._movies.length === 0) {
      this._renderNoMovies();
      return;
    }
    this._renderAllMovies(this._renderedGeneralMoviesCount);
    this._renderShowMoreButton();
  }

  _clearMoviesList() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};
    this._renderedGeneralMoviesCount = GENERAL_MOVIES_COUNT;
    remove(this._showMoreButtonComponent);
  }
}
