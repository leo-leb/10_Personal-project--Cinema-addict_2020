import {filterItemsTemplate} from "../../utils/render.js";

const createFiltersItem = (filter) => {
  const {name, count} = filter;
  if (name === `all`) {
    return (`<a href="#${name}" class="main-navigation__item main-navigation__item--active">All movies</a>`);
  } else {
    return (`<a href="#${name}" class="main-navigation__item" style="a:first-letter {text-transform: uppercase}">${name.slice(0, 1).toUpperCase() + name.slice(1)} <span class="main-navigation__item-count">${count}</span></a>`);
  }
};

export const createNavigation = (filters) => {
  return `<nav class="main-navigation">
  <div class="main-navigation__items">${filterItemsTemplate(filters, createFiltersItem)}</div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
