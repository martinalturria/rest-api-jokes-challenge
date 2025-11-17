import { Request, Response, NextFunction } from 'express';
import { MathService } from '../services/MathService';

export class MathController {
  constructor(private mathService: MathService) {}

  calculateLCM = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { numbers } = req.query;
      const numArray = (numbers as string).split(',').map(n => parseInt(n.trim()));

      const lcm = this.mathService.calculateLCM(numArray);

      res.json({
        numbers: numArray,
        lcm,
      });
    } catch (error) {
      next(error);
    }
  };

  increment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { number } = req.query;
      const num = parseInt(number as string);

      const result = this.mathService.increment(num);

      res.json({
        original: num,
        result,
      });
    } catch (error) {
      next(error);
    }
  };
}
