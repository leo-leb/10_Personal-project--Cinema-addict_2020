import UserRankView from "./view/user-rank";
import NavigationView from "./view/navigation/navigation";
import SortView from "./view/sort";
import StatisticView from "./view/statistic";
import MoviesList from "./presenter/movies-list";
import {generateMovie} from "./mock/movies";
import {generateComment} from "./mock/comments";
import {generateFilter} from "./mock/filters";
import {render, RenderPosition} from "./utils/render";
import {MOVIES_MOCK_COUNT, COMMENTS_MOCK_COUNT} from "./consts";

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
