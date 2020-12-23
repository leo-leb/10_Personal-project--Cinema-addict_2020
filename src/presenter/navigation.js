import NavigationView from "../view/navigation/navigation.js";
import {generateFilter} from "../mock/filters.js";
import {render, RenderPosition} from "../utils/render.js";

export default class Navigation {
  constructor(parent, filtersList) {
    this._navigationParent = parent;
    this._filtersList = filtersList;
  }

  init() {
    this.navigationComponent = new NavigationView(this._filtersList);
    this._renderNavigation(this.navigationComponent);
  }

  _renderNavigation(component) {
    render(this._navigationParent, component.getElement(), RenderPosition.BEFOREEND);
  }

  destroy() {
    const navigationSection = this._navigationParent.querySelector(`.main-navigation`);
    navigationSection.remove();
  }

  _updateNavigationHandler(source) {
    this.destroy();
    this._filtersList = {};
    this._filtersList = generateFilter(source);
  }
}
