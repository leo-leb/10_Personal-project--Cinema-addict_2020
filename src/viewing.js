const genresAdd = (source, createMarkup) => {
  return source.split(` `).map((value) => createMarkup(value)).join(``);
};

const filterItemsTemplate = (item, createMarkup) => {
  return item.map((filter) => createMarkup(filter)).join(``);
};

export {genresAdd, filterItemsTemplate};
