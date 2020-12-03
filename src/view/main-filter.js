import {createElement} from "../utils.js";
import {filterItemsTemplate} from "../viewing.js";

const createFilterItemTemplate = (filter) => {
  const {name, count} = filter;
  if (name === `all`) {
    return (`<a href="#${name}" class="main-navigation__item main-navigation__item--active">All movies</a>`);
  } else {
    return (`<a href="#${name}" class="main-navigation__item" style="a:first-letter {text-transform: uppercase}">${name.slice(0, 1).toUpperCase() + name.slice(1)} <span class="main-navigation__item-count">${count}</span></a>`);
  }
};

const createMainFilters = (source) => {
  return `<div class="main-navigation__items">
  ${filterItemsTemplate(source, createFilterItemTemplate)}
  </div>`;
};

export default class MainFilters {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createMainFilters(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
