import MovieCardView from "../view/movie-card/movie-card";
import MoviePopupView from "../view/movie-popup/movie-popup";
import MoviesListPresenter from "./movies-list";
import {isEscEvent} from "../utils/common";
import {siteBody, movies} from "../main";
import {Mode, KeyCode, UserAction, UpdateType} from "../consts";
import {remove, render, replace, RenderPosition} from "../utils/render";

let pressed = new Set();

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
    this._onPopupCtrlEnter = this._onPopupCtrlEnter.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);
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
      this._moviePopupComponent.setControlsClickHandler((evt) => this._changeData(evt));
      this._moviePopupComponent.setDeleteButtonClickHandler((evt) => this._handleDeleteComment(evt));
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
    this._moviePopupComponent.setControlsClickHandler((evt) => this._changeData(evt));
    this._moviePopupComponent.setDeleteButtonClickHandler(this._handleDeleteComment);
    document.addEventListener(`keydown`, this._onPopupEsc);
    document.addEventListener(`keydown`, this._onPopupCtrlEnter);

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

  _onPopupCtrlEnter(evt) {
    const popupWindow = document.querySelector(`.film-details`);
    pressed.add(evt.code);
    for (let code of KeyCode.CTRL_ENTER) {
      if (!pressed.has(code)) {
        return;
      }
    }
    pressed.clear();
    this._moviePopupComponent.updateData({
      isEmotionClick: false
    }, false, popupWindow.scrollTop);
    document.querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
    document.querySelector(`.film-details__comment-input`).innerHTML = ``;
    document.addEventListener(`keyup`, () => {
      pressed.delete(evt.code);
    });
  }

  _handleDeleteComment(id) {
    const getIndexOfComment = this._movie.comments.findIndex((element) => {
      for (let elem of Object.values(element)) {
        if (elem === id) {
          return elem;
        }
      }
      return null;
    });
    this._movie.comments.splice(getIndexOfComment, 1);
  }

  // _onPopupCtrlEnter(evt) {
  //   const popupWindow = document.querySelector(`.film-details`);
  //   pressed.add(evt.code);
  //   for (let code of KeyCode.CTRL_ENTER) {
  //     if (!pressed.has(code)) {
  //       return;
  //     }
  //   }
  //   pressed.clear();
  //   this._moviePopupComponent.updateData({
  //     isEmotionClick: false
  //   }, false, popupWindow.scrollTop);
  //   document.querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
  //   document.querySelector(`.film-details__comment-input`).innerHTML = ``;
  //   document.addEventListener(`keyup`, () => {
  //     pressed.delete(evt.code);
  //   });
  // }
}
