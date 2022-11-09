// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomWords = require('random-words');

export const getRandomText = (wordCount: number): string => {
  return randomWords({ exactly: wordCount, join: ' ' });
};
