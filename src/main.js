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
import {compareRate, compareComments, render} from "./control/utils.js";

const MOVIE_SORT_COUNT = 5;
const MOVIE_SORT_EXTRA_COUNT = 5;
const MOVIE_EXTRA_COUNT = 2;
const MOVIES_MOCK_COUNT = 15;
const COMMENTS_MOCK_COUNT = 5;

let movies = [];
for (let i = 0; i < MOVIES_MOCK_COUNT; i++) {
  movies.push(generateMovie(i));
}

const comments = new Array(COMMENTS_MOCK_COUNT).fill().map(generateComment);

const filters = generateFilter(movies);

const siteBody = document.querySelector(`body`);
const siteHeader = siteBody.querySelector(`header`);
const siteMain = siteBody.querySelector(`main`);
const siteFooter = siteBody.querySelector(`footer`);
const footerStatistic = siteFooter.querySelector(`.footer__statistics`);

render(siteHeader, createUserRankTemplate(), `beforeend`);
render(siteMain, createMainNavigation(), `beforeend`);

const siteMainNavigation = siteMain.querySelector(`.main-navigation`);

render(siteMainNavigation, createMainFilter(filters), `afterbegin`);
render(siteMain, createMainSort(), `beforeend`);
render(siteMain, createMainFilmsSctructure(), `beforeend`);
render(footerStatistic, createFilmsStatistic(), `beforeend`);

const filmsList = siteMain.querySelector(`.films`);

const renderMovie = (place, source, index) => {
  render(place, createFilmsCard(source[index]), `beforeend`);
  place.children[index].setAttribute(`data-id`, source[index].id);
};

[].forEach.call(filmsList.children, (element) => {
  let title = element.querySelector(`h2`);
  let mainFilmsContainer = element.querySelector(`.films-list__container`);
  if (title.textContent === `All movies. Upcoming`) {
    for (let i = 0; i < MOVIE_SORT_COUNT; i++) {
      renderMovie(mainFilmsContainer, movies, i);
    }
    render(element, createShowMoreButton(), `beforeend`);
  } else if (title.textContent === `Top rated`) {
    const moviesRated = movies.slice().sort(compareRate);
    for (let i = 0; i < MOVIE_EXTRA_COUNT; i++) {
      renderMovie(mainFilmsContainer, moviesRated, i);
    }
  } else {
    const moviesCommented = movies.slice().sort(compareComments);
    for (let i = 0; i < MOVIE_EXTRA_COUNT; i++) {
      renderMovie(mainFilmsContainer, moviesCommented, i);
    }
  }
});

const allMovies = filmsList.querySelector(`.films-list`);
const mainFilmsContainer = allMovies.querySelector(`.films-list__container`);
const showMoreButton = allMovies.querySelector(`.films-list__show-more`);

const onMovieListShowMore = () => {
  let actualMovieStorageSize = mainFilmsContainer.children.length;
  let extraCount = actualMovieStorageSize + MOVIE_SORT_EXTRA_COUNT;
  if (movies.length - actualMovieStorageSize <= 5) {
    for (let i = actualMovieStorageSize; i < movies.length; i++) {
      renderMovie(mainFilmsContainer, movies, i);
    }
    showMoreButton.style.display = `none`;
    return;
  }
  for (let i = actualMovieStorageSize; i < extraCount; i++) {
    renderMovie(mainFilmsContainer, movies, i);
  }
};

showMoreButton.addEventListener(`click`, onMovieListShowMore);

const getRightId = (index) => movies.find((movie) => movie.id === index);

const cards = document.querySelectorAll(`.film-card`);

const onCardHide = (evt) => {
  const target = evt.target;
  if (target.getAttribute(`class`) !== `film-details__close-btn`) {
    return;
  }
  const popupMovie = siteBody.querySelector(`.film-details`);
  popupMovie.remove();
};

cards.forEach((card) => {
  const elements = card.querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`);
  elements.forEach((element) => {
    const onCardShow = () => {
      render(siteBody, createFilmPopup(getRightId(+card.getAttribute(`data-id`))), `beforeend`);
      siteBody.addEventListener(`click`, onCardHide);
    };
    element.addEventListener(`click`, onCardShow);
  });
});
