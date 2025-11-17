import { IJokeRepository } from '../models/IJokeRepository';
import { Joke, CreateJokeDto, UpdateJokeDto } from '../models/Joke';
import { PairedJoke } from '../models/ExternalJoke';
import { JokeType, isValidJokeType } from '../models/JokeType';
import { ExternalJokeService } from './ExternalJokeService';
import { NotFoundError } from '../exceptions/NotFoundError';
import { ValidationError } from '../exceptions/ValidationError';
import { ERROR_MESSAGES } from '../constants/messages';

export class JokeService {
  constructor(
    private jokeRepository: IJokeRepository,
    private externalJokeService: ExternalJokeService
  ) {}

  async getJokeByType(type: string): Promise<string> {
    if (!isValidJokeType(type)) {
      throw new ValidationError(ERROR_MESSAGES.JOKE.INVALID_TYPE);
    }

    if (type === JokeType.CHUCK) {
      return this.externalJokeService.getChuckNorrisJoke();
    } else {
      return this.externalJokeService.getDadJoke();
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
      throw new NotFoundError(ERROR_MESSAGES.JOKE.NOT_FOUND);
    }
    return updated;
  }

  async deleteJoke(id: number): Promise<boolean> {
    const deleted = await this.jokeRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError(ERROR_MESSAGES.JOKE.NOT_FOUND);
    }
    return deleted;
  }

  async getJokeById(id: number): Promise<Joke> {
    const joke = await this.jokeRepository.findById(id);
    if (!joke) {
      throw new NotFoundError(ERROR_MESSAGES.JOKE.NOT_FOUND);
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
