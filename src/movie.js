import FilmsCard from "./view/films-card.js";
import FilmsPopupView from "./view/film-details.js";
import {getRightId} from "./mock/movies.js";
import {isEscEvent} from "./utils/common.js";
import {render, RenderPosition} from "./utils/render.js";
import {MOVIE_SORT_EXTRA_COUNT, siteMain, siteBody, showMoreButtonComponent, movies} from "./main.js";

const cardShow = (filmsCard) => {
  const movie = getRightId(movies, +filmsCard.getElement().getAttribute(`data-id`));
  const filmsPopupComponent = new FilmsPopupView(movie);

  const escActionsInPopup = () => {
    filmsPopupComponent.getElement().remove();
    filmsPopupComponent.removeElement();
    document.removeEventListener(`keydown`, onEscPressInPopup);
  };
  const onEscPressInPopup = (evt) => isEscEvent(evt, escActionsInPopup);

  const cardHide = () => {
    filmsPopupComponent.getElement().remove();
    filmsPopupComponent.removeElement();
  };

  render(siteBody, filmsPopupComponent.getElement(), RenderPosition.BEFOREEND);
  filmsPopupComponent.setPopupCloseHandler(() => cardHide());
  document.addEventListener(`keydown`, onEscPressInPopup);
};

const renderMovie = (place, source, index) => {
  const filmsCardComponent = new FilmsCard(source[index]);
  render(place, filmsCardComponent.getElement(), RenderPosition.BEFOREEND);
  place.children[index].setAttribute(`data-id`, source[index].id);
  filmsCardComponent.setFilmsCardOpenHandler(() => cardShow(filmsCardComponent));
};

const onMovieListShowMore = () => {
  const mainFilmsContainer = siteMain.querySelector(`.films-list__container`);
  let actualMovieStorageSize = mainFilmsContainer.children.length;
  let extraCount = actualMovieStorageSize + MOVIE_SORT_EXTRA_COUNT;
  if (movies.length - actualMovieStorageSize <= 5) {
    for (let i = actualMovieStorageSize; i < extraCount; i++) {
      renderMovie(mainFilmsContainer, movies, i);
    }
    showMoreButtonComponent.getElement().remove();
    showMoreButtonComponent.removeElement();
    return;
  }
  for (let i = actualMovieStorageSize; i < extraCount; i++) {
    renderMovie(mainFilmsContainer, movies, i);
  }
};

export {renderMovie, onMovieListShowMore};
