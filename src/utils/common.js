import {ESC_KEYCODE, ENTER_KEYCODE} from "../consts";

/**
 * Выполнение функции по нажатию на Escape.
 * @param {evt} evt - Событие.
 * @param {function} action - Действие при True.
 */
const isEscEvent = (evt, action) => {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.preventDefault();
    action();
  }
};

/**
 * Выполнение функции по нажатию на Enter.
 * @param {evt} evt - Событие.
 * @param {function} action - Действие при True.
 */
const isEnterEvent = (evt, action) => {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
    action();
  }
};

/**
 * Сравнивает элементы массива фильмов по рейтингу.
 * @param {object} a - Текущий элемент массива.
 * @param {object} b - Следующий элемент массива.
 * @return {result}
 */
const compareRate = (a, b) => {
  return b.rate - a.rate;
};

/**
 * Сравнивает элементы массива фильмов по количеству комментариев.
 * @param {object} a - Текущий элемент массива.
 * @param {object} b - Следующий элемент массива.
 * @return {result}
 */
const compareComments = (a, b) => {
  return b.comments - a.comments;
};

/**
 * Сравнивает элементы массива фильмов по количеству комментариев.
 * @param {object} template - Текущий элемент массива.
 * @return {result}
 */
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  // респрет оператор
  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export {isEscEvent, isEnterEvent, compareRate, compareComments, createElement, updateItem};
