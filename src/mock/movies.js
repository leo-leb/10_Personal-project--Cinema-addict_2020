import dayjs from "dayjs";
import {nanoid} from "nanoid";
import {getRandomInteger, getRandomNumber, getRandomValue, getRandomValuesAndPerformToString, setSymbolsLimit} from "./common.js";

const DESC_VOLUME_MAX = 5;
const DESC_LENGTH_MAX = 140;
const RATE_MAX = 10;
const GENRES_MAX = 4;
const PEOPLE_MAX = 3;
const COMMENTS_MAX = 5;
const YEARS_START = 1950;
const YEARS_FINISH = 2020;
const MONTHES = 12;
const DAYS = 30;

let moviesList = [`The Witches`, `Sage of Time`, `What Killed Michael Brown?`, `Falling`, `Over the Moon`, `Borat Subsequent Moviefilm`, `The Place of No Words`];
let postersList = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];
let castsList = [`Anthony Mann`, `Anne Wigton`, `Heinz Herald`, `Lars Ranthe`, `Lene Maria Christensen`, `Lotte Andersen`, `Emma B. Marott`, `Kasper Løfvall Stensbirk`, `Leonard Terfelt`, `Bahador Foladi`, `Kristofer Kamiyasu`, `Anda Sârbei`, `Joakim Sällquist`, `Simon J. Berger`];
let genresList = [`Action`, `Adventure`, `Animation`, `Comedy`, `Crime`, `Documentary`, `Drama`, `Family`, `Fantasy`, `History`, `Horror`, `Kids`, `Music`, `Mystery`, `Sport`, `Romance`, `Sci-Fi`, `Biography`, `Thriller`, `War`, `Western`];
let descriptionTemplate = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;

const generateMovie = () => {
  let createdYear = getRandomInteger(YEARS_START, YEARS_FINISH);
  return {
    id: nanoid(),
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
    isWatchList: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

const getRightId = (source, index) => source.find((movie) => movie.id === index);

export {generateMovie, getRightId};
