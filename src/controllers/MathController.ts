import { Request, Response, NextFunction } from 'express';
import { MathService } from '../services/MathService';
import { ApiResponse } from '../models/ApiResponse';
import { LcmResponseDto, IncrementResponseDto } from '../dtos/MathResponseDto';

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

      const response: LcmResponseDto = {
        numbers: numArray,
        lcm,
      };

      res.json(ApiResponse.success(response));
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

      const response: IncrementResponseDto = {
        original: num,
        result,
      };

      res.json(ApiResponse.success(response));
    } catch (error) {
      next(error);
    }
  };
}
