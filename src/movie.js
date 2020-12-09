import MovieCardView from "./view/movie-card.js";
import MoviePopupView from "./view/movie-popup.js";
import {getRightId} from "./mock/movies.js";
import {isEscEvent} from "./utils/common.js";
import {render, RenderPosition} from "./utils/render.js";
import {MOVIE_SORT_EXTRA_COUNT, siteMain, siteBody, showMoreButtonComponent, movies} from "./main.js";

const cardShow = (movieCard) => {
  const movie = getRightId(movies, +movieCard.getElement().getAttribute(`data-id`));
  const moviePopupComponent = new MoviePopupView(movie);

  const escActionsInPopup = () => {
    moviePopupComponent.getElement().remove();
    moviePopupComponent.removeElement();
    document.removeEventListener(`keydown`, onEscPressInPopup);
  };
  const onEscPressInPopup = (evt) => isEscEvent(evt, escActionsInPopup);

  const cardHide = () => {
    moviePopupComponent.getElement().remove();
    moviePopupComponent.removeElement();
  };

  const randomCard = siteBody.querySelector(`.film-details`);

  if (randomCard) {
    randomCard.remove();
    render(siteBody, moviePopupComponent.getElement(), RenderPosition.BEFOREEND);
  } else {
    render(siteBody, moviePopupComponent.getElement(), RenderPosition.BEFOREEND);
  }

  moviePopupComponent.setPopupCloseHandler(() => cardHide());
  document.addEventListener(`keydown`, onEscPressInPopup);
};

const renderMovie = (place, source) => {
  const movieCardComponent = new MovieCardView(source);
  render(place, movieCardComponent.getElement(), RenderPosition.BEFOREEND);
  movieCardComponent.getElement().setAttribute(`data-id`, source.id);

  movieCardComponent.setMovieCardOpenHandler(() => cardShow(movieCardComponent));
};

const onMovieListShowMore = () => {
  const mainFilmsContainer = siteMain.querySelector(`.films-list__container`);
  let actualMovieStorageSize = mainFilmsContainer.children.length;
  let extraCount = actualMovieStorageSize + MOVIE_SORT_EXTRA_COUNT;
  if (movies.length - actualMovieStorageSize <= 5) {
    for (let i = actualMovieStorageSize; i < extraCount; i++) {
      renderMovie(mainFilmsContainer, movies[i]);
    }
    showMoreButtonComponent.getElement().remove();
    showMoreButtonComponent.removeElement();
    return;
  }
  for (let i = actualMovieStorageSize; i < extraCount; i++) {
    renderMovie(mainFilmsContainer, movies[i]);
  }
};

export {renderMovie, onMovieListShowMore};
