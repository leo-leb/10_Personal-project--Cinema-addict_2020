const Mode = {
  POPUP_CLOSED: `CLOSED`,
  POPUP_OPEN: `OPEN`
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const MoviesCount = {
  GENERAL: 5,
  GENERAL_EXTRA: 5,
  EXTRA: 2
};

const MocksCount = {
  MOVIES: 15,
  COMMENTS: 5
};

const KeyCode = {
  ENTER: 13,
  ESC: 27,
  CTRL_ENTER: [`ControlLeft`, `Enter`]
};

const MoviesTitles = {
  ALL: `All movies. Upcoming`,
  MOST_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`
};

const EmojiTypes = {
  SMILE: {
    name: `emoji-smile`,
    text: `smile`
  },
  SLEEPING: {
    name: `emoji-sleeping`,
    text: `sleeping`
  },
  PUKE: {
    name: `emoji-puke`,
    text: `puke`
  },
  ANGRY: {
    name: `emoji-angry`,
    text: `angry`
  }
};

export {Mode, RenderPosition, MocksCount, MoviesCount, MoviesTitles, KeyCode, EmojiTypes};
