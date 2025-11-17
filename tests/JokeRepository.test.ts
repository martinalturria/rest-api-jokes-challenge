import { Pool } from 'pg';
import { JokeRepository } from '../src/repositories/JokeRepository';
import { CreateJokeDto, UpdateJokeDto } from '../src/models/Joke';

jest.mock('pg', () => {
  const mPool = {
    query: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('JokeRepository', () => {
  let repository: JokeRepository;
  let mockPool: any;

  beforeEach(() => {
    mockPool = new Pool();
    repository = new JokeRepository(mockPool);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all jokes', async () => {
      const mockJokes = [
        { id: 1, text: 'Joke 1', user_id: 1, category_id: 1, created_at: new Date(), updated_at: new Date() },
        { id: 2, text: 'Joke 2', user_id: 2, category_id: 2, created_at: new Date(), updated_at: new Date() },
      ];
      mockPool.query.mockResolvedValue({ rows: mockJokes });

      const result = await repository.findAll();

      expect(result).toHaveLength(2);
      expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM jokes ORDER BY id');
    });
  });

  describe('findById', () => {
    it('should return a joke by id', async () => {
      const mockJoke = { id: 1, text: 'Joke 1', user_id: 1, category_id: 1, created_at: new Date(), updated_at: new Date() };
      mockPool.query.mockResolvedValue({ rows: [mockJoke] });

      const result = await repository.findById(1);

      expect(result).toEqual(expect.objectContaining({ id: 1, text: 'Joke 1' }));
      expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM jokes WHERE id = $1', [1]);
    });

    it('should return null if joke not found', async () => {
      mockPool.query.mockResolvedValue({ rows: [] });

      const result = await repository.findById(999);

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new joke', async () => {
      const createDto: CreateJokeDto = { text: 'New Joke', userId: 1, categoryId: 1 };
      const mockCreated = { id: 1, text: 'New Joke', user_id: 1, category_id: 1, created_at: new Date(), updated_at: new Date() };
      mockPool.query.mockResolvedValue({ rows: [mockCreated] });

      const result = await repository.create(createDto);

      expect(result.text).toBe('New Joke');
      expect(mockPool.query).toHaveBeenCalledWith(
        'INSERT INTO jokes (text, user_id, category_id) VALUES ($1, $2, $3) RETURNING *',
        ['New Joke', 1, 1]
      );
    });
  });

  describe('update', () => {
    it('should update a joke', async () => {
      const updateDto: UpdateJokeDto = { text: 'Updated Joke' };
      const mockUpdated = { id: 1, text: 'Updated Joke', user_id: 1, category_id: 1, created_at: new Date(), updated_at: new Date() };
      mockPool.query.mockResolvedValue({ rows: [mockUpdated] });

      const result = await repository.update(1, updateDto);

      expect(result?.text).toBe('Updated Joke');
      expect(mockPool.query).toHaveBeenCalledWith(
        'UPDATE jokes SET text = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
        ['Updated Joke', 1]
      );
    });

    it('should return null if joke not found', async () => {
      const updateDto: UpdateJokeDto = { text: 'Updated Joke' };
      mockPool.query.mockResolvedValue({ rows: [] });

      const result = await repository.update(999, updateDto);

      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a joke', async () => {
      mockPool.query.mockResolvedValue({ rowCount: 1 });

      const result = await repository.delete(1);

      expect(result).toBe(true);
      expect(mockPool.query).toHaveBeenCalledWith('DELETE FROM jokes WHERE id = $1', [1]);
    });

    it('should return false if joke not found', async () => {
      mockPool.query.mockResolvedValue({ rowCount: 0 });

      const result = await repository.delete(999);

      expect(result).toBe(false);
    });
  });

  describe('findByUserId', () => {
    it('should return jokes by user id', async () => {
      const mockJokes = [
        { id: 1, text: 'Joke 1', user_id: 1, category_id: 1, created_at: new Date(), updated_at: new Date() },
      ];
      mockPool.query.mockResolvedValue({ rows: mockJokes });

      const result = await repository.findByUserId(1);

      expect(result).toHaveLength(1);
      expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM jokes WHERE user_id = $1', [1]);
    });
  });

  describe('findByCategoryId', () => {
    it('should return jokes by category id', async () => {
      const mockJokes = [
        { id: 1, text: 'Joke 1', user_id: 1, category_id: 1, created_at: new Date(), updated_at: new Date() },
      ];
      mockPool.query.mockResolvedValue({ rows: mockJokes });

      const result = await repository.findByCategoryId(1);

      expect(result).toHaveLength(1);
      expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM jokes WHERE category_id = $1', [1]);
    });
  });

  describe('findByUserIdAndCategoryId', () => {
    it('should return jokes by user id and category id', async () => {
      const mockJokes = [
        { id: 1, text: 'Joke 1', user_id: 1, category_id: 1, created_at: new Date(), updated_at: new Date() },
      ];
      mockPool.query.mockResolvedValue({ rows: mockJokes });

      const result = await repository.findByUserIdAndCategoryId(1, 1);

      expect(result).toHaveLength(1);
      expect(mockPool.query).toHaveBeenCalledWith(
        'SELECT * FROM jokes WHERE user_id = $1 AND category_id = $2',
        [1, 1]
      );
    });
  });
});
