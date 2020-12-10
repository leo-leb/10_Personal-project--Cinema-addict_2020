import UserRankView from "./view/user-rank.js";
import NavigationView from "./view/navigation/navigation.js";
import SortView from "./view/sort.js";
import MoviesContainerView from "./view/movies-container/movies-container.js";
import NoMoviesView from "./view/no-movies.js";
import ShowMoreButtonView from "./view/show-more-movies.js";
import StatisticView from "./view/statistic.js";
import {generateMovie} from "./mock/movies.js";
import {generateComment} from "./mock/comments.js";
import {generateFilter} from "./mock/filters.js";
import {compareRate, compareComments} from "./utils/common.js";
import {render, RenderPosition} from "./utils/render.js";
import {renderMovie, onMovieListShowMore} from "./movie.js";

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
render(siteMain, new NavigationView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMain, new SortView().getElement(), RenderPosition.BEFOREEND);

if (movies.length === 0) {
  render(siteMain, new NoMoviesView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(siteMain, new MoviesContainerView().getElement(), RenderPosition.BEFOREEND);
}

render(footerStatistic, new StatisticView().getElement(), RenderPosition.BEFOREEND);

const showMoreButtonComponent = new ShowMoreButtonView();

const filmsList = siteMain.querySelector(`.films`);
Array.from(filmsList.children).forEach((element) => {
  const title = element.querySelector(`h2`);
  const mainFilmsContainer = element.querySelector(`.films-list__container`);
  let moviesRated = movies.slice().sort(compareRate);
  let moviesCommented = movies.slice().sort(compareComments);

  if (title.textContent === `All movies. Upcoming`) {
    for (let i = 0; i < MOVIE_SORT_COUNT; i++) {
      renderMovie(mainFilmsContainer, movies[i]);
    }
    render(element, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);
    showMoreButtonComponent.setClickHandler(() => onMovieListShowMore());
  } else if (title.textContent === `Top rated`) {
    for (let i = 0; i < MOVIE_EXTRA_COUNT; i++) {
      renderMovie(mainFilmsContainer, moviesRated[i]);
    }
  } else {
    for (let i = 0; i < MOVIE_EXTRA_COUNT; i++) {
      renderMovie(mainFilmsContainer, moviesCommented[i]);
    }
  }
});

export {MOVIE_SORT_EXTRA_COUNT, siteMain, siteBody, filmsList, showMoreButtonComponent, movies, filters};
