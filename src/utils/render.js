const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const render = (container, element, position) => {
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

export {RenderPosition, render, genresAdd, filterItemsTemplate};
