import FilmsCard from "./view/films-card.js";
import FilmsPopupView from "./view/film-details.js";
import {getRightId} from "./mock/movies.js";
import {render, RenderPosition} from "./utils.js";
import {MOVIE_SORT_EXTRA_COUNT, siteMain, siteBody, showMoreButtonComponent, movies} from "./main.js";

const ESC_KEYCODE = 27;

const renderMovie = (place, source, index) => {
  const filmsCardComponent = new FilmsCard(source[index]);
  render(place, filmsCardComponent.getElement(), RenderPosition.BEFOREEND);
  place.children[index].setAttribute(`data-id`, source[index].id);
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

const onMovieCardClick = () => {
  const cards = siteMain.querySelectorAll(`.film-card`);
  cards.forEach((card) => {
    const elements = card.querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`);
    elements.forEach((element) => {
      const movie = getRightId(movies, +card.getAttribute(`data-id`));
      const filmsPopupComponent = new FilmsPopupView(movie);
      const onCardHide = (evt) => {
        const target = evt.target;
        if (target.getAttribute(`class`) !== `film-details__close-btn`) {
          return;
        }
        filmsPopupComponent.getElement().remove();
        filmsPopupComponent.removeElement();
      };
      const onEscPressInPopup = (evt) => {
        if (evt.keyCode === ESC_KEYCODE) {
          evt.preventDefault();
          filmsPopupComponent.getElement().remove();
          filmsPopupComponent.removeElement();
          document.removeEventListener(`keydown`, onEscPressInPopup);
        }
      };
      const onCardShow = () => {
        render(siteBody, filmsPopupComponent.getElement(), RenderPosition.BEFOREEND);
        siteBody.addEventListener(`click`, onCardHide);
        document.addEventListener(`keydown`, onEscPressInPopup);
      };
      element.addEventListener(`click`, onCardShow);
    });
  });
};

export {renderMovie, onMovieListShowMore, onMovieCardClick};
