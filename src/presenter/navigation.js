import NavigationView from "../view/navigation/navigation";
import {generateFilter} from "../mock/filters";
import {render, RenderPosition} from "../utils/render";

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
