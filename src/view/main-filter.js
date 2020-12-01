import {filterItemsTemplate} from "../viewing.js";

const createFilterItemTemplate = (filter) => {
  const {name, count} = filter;
  if (name === `all`) {
    return (`<a href="#${name}" class="main-navigation__item main-navigation__item--active">All movies</a>`);
  } else {
    return (`<a href="#${name}" class="main-navigation__item" style="a:first-letter {text-transform: uppercase}">${name.slice(0, 1).toUpperCase() + name.slice(1)} <span class="main-navigation__item-count">${count}</span></a>`);
  }
};

export const createMainFilter = (filterItems) => {
  return `<div class="main-navigation__items">
  ${filterItemsTemplate(filterItems, createFilterItemTemplate)}
  </div>`;
};
