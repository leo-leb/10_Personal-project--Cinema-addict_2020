import {createMoviesContainer} from "./movies-container.template.js";
import AbstractView from "./abstract.js";

export default class MoviesContainer extends AbstractView {
  getTemplate() {
    return createMoviesContainer();
  }
}
