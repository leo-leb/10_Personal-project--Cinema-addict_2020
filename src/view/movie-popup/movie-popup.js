import {createMoviePopup} from "./movie-popup.templalte";
import {EmojiTypes} from "../../consts";
import SmartView from "../smart";

export default class MoviePopup extends SmartView {
  constructor(movie) {
    super();
    this._movie = movie;

    this._popupCloseHandler = this._popupCloseHandler.bind(this);
    this._commentDeleteHandler = this._commentDeleteHandler.bind(this);

    this._watchlistToggleHandler = this._watchlistToggleHandler.bind(this);
    this._watchedToggleHandler = this._watchedToggleHandler.bind(this);
    this._favoriteToggleHandler = this._favoriteToggleHandler.bind(this);

    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._emotionHandler = this._emotionHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createMoviePopup(this._movie);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseButtonClickHandler(this._callback.popupClose);
    this.setDeleteButtonClickHandler(this._callback.commentDelete);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._watchlistToggleHandler);

    this.getElement()
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._watchedToggleHandler);

    this.getElement()
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._favoriteToggleHandler);

    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._commentInputHandler);

    this.getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, this._emotionHandler);
  }

  _popupCloseHandler(evt) {
    evt.preventDefault();
    this._callback.popupClose();
  }

  _watchlistToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isWatchList: !this._movie.isWatchList
    });
  }

  _watchedToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isWatched: !this._movie.isWatched
    });
  }

  _favoriteToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorite: !this._movie.isFavorite
    });
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      commentCloud: evt.target.value
    }, true);
  }

  _emotionHandler(evt) {
    evt.preventDefault();
    const target = evt.target;
    const popupWindow = document.querySelector(`.film-details`);
    switch (target.parentElement.getAttribute(`for`)) {
      case EmojiTypes.SMILE.name:
        this.updateData({
          emotionCloud: EmojiTypes.SMILE.text,
          isEmotionClick: true
        }, false, popupWindow.scrollTop);
        break;
      case EmojiTypes.SLEEPING.name:
        this.updateData({
          emotionCloud: EmojiTypes.SLEEPING.text,
          isEmotionClick: true
        }, false, popupWindow.scrollTop);
        break;
      case EmojiTypes.PUKE.name:
        this.updateData({
          emotionCloud: EmojiTypes.PUKE.text,
          isEmotionClick: true
        }, false, popupWindow.scrollTop);
        break;
      case EmojiTypes.ANGRY.name:
        this.updateData({
          emotionCloud: EmojiTypes.ANGRY.text,
          isEmotionClick: true
        }, false, popupWindow.scrollTop);
        break;
      default:
        break;
    }
  }

  _commentDeleteHandler(evt) {
    evt.preventDefault();
    const popupWindowBefore = document.querySelector(`.film-details`);
    let scrollPosition = popupWindowBefore.scrollTop;
    const commentId = evt.target.parentElement.parentElement.parentElement.getAttribute(`data-id`);
    this._callback.commentDelete(commentId);
    this.updateElement();
    const popupWindowAfter = document.querySelector(`.film-details`);
    popupWindowAfter.scrollTop = scrollPosition;
  }

  setCloseButtonClickHandler(callback) {
    this._callback.popupClose = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._popupCloseHandler);
  }

  setDeleteButtonClickHandler(callback) {
    this._callback.commentDelete = callback;
    const deleteButton = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    if (deleteButton) {
      for (let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener(`click`, this._commentDeleteHandler);
      }
    }
  }
}
