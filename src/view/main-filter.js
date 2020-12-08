import {createMainFilters} from "./main-filter.template.js";
import AbstractView from "./abstract.js";

export default class MainFilters extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMainFilters(this._filters);
  }
}
