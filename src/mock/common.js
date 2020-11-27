const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomNumber = (from) => {
  return Math.floor(Math.random() * from);
};

const getRandomValue = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const getRandomValuesAndPerformToString = (array, limit, separator) => {
  const volume = getRandomInteger(1, limit);
  const values = () => {
    let result = ``;
    for (let i = 1; i <= volume; i++) {
      if (i !== volume) {
        result = result + getRandomValue(array) + separator + ` `;
      } else {
        result = result + getRandomValue(array);
      }
    }
    return result;
  };
  return values();
};

const setSymbolsLimit = (paragraph, limit) => {
  const currentLimit = limit - 1;
  let currentArray = paragraph.split(``);
  if (currentArray[currentLimit]) {
    currentArray.splice(currentLimit, currentArray.length - limit);
    currentArray.push(`...`);
  }
  return currentArray.join(``);
};

export {getRandomInteger, getRandomNumber, getRandomValue, getRandomValuesAndPerformToString, setSymbolsLimit};
