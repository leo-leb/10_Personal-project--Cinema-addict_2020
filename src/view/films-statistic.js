import AbstractView from "./abstract.js";

const createFilmsStatistic = () => {
  return `<p>130 291 movies inside</p>`;
};

export default class FilmsStatistic extends AbstractView {
  getTemplate() {
    return createFilmsStatistic();
  }
}
