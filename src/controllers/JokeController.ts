import { Request, Response, NextFunction } from 'express';
import { JokeService } from '../services/JokeService';
import { ApiResponse } from '../models/ApiResponse';
import { JokeResponseDto, JokeEntityResponseDto, DeleteJokeResponseDto } from '../dtos/JokeResponseDto';
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../constants/messages';

export class JokeController {
  constructor(private jokeService: JokeService) {}

  getJokeByType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { type } = req.params;
      const joke = await this.jokeService.getJokeByType(type);

      const response: JokeResponseDto = { joke };
      res.json(ApiResponse.success(response));
    } catch (error) {
      next(error);
    }
  };

  getRandomJoke = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const joke = await this.jokeService.getRandomJoke();

      const response: JokeResponseDto = { joke };
      res.json(ApiResponse.success(response));
    } catch (error) {
      next(error);
    }
  };

  getPairedJokes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const pairedJokes = await this.jokeService.getPairedJokes();

      res.json(ApiResponse.success(pairedJokes));
    } catch (error) {
      next(error);
    }
  };

  createJoke = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { text, userId, categoryId } = req.body;
      const joke = await this.jokeService.createJoke({ text, userId, categoryId });

      const response: JokeEntityResponseDto = {
        id: joke.id,
        text: joke.text,
        userId: joke.userId,
        categoryId: joke.categoryId,
        createdAt: joke.createdAt,
        updatedAt: joke.updatedAt,
      };

      res.status(HTTP_STATUS.CREATED).json(ApiResponse.success(response));
    } catch (error) {
      next(error);
    }
  };

  updateJoke = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.number);
      const { text } = req.body;
      const joke = await this.jokeService.updateJoke(id, { text });

      const response: JokeEntityResponseDto = {
        id: joke.id,
        text: joke.text,
        userId: joke.userId,
        categoryId: joke.categoryId,
        createdAt: joke.createdAt,
        updatedAt: joke.updatedAt,
      };

      res.json(ApiResponse.success(response));
    } catch (error) {
      next(error);
    }
  };

  deleteJoke = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.number);
      await this.jokeService.deleteJoke(id);

      const response: DeleteJokeResponseDto = {
        message: SUCCESS_MESSAGES.JOKE.DELETED
      };

      res.status(HTTP_STATUS.OK).json(ApiResponse.success(response));
    } catch (error) {
      next(error);
    }
  };

  getJokeById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const joke = await this.jokeService.getJokeById(id);

      res.json(joke);
    } catch (error) {
      next(error);
    }
  };

  getAllJokes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const jokes = await this.jokeService.getAllJokes();

      res.json(jokes);
    } catch (error) {
      next(error);
    }
  };
}
