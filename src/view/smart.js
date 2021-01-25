import AbstractView from "./abstract";

export default class Smart extends AbstractView {
  constructor() {
    super();
    this._movie = {};
  }

  updateElement(actionType, updateType) {
    console.log(actionType);
    console.log(updateType);
    this._callback.changeData(actionType, updateType, this._movie);
    this.restoreHandlers();
  }

  updateData(actionType, updateType, update, justDataUpdating, scrollPosition) {
    if (!update) {
      return;
    }

    this._movie = Object.assign(
        {},
        this._movie,
        update
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement(actionType, updateType);

    const popupWindow = document.querySelector(`.film-details`);
    popupWindow.scrollTop = scrollPosition;
  }

  getUpdatedMovie() {
    return this._movie;
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }

  setControlsClickHandler(callback) {
    this._callback.changeData = callback;
    this._setInnerHandlers();
  }
}
