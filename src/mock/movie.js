import dayjs from "dayjs";
import {getRandomInteger, getRandomNumber, getRandomValue, getRandomValuesAndPerformToString, setSymbolsLimit} from "./common.js";

const YEAR = 2020;
const MONTHES = 12;
const DAYS = 30;
const HOURS = 24;
const MINUTES = 60;

const DESC_VOLUME_MAX = 5;
const DESC_LENGTH_MAX = 140;
const RATE_MAX = 10;
const GENRES_MAX = 4;
const PEOPLE_MAX = 3;
const COMMENTS_MAX = 5;
const YEARS_START = 1950;
const YEARS_FINISH = 2020;

const moviesList = [`The Witches`, `Sage of Time`, `What Killed Michael Brown?`, `Falling`, `Over the Moon`, `Borat Subsequent Moviefilm`, `The Place of No Words`];
const postersList = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];

const castsList = [`Anthony Mann`, `Anne Wigton`, `Heinz Herald`, `Lars Ranthe`, `Lene Maria Christensen`, `Lotte Andersen`, `Emma B. Marott`, `Kasper Løfvall Stensbirk`, `Leonard Terfelt`, `Bahador Foladi`, `Kristofer Kamiyasu`, `Anda Sârbei`, `Joakim Sällquist`, `Simon J. Berger`];

const genresList = [`Action`, `Adventure`, `Animation`, `Comedy`, `Crime`, `Documentary`, `Drama`, `Family`, `Fantasy`, `History`, `Horror`, `Kids`, `Music`, `Mystery`, `Sport`, `Romance`, `Sci-Fi`, `Biography`, `Thriller`, `War`, `Western`];
const descriptionTemplate = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;

const authorsList = [`Вася`, `Петя`, `Игорь`, `Маша`, `Аня`];
const emotionsList = [`smile`, `sleeping`, `puke`, `angry`];
const messagesList = [`Рекомендую к просмотру`, `На один раз`, `Для просмотра с семьей`, `Потрясное кино`, `Мне понравилось`];

const generateComment = () => {
  return {
    author: getRandomValue(authorsList),
    date: dayjs().set(`year`, YEAR).set(`month`, getRandomNumber(MONTHES)).set(`day`, getRandomNumber(DAYS)).set(`hours`, getRandomNumber(HOURS)).set(`minutes`, getRandomNumber(MINUTES)).format(`YYYY-MM-DD HH:mm:ss`),
    emotion: getRandomValue(emotionsList),
    message: getRandomValue(messagesList)
  };
};

const generateMovie = (index) => {
  let createdYear = getRandomInteger(YEARS_START, YEARS_FINISH);
  return {
    id: index,
    name: getRandomValue(moviesList),
    poster: `./images/posters/${getRandomValue(postersList)}`,
    descriptionShort: setSymbolsLimit(getRandomValuesAndPerformToString(descriptionTemplate.split(`. `), DESC_VOLUME_MAX, `.`) + `.`, DESC_LENGTH_MAX),
    descriptionFull: getRandomValuesAndPerformToString(descriptionTemplate.split(`. `), DESC_VOLUME_MAX, `.`) + `.`,
    comments: getRandomNumber(COMMENTS_MAX).toString(),
    rate: (Math.random() * RATE_MAX).toFixed(1),
    year: createdYear.toString(),
    release: dayjs().set(`day`, getRandomNumber(DAYS)).set(`month`, getRandomNumber(MONTHES)).set(`year`, createdYear).format(`DD MMMM YYYY`),
    duration: `${getRandomInteger(0, 3)}h ${getRandomInteger(0, 60)}m`,
    genre: getRandomValuesAndPerformToString(genresList, GENRES_MAX, `,`),
    director: getRandomValue(castsList),
    writers: getRandomValuesAndPerformToString(castsList, PEOPLE_MAX, `,`),
    actors: getRandomValuesAndPerformToString(castsList, PEOPLE_MAX, `,`),
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};

export {generateComment, generateMovie};
