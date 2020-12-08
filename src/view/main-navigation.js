import AbstractView from "./abstract.js";

export const createMainNavigation = () => {
  return `<nav class="main-navigation"></nav>`;
};

export default class MainNavigation extends AbstractView {
  getTemplate() {
    return createMainNavigation();
  }
}
