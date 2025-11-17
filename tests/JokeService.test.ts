import { JokeService } from '../src/services/JokeService';
import { IJokeRepository } from '../src/models/IJokeRepository';
import { ExternalJokeService } from '../src/services/ExternalJokeService';
import { ERROR_MESSAGES } from '../src/constants/messages';

describe('JokeService', () => {
  let jokeService: JokeService;
  let mockRepository: jest.Mocked<IJokeRepository>;
  let mockExternalService: jest.Mocked<ExternalJokeService>;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByUserId: jest.fn(),
      findByCategoryId: jest.fn(),
      findByUserIdAndCategoryId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    mockExternalService = {
      getChuckNorrisJoke: jest.fn(),
      getDadJoke: jest.fn(),
      getPairedJokes: jest.fn(),
      getRandomJoke: jest.fn(),
    } as any;

    jokeService = new JokeService(mockRepository, mockExternalService);
  });

  describe('getJokeByType', () => {
    it('should get Chuck Norris joke when type is Chuck', async () => {
      mockExternalService.getChuckNorrisJoke.mockResolvedValue('Chuck joke');

      const result = await jokeService.getJokeByType('Chuck');

      expect(result).toBe('Chuck joke');
      expect(mockExternalService.getChuckNorrisJoke).toHaveBeenCalled();
    });

    it('should get Dad joke when type is Dad', async () => {
      mockExternalService.getDadJoke.mockResolvedValue('Dad joke');

      const result = await jokeService.getJokeByType('Dad');

      expect(result).toBe('Dad joke');
      expect(mockExternalService.getDadJoke).toHaveBeenCalled();
    });

    it('should throw error for invalid type', async () => {
      await expect(jokeService.getJokeByType('Invalid')).rejects.toThrow(
        ERROR_MESSAGES.JOKE.INVALID_TYPE
      );
    });
  });

  describe('getRandomJoke', () => {
    it('should get a random joke from external service', async () => {
      mockExternalService.getRandomJoke.mockResolvedValue('Random joke');

      const result = await jokeService.getRandomJoke();

      expect(result).toBe('Random joke');
      expect(mockExternalService.getRandomJoke).toHaveBeenCalled();
    });
  });

  describe('getPairedJokes', () => {
    it('should get paired jokes', async () => {
      const mockPaired = [
        { chuck: 'Chuck 1', dad: 'Dad 1', combinado: 'Combined 1' },
      ];
      mockExternalService.getPairedJokes.mockResolvedValue(mockPaired);

      const result = await jokeService.getPairedJokes();

      expect(result).toEqual(mockPaired);
      expect(mockExternalService.getPairedJokes).toHaveBeenCalledWith(5);
    });
  });

  describe('createJoke', () => {
    it('should create a joke', async () => {
      const createDto = { text: 'New joke', userId: 1, categoryId: 1 };
      const mockJoke = {
        id: 1,
        ...createDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepository.create.mockResolvedValue(mockJoke);

      const result = await jokeService.createJoke(createDto);

      expect(result).toEqual(mockJoke);
      expect(mockRepository.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('updateJoke', () => {
    it('should update a joke', async () => {
      const updateDto = { text: 'Updated joke' };
      const mockJoke = {
        id: 1,
        text: 'Updated joke',
        userId: 1,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepository.update.mockResolvedValue(mockJoke);

      const result = await jokeService.updateJoke(1, updateDto);

      expect(result).toEqual(mockJoke);
      expect(mockRepository.update).toHaveBeenCalledWith(1, updateDto);
    });

    it('should throw error when joke not found', async () => {
      mockRepository.update.mockResolvedValue(null);

      await expect(jokeService.updateJoke(999, { text: 'Updated' })).rejects.toThrow(
        ERROR_MESSAGES.JOKE.NOT_FOUND
      );
    });
  });

  describe('deleteJoke', () => {
    it('should delete a joke', async () => {
      mockRepository.delete.mockResolvedValue(true);

      const result = await jokeService.deleteJoke(1);

      expect(result).toBe(true);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw error when joke not found', async () => {
      mockRepository.delete.mockResolvedValue(false);

      await expect(jokeService.deleteJoke(999)).rejects.toThrow(
        ERROR_MESSAGES.JOKE.NOT_FOUND
      );
    });
  });

  describe('getJokeById', () => {
    it('should get a joke by id', async () => {
      const mockJoke = {
        id: 1,
        text: 'Joke',
        userId: 1,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockRepository.findById.mockResolvedValue(mockJoke);

      const result = await jokeService.getJokeById(1);

      expect(result).toEqual(mockJoke);
    });

    it('should throw error when joke not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(jokeService.getJokeById(999)).rejects.toThrow(
        ERROR_MESSAGES.JOKE.NOT_FOUND
      );
    });
  });
});
