import { IJokeRepository } from '../models/IJokeRepository';
import { Joke, CreateJokeDto, UpdateJokeDto } from '../models/Joke';
import { PairedJoke } from '../models/ExternalJoke';
import { ExternalJokeService } from './ExternalJokeService';
import { ERROR_MESSAGES } from '../constants/messages';

export class JokeService {
  constructor(
    private jokeRepository: IJokeRepository,
    private externalJokeService: ExternalJokeService
  ) {}

  async getJokeByType(type: string): Promise<string> {
    if (type === 'Chuck') {
      return this.externalJokeService.getChuckNorrisJoke();
    } else if (type === 'Dad') {
      return this.externalJokeService.getDadJoke();
    } else {
      throw new Error(ERROR_MESSAGES.JOKE.INVALID_TYPE);
    }
  }

  async getRandomJoke(): Promise<string> {
    return this.externalJokeService.getRandomJoke();
  }

  async getPairedJokes(): Promise<PairedJoke[]> {
    return this.externalJokeService.getPairedJokes(5);
  }

  async createJoke(joke: CreateJokeDto): Promise<Joke> {
    return this.jokeRepository.create(joke);
  }

  async updateJoke(id: number, joke: UpdateJokeDto): Promise<Joke> {
    const updated = await this.jokeRepository.update(id, joke);
    if (!updated) {
      throw new Error(ERROR_MESSAGES.JOKE.NOT_FOUND);
    }
    return updated;
  }

  async deleteJoke(id: number): Promise<boolean> {
    const deleted = await this.jokeRepository.delete(id);
    if (!deleted) {
      throw new Error(ERROR_MESSAGES.JOKE.NOT_FOUND);
    }
    return deleted;
  }

  async getJokeById(id: number): Promise<Joke> {
    const joke = await this.jokeRepository.findById(id);
    if (!joke) {
      throw new Error(ERROR_MESSAGES.JOKE.NOT_FOUND);
    }
    return joke;
  }

  async getAllJokes(): Promise<Joke[]> {
    return this.jokeRepository.findAll();
  }

  async getJokesByUserId(userId: number): Promise<Joke[]> {
    return this.jokeRepository.findByUserId(userId);
  }

  async getJokesByCategoryId(categoryId: number): Promise<Joke[]> {
    return this.jokeRepository.findByCategoryId(categoryId);
  }

  async getJokesByUserIdAndCategoryId(userId: number, categoryId: number): Promise<Joke[]> {
    return this.jokeRepository.findByUserIdAndCategoryId(userId, categoryId);
  }
}
