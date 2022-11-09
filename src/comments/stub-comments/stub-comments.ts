import { getRandomText } from '../../common/utils/random-text.utils';

export const getRandomComments = (count: number) => {
  const comments = [];
  const arr = [...Array(count).keys()];
  arr.forEach(() => {
    comments.push({ body: getRandomText(10) });
  });
  return comments;
};
