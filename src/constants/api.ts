export const EXTERNAL_APIS = {
  CHUCK_NORRIS: process.env.CHUCK_NORRIS_API || 'https://api.chucknorris.io/jokes/random',
  DAD_JOKE: process.env.DAD_JOKE_API || 'https://icanhazdadjoke.com',
};

export const API_CONFIG = {
  TIMEOUT: 5000,
  RETRY_ATTEMPTS: 3,
};
