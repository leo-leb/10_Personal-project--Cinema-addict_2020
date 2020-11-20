import {createUserRankTemplate} from "./view/user-rank.js";
import {createMainMenu} from "./view/main-menu.js";
import {createMainSort} from "./view/main-sort.js";
import {createMainFilmsSctructure} from "./view/main-films.js";
import {createShowMoreButton} from "./view/films-show-more.js";
import {createFilmsCard} from "./view/films-card.js";
import {createFilmsStatistic} from "./view/films-statistic.js";
import {createFilmPopup} from "./view/film-details.js";

const MOVIE_SORT_COUNT = 5;
const MOVIE_EXTRA_COUNT = 2;

const siteBody = document.querySelector(`body`);
const siteHeader = siteBody.querySelector(`header`);
const siteMain = siteBody.querySelector(`main`);
const siteFooter = siteBody.querySelector(`footer`);
const footerStatistic = siteFooter.querySelector(`.footer__statistics`);

const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

render(siteHeader, createUserRankTemplate(), `beforeend`);
render(siteMain, createMainMenu(), `beforeend`);
render(siteMain, createMainSort(), `beforeend`);
render(siteMain, createMainFilmsSctructure(), `beforeend`);
render(footerStatistic, createFilmsStatistic(), `beforeend`);
render(siteBody, createFilmPopup(), `beforeend`);

const filmsList = siteMain.querySelector(`.films`).children;

[].forEach.call(filmsList, function (element) {
  let title = element.querySelector(`h2`);
  let mainFilmsContainer = element.querySelector(`.films-list__container`);
  if (title.textContent === `All movies. Upcoming`) {
    for (let i = 0; i < MOVIE_SORT_COUNT; i++) {
      render(mainFilmsContainer, createFilmsCard(), `beforeend`);
    }
    render(element, createShowMoreButton(), `beforeend`);
  } else {
    for (let i = 0; i < MOVIE_EXTRA_COUNT; i++) {
      render(mainFilmsContainer, createFilmsCard(), `beforeend`);
    }
  }
});
