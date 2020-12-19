import NavigationView from "../view/navigation/navigation.js";
import {generateFilter} from "../mock/filters.js";
import {render, RenderPosition} from "../utils/render.js";

// const siteMain = document.querySelector(`main`);

export default class Navigation {
  constructor(parent, filtersList) {
    this._navigationParent = parent;
    this._filtersList = filtersList;

    // this._navigationComponent = new NavigationView(this._filters);

    // this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
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
    console.log(this._filtersList);
    this._filtersList = {};
    this._filtersList = generateFilter(source);
    console.log(this._filtersList);
    // debugger;
    // this.navigationComponent = new NavigationView(this._filtersList);
    // this._renderNavigation(this.navigationComponent);
  }
}
