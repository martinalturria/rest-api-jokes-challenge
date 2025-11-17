import axios from 'axios';
import { ChuckNorrisJoke, DadJoke, PairedJoke } from '../models/ExternalJoke';
import { ExternalApiError } from '../exceptions/ExternalApiError';
import { EXTERNAL_APIS, API_CONFIG } from '../constants/api';
import { ERROR_MESSAGES } from '../constants/messages';

export class ExternalJokeService {
  async getChuckNorrisJoke(): Promise<string> {
    try {
      const response = await axios.get<ChuckNorrisJoke>(EXTERNAL_APIS.CHUCK_NORRIS, {
        timeout: API_CONFIG.TIMEOUT,
      });
      return response.data.value;
    } catch (error) {
      throw new ExternalApiError(ERROR_MESSAGES.EXTERNAL_API.CHUCK_NORRIS_ERROR);
    }
  }

  async getDadJoke(): Promise<string> {
    try {
      const response = await axios.get<DadJoke>(EXTERNAL_APIS.DAD_JOKE, {
        headers: { Accept: 'application/json' },
        timeout: API_CONFIG.TIMEOUT,
      });
      return response.data.joke;
    } catch (error) {
      throw new ExternalApiError(ERROR_MESSAGES.EXTERNAL_API.DAD_JOKE_ERROR);
    }
  }

  async getPairedJokes(count: number = 5): Promise<PairedJoke[]> {
    const chuckPromises = Array(count).fill(null).map(() => this.getChuckNorrisJoke());
    const dadPromises = Array(count).fill(null).map(() => this.getDadJoke());

    const [chuckJokes, dadJokes] = await Promise.all([
      Promise.all(chuckPromises),
      Promise.all(dadPromises),
    ]);

    return chuckJokes.map((chuck, index) => ({
      chuck,
      dad: dadJokes[index],
      combinado: this.combineJokes(chuck, dadJokes[index]),
    }));
  }

  async getRandomJoke(): Promise<string> {
    const random = Math.random();
    return random > 0.5 ? this.getChuckNorrisJoke() : this.getDadJoke();
  }

  private combineJokes(chuck: string, dad: string): string {
    const chuckPart = chuck.split('.')[0];
    const dadPart = dad.split('?')[0];
    return `${chuckPart}. Also, ${dadPart.toLowerCase()}.`;
  }
}
