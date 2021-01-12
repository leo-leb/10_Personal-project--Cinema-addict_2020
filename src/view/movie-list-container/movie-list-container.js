import {createMovieListContainer} from "./movie-list-container.template";
import AbstractView from "../abstract";

export default class MovieListContainer extends AbstractView {
  getTemplate() {
    return createMovieListContainer();
  }
}
