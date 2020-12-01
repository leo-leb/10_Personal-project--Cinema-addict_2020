import {createFilmsCard} from "./view/films-card.js";
import {render} from "./common.js";
import {MOVIE_SORT_EXTRA_COUNT, movies, mainFilmsContainer, showMoreButton} from "./main.js";

const renderMovie = (place, source, limit, startIndex) => {
  for (let i = startIndex; i < limit; i++) {
    render(place, createFilmsCard(source[i]), `beforeend`);
    place.children[i].setAttribute(`data-id`, source[i].id);
  }
};

const onMovieListShowMore = () => {
  let actualMovieStorageSize = mainFilmsContainer.children.length;
  let extraCount = actualMovieStorageSize + MOVIE_SORT_EXTRA_COUNT;
  if (movies.length - actualMovieStorageSize <= 5) {
    renderMovie(mainFilmsContainer, movies, movies.length, actualMovieStorageSize);
    showMoreButton.style.display = `none`;
    return;
  }
  renderMovie(mainFilmsContainer, movies, extraCount, actualMovieStorageSize);
};

const onCardHide = (evt) => {
  const target = evt.target;
  if (target.getAttribute(`class`) !== `film-details__close-btn`) {
    return;
  }
  const popupMovie = document.querySelector(`.film-details`);
  popupMovie.remove();
};

export {renderMovie, onMovieListShowMore, onCardHide};
