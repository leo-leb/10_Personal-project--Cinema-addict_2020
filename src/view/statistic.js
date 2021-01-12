import AbstractView from "./abstract";

const createStatistic = () => {
  return `<p>130 291 movies inside</p>`;
};

export default class Statistic extends AbstractView {
  getTemplate() {
    return createStatistic();
  }
}
