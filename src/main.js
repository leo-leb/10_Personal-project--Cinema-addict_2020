import UserRankView from "./view/user-rank.js";
import NavigationView from "./view/navigation/navigation.js";
import SortView from "./view/sort.js";
import StatisticView from "./view/statistic.js";
import MoviesList from "./presenter/movies-list.js";
import {generateMovie} from "./mock/movies.js";
import {generateComment} from "./mock/comments.js";
import {generateFilter} from "./mock/filters.js";
import {render, RenderPosition} from "./utils/render.js";

const MOVIES_MOCK_COUNT = 15;
const COMMENTS_MOCK_COUNT = 5;

const siteBody = document.querySelector(`body`);
const siteHeader = siteBody.querySelector(`header`);
const siteMain = siteBody.querySelector(`main`);
const siteFooter = siteBody.querySelector(`footer`);
const footerStatistic = siteFooter.querySelector(`.footer__statistics`);

let movies = new Array(MOVIES_MOCK_COUNT).fill().map(generateMovie);
let comments = new Array(COMMENTS_MOCK_COUNT).fill().map(generateComment);
let filters = generateFilter(movies);

render(siteHeader, new UserRankView().getElement(), RenderPosition.BEFOREEND);
render(siteMain, new NavigationView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMain, new SortView().getElement(), RenderPosition.BEFOREEND);
render(footerStatistic, new StatisticView().getElement(), RenderPosition.BEFOREEND);

const movieList = new MoviesList(siteMain).init(movies);

export {siteBody, movies, filters};
