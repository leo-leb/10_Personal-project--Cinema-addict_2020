import {createNavigation} from "./navigation.template";
import AbstractView from "../abstract";

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
