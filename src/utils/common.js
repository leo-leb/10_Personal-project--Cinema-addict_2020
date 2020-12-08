const ESC_KEYCODE = 27;
const ENTER_KEYCODE = 13;

const isEscEvent = (evt, action) => {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.preventDefault();
    action();
  }
};

const isEnterEvent = (evt, action) => {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    action();
  }
};

const compareRate = (a, b) => {
  return b.rate - a.rate;
};

const compareComments = (a, b) => {
  return b.comments - a.comments;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export {isEscEvent, isEnterEvent, compareRate, compareComments, createElement};
