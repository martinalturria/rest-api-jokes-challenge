import { MathService } from '../src/services/MathService';

describe('MathService', () => {
  let mathService: MathService;

  beforeEach(() => {
    mathService = new MathService();
  });

  describe('calculateLCM', () => {
    it('should calculate LCM of two numbers', () => {
      const result = mathService.calculateLCM([12, 18]);
      expect(result).toBe(36);
    });

    it('should calculate LCM of multiple numbers', () => {
      const result = mathService.calculateLCM([12, 18, 24]);
      expect(result).toBe(72);
    });

    it('should calculate LCM with one number', () => {
      const result = mathService.calculateLCM([5]);
      expect(result).toBe(5);
    });

    it('should calculate LCM when one number is 1', () => {
      const result = mathService.calculateLCM([1, 5, 10]);
      expect(result).toBe(10);
    });

    it('should calculate LCM of prime numbers', () => {
      const result = mathService.calculateLCM([3, 5, 7]);
      expect(result).toBe(105);
    });

    it('should throw error for empty array', () => {
      expect(() => mathService.calculateLCM([])).toThrow('At least one number is required');
    });

    it('should throw error for negative numbers', () => {
      expect(() => mathService.calculateLCM([-5, 10])).toThrow('All numbers must be positive');
    });

    it('should throw error for zero', () => {
      expect(() => mathService.calculateLCM([0, 10])).toThrow('All numbers must be positive');
    });
  });

  describe('increment', () => {
    it('should increment a positive number', () => {
      const result = mathService.increment(5);
      expect(result).toBe(6);
    });

    it('should increment zero', () => {
      const result = mathService.increment(0);
      expect(result).toBe(1);
    });

    it('should increment a negative number', () => {
      const result = mathService.increment(-5);
      expect(result).toBe(-4);
    });

    it('should increment a large number', () => {
      const result = mathService.increment(999999);
      expect(result).toBe(1000000);
    });
  });
});
