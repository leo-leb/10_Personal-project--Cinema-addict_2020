import AbstractView from "./abstract.js";

export default class Smart extends AbstractView {
  constructor() {
    super();
    this._movie = {};
  }

  updateData(update) {
    this._movie = Object.assign(
        {},
        this._movie,
        update
    );

    this.restoreHandlers();
    return this._movie;
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }
}
