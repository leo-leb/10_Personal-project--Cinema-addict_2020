import AbstractView from "./abstract.js";

export const createMainStatisics = () => {
  return `<a href="#stats" class="main-navigation__additional">Stats</a>`;
};

export default class MainStatistics extends AbstractView {
  getTemplate() {
    return createMainStatisics();
  }
}
