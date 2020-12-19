import MovieCardView from "../view/movie-card/movie-card.js";
import MoviePopupView from "../view/movie-popup/movie-popup.js";
import MoviesList from "./movies-list.js";
import NavigationView from "../view/navigation/navigation.js";
import Navigation from "./navigation.js";
import {getRightId} from "../mock/movies.js";
import {isEscEvent} from "../utils/common.js";
import {compareRate, compareComments} from "../utils/common.js";
// import {siteBody, navigation, filters} from "../main.js";
import {siteBody, filters} from "../main.js";
import {remove, render, RenderPosition} from "../utils/render.js";

const siteMain = document.querySelector(`main`);

export default class Movie {
  constructor(movies) {
    this._movieList = movies;

    this._filtersList = filters;
  }

  _renderMovie(place, movie) {
    const movieList = new MoviesList(siteMain);
    const movieCardComponent = new MovieCardView(movie);
    render(place, movieCardComponent.getElement(), RenderPosition.BEFOREEND);
    movieCardComponent.getElement().setAttribute(`data-id`, movie.id);

    const cardShow = () => {
      const chosenMovie = getRightId(this._movieList, +movieCardComponent.getElement().getAttribute(`data-id`));
      const moviePopupComponent = new MoviePopupView(chosenMovie);

      moviePopupComponent.getElement().setAttribute(`data-id`, movie.id);

      // const escActionsInPopup = () => {
      //   moviePopupComponent.getElement().remove();
      //   moviePopupComponent.removeElement();
      //   document.removeEventListener(`keydown`, onEscPressInPopup);
      // };
      // const onEscPressInPopup = (evt) => isEscEvent(evt, escActionsInPopup);

      const cardHide = () => {
        moviePopupComponent.getElement().remove();
        moviePopupComponent.removeElement();
      };

      const randomCard = siteBody.querySelector(`.film-details`);

      if (randomCard) {
        randomCard.remove();
        render(siteBody, moviePopupComponent.getElement(), RenderPosition.BEFOREEND);
      } else {
        render(siteBody, moviePopupComponent.getElement(), RenderPosition.BEFOREEND);
      }

      const cardChangeDataInPopup = (evt) => {
        const chosenMovie = getRightId(this._movieList, +movieCardComponent.getElement().getAttribute(`data-id`));
      };

      moviePopupComponent.setPopupCloseHandler(() => cardHide());
      document.addEventListener(`keydown`, onEscPressInPopup);
    };

    const cardChangeData = (evt) => {
      const navigation = new Navigation(siteMain, filters);
      // const chosenMovie = getRightId(this._movieList, +movieCardComponent.getElement().getAttribute(`data-id`));
      const chosenMovie = this._movieList[0];
      console.log(chosenMovie);
      console.log(chosenMovie.isWatchList);
      console.log(evt.textContent);
      // switch (evt.textContent) {
      //   case `Add to watchlist`:
      //     let A = !chosenMovie.isWatchList;
      //     chosenMovie.isWatchList = A;
      //     break;
      //   case `Mark as watched`:
      //     let B = !chosenMovie.isWatched;
      //     chosenMovie.isWatched = B;
      //     break;
      //   case `Mark as favorite`:
      //     let C = !chosenMovie.isFavorite;
      //     chosenMovie.isFavorite = C;
      //     break;
      //   default:
      //     break;
      // }
      console.log(this._movieList);
      console.log(this._movieList[0].isWatchList);
      // this._movieList[0].isWatchList = !this._movieList[0].isWatchList;
      movieList._updateMoviesList(this._movieList); // !!!!!!!!!!!
      // console.log(this._movieList);
      navigation._updateNavigationHandler(this._movieList);
    };

    movieCardComponent.setMovieCardOpenHandler(() => cardShow());
    movieCardComponent.setMovieCardChangeDataHandler((evt) => cardChangeData(evt));
    // movieCardComponent.setMovieCardChangeDataHandler((evt) => {
    //   cardChangeData(evt);
    //   console.log(this._movieList);
    //   navigation._updateNavigationHandler(this._movieList);
    // });
  }

  _renderGeneralMovies(from, to) {
    const filmsListGeneral = siteMain.querySelector(`.films`).children[0];
    const moviesContainer = filmsListGeneral.querySelector(`.films-list__container`);
    this._movieList
      .slice(from, to)
      .forEach((movie) => this._renderMovie(moviesContainer, movie));
  }

  _renderMostRatedMovies(from, to) {
    const filmsListMostRated = siteMain.querySelector(`.films`).children[1];
    const moviesContainer = filmsListMostRated.querySelector(`.films-list__container`);
    this._movieList
      .slice()
      .sort(compareRate)
      .slice(from, to)
      .forEach((movie) => this._renderMovie(moviesContainer, movie));
  }

  _renderMostCommentedMovies(from, to) {
    const filmsListMostCommented = siteMain.querySelector(`.films`).children[2];
    const moviesContainer = filmsListMostCommented.querySelector(`.films-list__container`);
    this._movieList
      .slice()
      .sort(compareComments)
      .slice(from, to)
      .forEach((movie) => this._renderMovie(moviesContainer, movie));
  }

  _clearMoviesContainer() {
    const moviesCards = siteMain.querySelectorAll(`.film-card`);
    moviesCards.forEach((card) => {
      card.remove();
    });
  }

  // _handleAddToWatchList() {
  //   const buttonWatch = movieCardComponent.querySelector(`.film-card__controls-item--add-to-watchlist`);
  // }
}
