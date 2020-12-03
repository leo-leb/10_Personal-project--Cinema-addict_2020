import UserRankView from "./view/user-rank.js";
import MainNavigationView from "./view/main-navigation.js";
import MainStatisticsView from "./view/main-statistics.js";
import MainFiltersView from "./view/main-filter.js";
import MainSortView from "./view/main-sort.js";
import MainFilmsSctructureView from "./view/main-films.js";
import ShowMoreButtonView from "./view/films-show-more.js";
import FilmsStatisticView from "./view/films-statistic.js";
import {generateMovie} from "./mock/movies.js";
import {generateComment} from "./mock/comments.js";
import {generateFilter} from "./mock/filters.js";
import {compareRate, compareComments, RenderPosition, render} from "./utils.js";
import {renderMovie, onMovieListShowMore, onMovieCardClick} from "./movie.js";

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

let movies = [];
for (let i = 0; i < MOVIES_MOCK_COUNT; i++) {
  movies.push(generateMovie(i));
}

let comments = new Array(COMMENTS_MOCK_COUNT).fill().map(generateComment);

let filters = generateFilter(movies);

// генерация элементов разметки

render(siteHeader, new UserRankView().getElement(), RenderPosition.BEFOREEND);
render(siteMain, new MainNavigationView().getElement(), RenderPosition.BEFOREEND);

const siteMainNavigation = siteMain.querySelector(`.main-navigation`);

render(siteMainNavigation, new MainStatisticsView().getElement(), RenderPosition.BEFOREEND);
render(siteMainNavigation, new MainFiltersView(filters).getElement(), RenderPosition.AFTERBEGIN);

render(siteMain, new MainSortView().getElement(), RenderPosition.BEFOREEND);
render(siteMain, new MainFilmsSctructureView().getElement(), RenderPosition.BEFOREEND);
render(footerStatistic, new FilmsStatisticView().getElement(), RenderPosition.BEFOREEND);

const showMoreButtonComponent = new ShowMoreButtonView();

const filmsList = siteMain.querySelector(`.films`);
[].forEach.call(filmsList.children, (element) => {
  const title = element.querySelector(`h2`);
  const mainFilmsContainer = element.querySelector(`.films-list__container`);
  let moviesRated = movies.slice().sort(compareRate);
  let moviesCommented = movies.slice().sort(compareComments);

  if (title.textContent === `All movies. Upcoming`) {
    for (let i = 0; i < MOVIE_SORT_COUNT; i++) {
      renderMovie(mainFilmsContainer, movies, i);
    }
    render(element, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);
  } else if (title.textContent === `Top rated`) {
    for (let i = 0; i < MOVIE_EXTRA_COUNT; i++) {
      renderMovie(mainFilmsContainer, moviesRated, i);
    }
  } else {
    for (let i = 0; i < MOVIE_EXTRA_COUNT; i++) {
      renderMovie(mainFilmsContainer, moviesCommented, i);
    }
  }
});

const showMoreButton = siteMain.querySelector(`.films-list__show-more`);

document.addEventListener(`DOMContentLoaded`, onMovieCardClick);

showMoreButton.addEventListener(`click`, function () {
  onMovieListShowMore();
  onMovieCardClick();
});

export {MOVIE_SORT_EXTRA_COUNT, siteMain, siteBody, showMoreButtonComponent, movies, filters};
