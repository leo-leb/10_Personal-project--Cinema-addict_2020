import AbstractView from "./abstract.js";

const createStatistic = () => {
  return `<p>130 291 movies inside</p>`;
};

export default class Statistic extends AbstractView {
  getTemplate() {
    return createStatistic();
  }
}
