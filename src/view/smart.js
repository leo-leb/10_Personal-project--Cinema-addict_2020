import AbstractView from "./abstract.js";

export default class Smart extends AbstractView {
  constructor() {
    super();
    this._movie = {};
  }

  updateElement() {
    this._callback.changeData(this._movie);
    this.restoreHandlers();
  }

  updateData(update) {
    if (!update) {
      return;
    }

    this._movie = Object.assign(
        {},
        this._movie,
        update
    );

    this.updateElement();
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
