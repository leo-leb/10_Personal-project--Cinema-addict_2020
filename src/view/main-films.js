import {createMainFilmsSctructure} from "./main-films.template.js";
import AbstractView from "./abstract.js";

export default class MainFilmsSctructure extends AbstractView {
  getTemplate() {
    return createMainFilmsSctructure();
  }
}
