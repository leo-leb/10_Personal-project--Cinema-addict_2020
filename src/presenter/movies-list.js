import MovieListContainerView from "../view/movie-list-container/movie-list-container";
import NoMoviesView from "../view/no-movies";
import ShowMoreButtonView from "../view/show-more-movies";
import MoviePresenter from "./movie";
import {render, RenderPosition, getRightMoviesContainer} from "../utils/render";
import {compareRate, compareComments} from "../utils/common";
import {MoviesCount, MoviesTitles, UpdateType, UserAction} from "../consts";

export default class MoviesList {
  constructor(moviesContainer, moviesModel) {
    this._moviesContainer = moviesContainer;
    this._moviesModel = moviesModel;

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
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    console.log(this._moviesModel);

    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._moviesContainer, this._movieListContainerComponent, RenderPosition.BEFOREEND);
    this._renderMoviesList();
  }

  _getMovies(typeOfSort) {
    switch (typeOfSort) {
      case MoviesTitles.MOST_RATED:
        return this._moviesModel.getMovies().slice().sort(compareRate);
      case MoviesTitles.MOST_COMMENTED:
        return this._moviesModel.getMovies().slice().sort(compareComments);
      default:
        return this._moviesModel.getMovies().slice();
    }
  }

  _renderMovie(place, movie, presenter) {
    const moviePresenter = new MoviePresenter(place, this._handleViewAction);
    moviePresenter.init(movie);
    presenter[movie.id] = moviePresenter;
  }

  _renderMovies(typeOfSort) {
    switch (typeOfSort) {
      case MoviesTitles.ALL:
        let allMoviesContainer = getRightMoviesContainer(MoviesTitles.ALL).querySelector(`.films-list__container`);
        this._getMovies().slice(allMoviesContainer.children.length, allMoviesContainer.children.length + MoviesCount.GENERAL).forEach((movie) => this._renderMovie(allMoviesContainer, movie, this._moviesPresenter));
        break;
      case MoviesTitles.MOST_RATED:
        let mostRatedContainer = getRightMoviesContainer(MoviesTitles.MOST_RATED).querySelector(`.films-list__container`);
        this._getMovies(MoviesTitles.MOST_RATED).slice(0, MoviesCount.EXTRA).forEach((movie) => this._renderMovie(mostRatedContainer, movie, this._mostRatedMoviesPresenter));
        break;
      case MoviesTitles.MOST_COMMENTED:
        let mostCommentedContainer = getRightMoviesContainer(MoviesTitles.MOST_COMMENTED).querySelector(`.films-list__container`);
        this._getMovies(MoviesTitles.MOST_COMMENTED).slice(0, MoviesCount.EXTRA).forEach((movie) => this._renderMovie(mostCommentedContainer, movie, this._mostCommentedMoviesPresenter));
    }
  }

  _renderAllMovies() {
    this._renderMovies(MoviesTitles.ALL);
    this._renderMovies(MoviesTitles.MOST_RATED);
    this._renderMovies(MoviesTitles.MOST_COMMENTED);
  }

  _renderNoMovies() {
    render(this._moviesContainer, this._noMoviesComponent, RenderPosition.BEFOREEND);
  }

  _renderMoviesList() {
    if (this._moviesModel.getMovies().length === 0) {
      this._renderNoMovies();
      return;
    }
    this._renderAllMovies();
    this._renderShowMoreButton();
  }

  _handleShowMoreButtonClick() {
    const generalMoviesVolume = getRightMoviesContainer(MoviesTitles.ALL).querySelector(`.films-list__container`).children.length;

    if (this._moviesModel.getMovies().length - generalMoviesVolume <= 5) {
      this._renderMovies(MoviesTitles.ALL);
      this._showMoreButtonComponent.delete();
      return;
    }

    this._renderMovies(MoviesTitles.ALL);
  }

  // ОБНОВЛЕНИЕ МОДЕЛИ
  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this._moviesModel.updateMovie(updateType, update);
        break;
      case UserAction.ADD_MOVIE:
        this._moviesModel.addMovie(updateType, update);
        break;
      case UserAction.DELETE_MOVIE:
        this._moviesModel.deleteMovie(updateType, update);
        break;
    }
  }

  // В ЗАВИСИМОСТИ ОТ ТИПА ИЗМЕНЕНИЯ РЕШАЕМ ЧТО ДЕЛАТЬ
  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить всю доску (например, при переключении фильтра)
        this._updatePresenter(this._moviesPresenter, data);
        this._updatePresenter(this._mostRatedMoviesPresenter, data);
        this._updatePresenter(this._mostCommentedMoviesPresenter, data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  }

  _renderShowMoreButton() {
    const generalMovieList = getRightMoviesContainer(MoviesTitles.ALL);
    const generalMoviesVolume = generalMovieList.querySelector(`.films-list__container`).children.length;

    if (generalMoviesVolume < this._moviesModel.getMovies().length) {
      render(generalMovieList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    }

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _updatePresenter(presenter, updatedMovie) {
    if (presenter.hasOwnProperty(updatedMovie.id)) {
      presenter[updatedMovie.id].init(updatedMovie);
    }
  }

  // _renderMovies(typeOfSort) {
  //   switch (typeOfSort) {
  //     case MoviesTitles.MOST_RATED:
  //       currentContainer = getRightMoviesContainer(MoviesTitles.MOST_RATED).querySelector(`.films-list__container`);
  //       this._getMovies(MoviesTitles.MOST_RATED).slice(0, MoviesCount.EXTRA).forEach((movie) => this._renderMovie(currentContainer, movie, this._mostRatedMoviesPresenter));
  //       break;
  //     case MoviesTitles.MOST_COMMENTED:
  //       currentContainer = getRightMoviesContainer(MoviesTitles.MOST_COMMENTED).querySelector(`.films-list__container`);
  //       this._getMovies(MoviesTitles.MOST_COMMENTED).slice(0, MoviesCount.EXTRA).forEach((movie) => this._renderMovie(currentContainer, movie, this._mostCommentedMoviesPresenter));
  //       break;
  //     default:
  //       let currentContainer = getRightMoviesContainer(MoviesTitles.ALL).querySelector(`.films-list__container`);
  //       this._getMovies(MoviesTitles.ALL).slice(currentContainer.children.length, currentContainer.children.length + MoviesCount.EXTRA).forEach((movie) => this._renderMovie(currentContainer, movie, this._moviesPresenter));
  //   }
  // }

  // _renderMovie(place, movie, presenter) {
  //   const moviePresenter = new MoviePresenter(place, this._handleMovieChange);
  //   moviePresenter.init(movie);
  //   presenter[movie.id] = moviePresenter;
  // }

  // _handleMovieChange(updatedMovie) {
  //   this._movies = updateItem(this._movies, updatedMovie);
  //   this._updatePresenter(this._moviesPresenter, updatedMovie);
  //   this._updatePresenter(this._mostRatedMoviesPresenter, updatedMovie);
  //   this._updatePresenter(this._mostCommentedMoviesPresenter, updatedMovie);
  // }

  // _renderAllMovies() {
  //   const generalContainer = getRightMoviesContainer(MoviesTitles.ALL).querySelector(`.films-list__container`);
  //   const mostRatedContainer = getRightMoviesContainer(MoviesTitles.MOST_RATED).querySelector(`.films-list__container`);
  //   const mostCommentedContainer = getRightMoviesContainer(MoviesTitles.MOST_COMMENTED).querySelector(`.films-list__container`);

  //   this._renderMovies(this._movies, generalContainer, 0, this._renderedGeneralMoviesCount, this._moviesPresenter);
  //   this._renderMovies(this._mostRatedMovies, mostRatedContainer, 0, this._renderedExtraMoviesCount, this._mostRatedMoviesPresenter);
  //   this._renderMovies(this._mostCommentedMovies, mostCommentedContainer, 0, this._renderedExtraMoviesCount, this._mostCommentedMoviesPresenter);
  // }

  // _renderAllMovies() {
  //   const generalContainer = getRightMoviesContainer(MoviesTitles.ALL).querySelector(`.films-list__container`);
  //   const mostRatedContainer = getRightMoviesContainer(MoviesTitles.MOST_RATED).querySelector(`.films-list__container`);
  //   const mostCommentedContainer = getRightMoviesContainer(MoviesTitles.MOST_COMMENTED).querySelector(`.films-list__container`);

  //   this._renderMovies(this._getMovies(MoviesTitles.ALL), generalContainer, this._moviesPresenter);
  //   this._renderMovies(this._getMovies(MoviesTitles.MOST_RATED), mostRatedContainer, this._mostRatedMoviesPresenter);
  //   this._renderMovies(this._getMovies(MoviesTitles.MOST_COMMENTED), mostCommentedContainer, this._mostCommentedMoviesPresenter);
  // }

  // init(movies) {
  //   this._movies = movies.slice();
  //   this._mostRatedMovies = movies.slice().sort(compareRate);
  //   this._mostCommentedMovies = movies.slice().sort(compareComments);

  //   render(this._moviesContainer, this._movieListContainerComponent, RenderPosition.BEFOREEND);
  //   this._renderMoviesList();
  // }

  // _renderMovies(source, place, from, to, presenter) {
  //   source
  //     .slice(from, to)
  //     .forEach((movie) => this._renderMovie(place, movie, presenter));
  // }

  // _renderMovies(source, place, presenter) {
  //   source.forEach((movie) => this._renderMovie(place, movie, presenter));
  // }

  // _handleShowMoreButtonClick() {
  //   const generalContainer = getRightMoviesContainer(MoviesTitles.ALL).querySelector(`.films-list__container`);
  //   const generalMoviesVolume = generalContainer.children.length;
  //   let generalMoviesExtraCount = generalMoviesVolume + this._renderedExtraGeneralMoviesCount;

  //   if (this._movies.length - generalMoviesVolume <= 5) {
  //     this._renderMovies(this._movies, generalContainer, generalMoviesVolume, generalMoviesExtraCount, this._moviesPresenter);
  //     this._showMoreButtonComponent.delete();
  //     return;
  //   }

  //   this._renderMovies(this._movies, generalContainer, generalMoviesVolume, generalMoviesExtraCount, this._moviesPresenter);
  // }
}
