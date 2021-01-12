import Abstract from "../view/abstract";
import {RenderPosition} from "../consts";

const render = (container, element, position) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    default:
      container.append(element);
  }
};

const genresAdd = (source, createMarkup) => {
  return source.split(` `).map((value) => createMarkup(value)).join(``);
};

const filterItemsTemplate = (item, createMarkup) => {
  return item.map((filter) => createMarkup(filter)).join(``);
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

const getRightMoviesContainer = (name) => {
  const films = Array.from(document.querySelectorAll(`.films-list`));
  const container = films.find((item) => {
    const title = item.querySelector(`.films-list__title`);
    return title.textContent === name;
  });
  return container;
};

export {RenderPosition, remove, replace, render, genresAdd, filterItemsTemplate, getRightMoviesContainer};
