const compareRate = (a, b) => {
  return b.rate - a.rate;
};

const compareComments = (a, b) => {
  return b.comments - a.comments;
};

const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

export {compareRate, compareComments, render};
