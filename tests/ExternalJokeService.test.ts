import axios from 'axios';
import { ExternalJokeService } from '../src/services/ExternalJokeService';
import { ERROR_MESSAGES } from '../src/constants/messages';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ExternalJokeService', () => {
  let service: ExternalJokeService;

  beforeEach(() => {
    service = new ExternalJokeService();
    jest.clearAllMocks();
  });

  describe('getChuckNorrisJoke', () => {
    it('should fetch a Chuck Norris joke', async () => {
      const mockResponse = {
        data: { value: 'Chuck Norris can divide by zero.' }
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await service.getChuckNorrisJoke();

      expect(result).toBe('Chuck Norris can divide by zero.');
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('chucknorris.io'),
        expect.any(Object)
      );
    });

    it('should throw error when API fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(service.getChuckNorrisJoke()).rejects.toThrow(ERROR_MESSAGES.EXTERNAL_API.CHUCK_NORRIS_ERROR);
    });
  });

  describe('getDadJoke', () => {
    it('should fetch a Dad joke', async () => {
      const mockResponse = {
        data: { joke: 'Why did the chicken cross the road?' }
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await service.getDadJoke();

      expect(result).toBe('Why did the chicken cross the road?');
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('icanhazdadjoke'),
        expect.objectContaining({
          headers: { Accept: 'application/json' }
        })
      );
    });

    it('should throw error when API fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(service.getDadJoke()).rejects.toThrow(ERROR_MESSAGES.EXTERNAL_API.DAD_JOKE_ERROR);
    });
  });

  describe('getPairedJokes', () => {
    it('should fetch and pair jokes from both APIs', async () => {
      mockedAxios.get.mockImplementation((url: string) => {
        if (url.includes('chucknorris')) {
          return Promise.resolve({ data: { value: 'Chuck Norris joke.' } });
        } else {
          return Promise.resolve({ data: { joke: 'Dad joke?' } });
        }
      });

      const result = await service.getPairedJokes(2);

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('chuck');
      expect(result[0]).toHaveProperty('dad');
      expect(result[0]).toHaveProperty('combinado');
      expect(mockedAxios.get).toHaveBeenCalledTimes(4);
    });

    it('should combine jokes creatively', async () => {
      mockedAxios.get
        .mockResolvedValueOnce({ data: { value: 'Chuck Norris counted to infinity.' } })
        .mockResolvedValueOnce({ data: { joke: 'Why did the math book look sad?' } });

      const result = await service.getPairedJokes(1);

      expect(result[0].combinado).toContain('Chuck Norris');
      expect(result[0].combinado.length).toBeGreaterThan(0);
    });
  });

  describe('getRandomJoke', () => {
    it('should randomly return either Chuck or Dad joke', async () => {
      mockedAxios.get.mockImplementation((url: string) => {
        if (url.includes('chucknorris')) {
          return Promise.resolve({ data: { value: 'Chuck joke' } });
        } else {
          return Promise.resolve({ data: { joke: 'Dad joke' } });
        }
      });

      const result = await service.getRandomJoke();

      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
