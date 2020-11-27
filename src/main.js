import {createUserRankTemplate} from "./view/user-rank.js";
import {createMainNavigation} from "./view/main-navigation.js";
import {createMainFilter} from "./view/main-filter.js";
import {createMainSort} from "./view/main-sort.js";
import {createMainFilmsSctructure} from "./view/main-films.js";
import {createShowMoreButton} from "./view/films-show-more.js";
import {createFilmsCard} from "./view/films-card.js";
import {createFilmsStatistic} from "./view/films-statistic.js";
import {createFilmPopup} from "./view/film-details.js";
import {generateComment, generateMovie} from "./mock/movie.js";
import {generateFilter} from "./mock/filter.js";

const MOVIE_SORT_COUNT = 5;
const MOVIE_SORT_EXTRA_COUNT = 5;
const MOVIE_EXTRA_COUNT = 2;
const MOVIES_MOCK_COUNT = 15;
const COMMENTS_MOCK_COUNT = 5;

const comments = new Array(COMMENTS_MOCK_COUNT).fill().map(generateComment);
const movies = new Array(MOVIES_MOCK_COUNT).fill().map(generateMovie);
const filters = generateFilter(movies);

// актуально для работы с моками
movies.forEach((movie) => {
  movie[`id`] = movies.indexOf(movie).toString();
});

const siteBody = document.querySelector(`body`);
const siteHeader = siteBody.querySelector(`header`);
const siteMain = siteBody.querySelector(`main`);
const siteFooter = siteBody.querySelector(`footer`);
const footerStatistic = siteFooter.querySelector(`.footer__statistics`);

const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

render(siteHeader, createUserRankTemplate(), `beforeend`);
render(siteMain, createMainNavigation(), `beforeend`);

const siteMainNavigation = siteMain.querySelector(`.main-navigation`);

render(siteMainNavigation, createMainFilter(filters), `afterbegin`);
render(siteMain, createMainSort(), `beforeend`);
render(siteMain, createMainFilmsSctructure(), `beforeend`);
render(footerStatistic, createFilmsStatistic(), `beforeend`);

const filmsList = siteMain.querySelector(`.films`);

const renderMovie = (place, index) => {
  render(place, createFilmsCard(movies[index]), `beforeend`);
};

const compareRate = function (a, b) {
  return b.rate - a.rate;
};

const compareComments = function (a, b) {
  return b.comments - a.comments;
};

const renderMovieExtra = (place, index, library) => {
  render(place, createFilmsCard(library[index]), `beforeend`);
};

[].forEach.call(filmsList.children, function (element) {
  let title = element.querySelector(`h2`);
  let mainFilmsContainer = element.querySelector(`.films-list__container`);
  if (title.textContent === `All movies. Upcoming`) {
    for (let i = 0; i < MOVIE_SORT_COUNT; i++) {
      renderMovie(mainFilmsContainer, i);
      mainFilmsContainer.children[i].setAttribute(`data-id`, movies[i].id);
    }
    render(element, createShowMoreButton(), `beforeend`);
  } else if (title.textContent === `Top rated`) {
    const moviesRated = movies.sort(compareRate);
    for (let i = 0; i < MOVIE_EXTRA_COUNT; i++) {
      renderMovieExtra(mainFilmsContainer, i, moviesRated);
      mainFilmsContainer.children[i].setAttribute(`data-id`, moviesRated[i].id);
    }
  } else {
    const moviesCommented = movies.sort(compareComments);
    for (let i = 0; i < MOVIE_EXTRA_COUNT; i++) {
      renderMovieExtra(mainFilmsContainer, i, moviesCommented);
      mainFilmsContainer.children[i].setAttribute(`data-id`, moviesCommented[i].id);
    }
  }
});

const allMovies = filmsList.querySelector(`.films-list`);
const mainFilmsContainer = allMovies.querySelector(`.films-list__container`);
const showMoreButton = allMovies.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  let actualMovieStorageSize = mainFilmsContainer.children.length;
  if (movies.length - actualMovieStorageSize <= 5) {
    for (let i = actualMovieStorageSize; i < movies.length; i++) {
      renderMovie(mainFilmsContainer, i);
    }
    showMoreButton.style.display = `none`;
  } else {
    for (let i = actualMovieStorageSize; i < actualMovieStorageSize + MOVIE_SORT_EXTRA_COUNT; i++) {
      renderMovie(mainFilmsContainer, i);
    }
  }
});

const getRightId = (index) => {
  const result = movies.find((movie) => {
    return movie.id === index;
  });
  return result;
};

const cards = document.querySelectorAll(`.film-card`);

cards.forEach((card) => {
  const elements = card.querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`);
  elements.forEach((element) => {
    element.addEventListener(`mousedown`, (evt) => {
      if (evt.which === 1) {
        evt.preventDefault();
        render(siteBody, createFilmPopup(getRightId(card.getAttribute(`data-id`))), `beforeend`);
      }
    });
  });
});
