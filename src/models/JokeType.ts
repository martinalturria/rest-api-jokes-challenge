export enum JokeType {
  CHUCK = 'Chuck',
  DAD = 'Dad',
}

export const isValidJokeType = (type: string): type is JokeType => {
  return Object.values(JokeType).includes(type as JokeType);
};
