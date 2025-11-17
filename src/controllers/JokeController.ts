import { Request, Response, NextFunction } from 'express';
import { JokeService } from '../services/JokeService';
import { HTTP_STATUS } from '../constants/messages';

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

      res.json({ joke });
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

      res.json({ joke });
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

      res.json(pairedJokes);
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

      res.status(HTTP_STATUS.CREATED).json(joke);
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

      res.json(joke);
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

      res.status(HTTP_STATUS.OK).json({ message: 'Joke deleted successfully' });
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
