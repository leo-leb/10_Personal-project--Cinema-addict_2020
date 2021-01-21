import MovieListContainerView from "../view/movie-list-container/movie-list-container";
import NoMoviesView from "../view/no-movies";
import ShowMoreButtonView from "../view/show-more-movies";
import MoviePresenter from "./movie";
import {render, RenderPosition, getRightMoviesContainer} from "../utils/render";
import {compareRate, compareComments, updateItem} from "../utils/common";
import {MoviesCount, MoviesTitles} from "../consts";

export default class MoviesList {
  constructor(moviesContainer) {
    this._moviesContainer = moviesContainer;

    this._moviesPresenter = {};
    this._mostRatedMoviesPresenter = {};
    this._mostCommentedMoviesPresenter = {};

    this._renderedGeneralMoviesCount = MoviesCount.GENERAL;
    this._renderedExtraMoviesCount = MoviesCount.EXTRA;
    this._renderedExtraGeneralMoviesCount = MoviesCount.GENERAL_EXTRA;

    this._movieListContainerComponent = new MovieListContainerView();
    this._noMoviesComponent = new NoMoviesView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleMovieChange = this._handleMovieChange.bind(this);
  }

  init(movies) {
    this._movies = movies.slice();
    this._mostRatedMovies = movies.slice().sort(compareRate);
    this._mostCommentedMovies = movies.slice().sort(compareComments);

    render(this._moviesContainer, this._movieListContainerComponent, RenderPosition.BEFOREEND);
    this._renderMoviesList();
  }

  _renderMovie(place, movie, presenter) {
    const moviePresenter = new MoviePresenter(place, this._handleMovieChange);
    moviePresenter.init(movie);
    presenter[movie.id] = moviePresenter;
  }

  _renderMovies(source, place, from, to, presenter) {
    source
      .slice(from, to)
      .forEach((movie) => this._renderMovie(place, movie, presenter));
  }

  _renderAllMovies() {
    const generalContainer = getRightMoviesContainer(MoviesTitles.ALL).querySelector(`.films-list__container`);
    const mostRatedContainer = getRightMoviesContainer(MoviesTitles.MOST_RATED).querySelector(`.films-list__container`);
    const mostCommentedContainer = getRightMoviesContainer(MoviesTitles.MOST_COMMENTED).querySelector(`.films-list__container`);

    this._renderMovies(this._movies, generalContainer, 0, this._renderedGeneralMoviesCount, this._moviesPresenter);
    this._renderMovies(this._mostRatedMovies, mostRatedContainer, 0, this._renderedExtraMoviesCount, this._mostRatedMoviesPresenter);
    this._renderMovies(this._mostCommentedMovies, mostCommentedContainer, 0, this._renderedExtraMoviesCount, this._mostCommentedMoviesPresenter);
  }

  _renderNoMovies() {
    render(this._moviesContainer, this._noMoviesComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    const generalMovieList = getRightMoviesContainer(MoviesTitles.ALL);
    const generalMoviesVolume = generalMovieList.querySelector(`.films-list__container`).children.length;

    if (generalMoviesVolume < this._movies.length) {
      render(generalMovieList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    }

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderMoviesList() {
    if (this._movies.length === 0) {
      this._renderNoMovies();
      return;
    }
    this._renderAllMovies();
    this._renderShowMoreButton();
  }

  _handleShowMoreButtonClick() {
    const generalContainer = getRightMoviesContainer(MoviesTitles.ALL).querySelector(`.films-list__container`);
    const generalMoviesVolume = generalContainer.children.length;
    let generalMoviesExtraCount = generalMoviesVolume + this._renderedExtraGeneralMoviesCount;

    if (this._movies.length - generalMoviesVolume <= 5) {
      this._renderMovies(this._movies, generalContainer, generalMoviesVolume, generalMoviesExtraCount, this._moviesPresenter);
      this._showMoreButtonComponent.delete();
      return;
    }

    this._renderMovies(this._movies, generalContainer, generalMoviesVolume, generalMoviesExtraCount, this._moviesPresenter);
  }

  _updatePresenter(presenter, updatedMovie) {
    if (presenter.hasOwnProperty(updatedMovie.id)) {
      presenter[updatedMovie.id].init(updatedMovie);
    }
  }

  _handleMovieChange(updatedMovie) {
    this._movies = updateItem(this._movies, updatedMovie);
    this._updatePresenter(this._moviesPresenter, updatedMovie);
    this._updatePresenter(this._mostRatedMoviesPresenter, updatedMovie);
    this._updatePresenter(this._mostCommentedMoviesPresenter, updatedMovie);
  }
}
