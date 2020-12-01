import {createUserRankTemplate} from "./view/user-rank.js";
import {createMainNavigation} from "./view/main-navigation.js";
import {createMainFilter} from "./view/main-filter.js";
import {createMainSort} from "./view/main-sort.js";
import {createMainFilmsSctructure} from "./view/main-films.js";
import {createShowMoreButton} from "./view/films-show-more.js";
import {createFilmsStatistic} from "./view/films-statistic.js";
import {createFilmPopup} from "./view/film-details.js";
import {generateMovie, getRightId} from "./mock/movies.js";
import {generateComment} from "./mock/comments.js";
import {generateFilter} from "./mock/filters.js";
import {compareRate, compareComments, render} from "./common.js";
import {renderMovie, onMovieListShowMore, onCardHide} from "./movie.js";

const MOVIE_SORT_COUNT = 5;
const MOVIE_SORT_EXTRA_COUNT = 5;
const MOVIE_EXTRA_COUNT = 2;
const MOVIES_MOCK_COUNT = 15;
const COMMENTS_MOCK_COUNT = 5;

const siteBody = document.querySelector(`body`);
const siteHeader = siteBody.querySelector(`header`);
const siteMain = siteBody.querySelector(`main`);
const siteFooter = siteBody.querySelector(`footer`);
const footerStatistic = siteFooter.querySelector(`.footer__statistics`);

// создание массива моковых данных с фильмами
let movies = [];
for (let i = 0; i < MOVIES_MOCK_COUNT; i++) {
  movies.push(generateMovie(i));
}

// создание массива моковых данных с комментариями
let comments = new Array(COMMENTS_MOCK_COUNT).fill().map(generateComment);

// создание массива моковых данных с фильтрами
const filters = generateFilter(movies);

// генерация элементов разметки

render(siteHeader, createUserRankTemplate(), `beforeend`);
render(siteMain, createMainNavigation(), `beforeend`);

const siteMainNavigation = siteMain.querySelector(`.main-navigation`);
render(siteMainNavigation, createMainFilter(filters), `afterbegin`);

render(siteMain, createMainSort(), `beforeend`);
render(siteMain, createMainFilmsSctructure(), `beforeend`);
render(footerStatistic, createFilmsStatistic(), `beforeend`);

const filmsList = siteMain.querySelector(`.films`);
[].forEach.call(filmsList.children, (element) => {
  const title = element.querySelector(`h2`);
  const mainFilmsContainer = element.querySelector(`.films-list__container`);
  let moviesRated = movies.slice().sort(compareRate);
  let moviesCommented = movies.slice().sort(compareComments);

  if (title.textContent === `All movies. Upcoming`) {
    renderMovie(mainFilmsContainer, movies, MOVIE_SORT_COUNT, 0);
    render(element, createShowMoreButton(), `beforeend`);
  } else if (title.textContent === `Top rated`) {
    renderMovie(mainFilmsContainer, moviesRated, MOVIE_EXTRA_COUNT, 0);
  } else {
    renderMovie(mainFilmsContainer, moviesCommented, MOVIE_EXTRA_COUNT, 0);
  }
});

const cards = siteMain.querySelectorAll(`.film-card`);
cards.forEach((card) => {
  const elements = card.querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`);
  elements.forEach((element) => {
    const onCardShow = () => {
      render(siteBody, createFilmPopup(getRightId(movies, +card.getAttribute(`data-id`))), `beforeend`);
      siteBody.addEventListener(`click`, onCardHide);
    };
    element.addEventListener(`click`, onCardShow);
  });
});

const allMovies = filmsList.querySelector(`.films-list`);
const mainFilmsContainer = allMovies.querySelector(`.films-list__container`);
const showMoreButton = allMovies.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, onMovieListShowMore);

export {MOVIE_SORT_EXTRA_COUNT, movies, mainFilmsContainer, showMoreButton};
