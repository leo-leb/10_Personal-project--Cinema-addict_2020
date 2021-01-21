import dayjs from "dayjs";
import {nanoid} from "nanoid";
import {getRandomNumber, getRandomValue} from "./common.js";

const YEAR = 2020;
const MONTHES = 12;
const DAYS = 30;
const HOURS = 24;
const MINUTES = 60;

let authorsList = [`Вася`, `Петя`, `Игорь`, `Маша`, `Аня`];
let emotionsList = [`smile`, `sleeping`, `puke`, `angry`];
let messagesList = [`Рекомендую к просмотру`, `На один раз`, `Для просмотра с семьей`, `Потрясное кино`, `Мне понравилось`];

const generateRandomComment = (array) => {
  const comment = {
    id: nanoid(),
    author: getRandomValue(authorsList),
    date: dayjs().set(`year`, YEAR).set(`month`, getRandomNumber(MONTHES)).set(`day`, getRandomNumber(DAYS)).set(`hours`, getRandomNumber(HOURS)).set(`minutes`, getRandomNumber(MINUTES)).format(`YYYY-MM-DD HH:mm:ss`),
    emotion: getRandomValue(emotionsList),
    message: getRandomValue(messagesList)
  };
  array.push(comment);
};

const generateComments = (volume) => {
  let array = [];
  for (let i = 0; i < volume; i++) {
    generateRandomComment(array);
  }
  return array;
};

export {generateComments};
