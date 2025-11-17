import { ERROR_MESSAGES } from '../constants/messages';

export class MathService {
  calculateLCM(numbers: number[]): number {
    if (numbers.length === 0) {
      throw new Error(ERROR_MESSAGES.MATH.EMPTY_ARRAY);
    }

    if (numbers.some(num => num <= 0)) {
      throw new Error(ERROR_MESSAGES.MATH.POSITIVE_REQUIRED);
    }

    return numbers.reduce((acc, num) => this.lcm(acc, num));
  }

  increment(number: number): number {
    return number + 1;
  }

  private lcm(a: number, b: number): number {
    return (a * b) / this.gcd(a, b);
  }

  private gcd(a: number, b: number): number {
    return b === 0 ? a : this.gcd(b, a % b);
  }
}
