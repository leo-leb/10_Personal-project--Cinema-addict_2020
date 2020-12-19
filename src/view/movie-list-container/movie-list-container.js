import {createMovieListContainer} from "./movie-list-container.template.js";
import AbstractView from "../abstract.js";

export default class MovieListContainer extends AbstractView {
  getTemplate() {
    return createMovieListContainer();
  }
}
