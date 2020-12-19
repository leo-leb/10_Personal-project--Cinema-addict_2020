import {createNavigation} from "./navigation.template.js";
import AbstractView from "../abstract.js";

export default class Navigation extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createNavigation(this._filters);
  }
  // _navigationUpdateHandler(evt)
}
