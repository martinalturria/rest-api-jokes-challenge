import { Pool } from 'pg';
import { IJokeRepository } from '../models/IJokeRepository';
import { Joke, CreateJokeDto, UpdateJokeDto } from '../models/Joke';

export class JokeRepository implements IJokeRepository {
  constructor(private pool: Pool) {}

  async findAll(): Promise<Joke[]> {
    const result = await this.pool.query('SELECT * FROM jokes ORDER BY id');
    return result.rows.map(this.mapToJoke);
  }

  async findById(id: number): Promise<Joke | null> {
    const result = await this.pool.query('SELECT * FROM jokes WHERE id = $1', [id]);
    return result.rows.length > 0 ? this.mapToJoke(result.rows[0]) : null;
  }

  async findByUserId(userId: number): Promise<Joke[]> {
    const result = await this.pool.query('SELECT * FROM jokes WHERE user_id = $1', [userId]);
    return result.rows.map(this.mapToJoke);
  }

  async findByCategoryId(categoryId: number): Promise<Joke[]> {
    const result = await this.pool.query('SELECT * FROM jokes WHERE category_id = $1', [categoryId]);
    return result.rows.map(this.mapToJoke);
  }

  async findByUserIdAndCategoryId(userId: number, categoryId: number): Promise<Joke[]> {
    const result = await this.pool.query(
      'SELECT * FROM jokes WHERE user_id = $1 AND category_id = $2',
      [userId, categoryId]
    );
    return result.rows.map(this.mapToJoke);
  }

  async create(joke: CreateJokeDto): Promise<Joke> {
    const result = await this.pool.query(
      'INSERT INTO jokes (text, user_id, category_id) VALUES ($1, $2, $3) RETURNING *',
      [joke.text, joke.userId, joke.categoryId]
    );
    return this.mapToJoke(result.rows[0]);
  }

  async update(id: number, joke: UpdateJokeDto): Promise<Joke | null> {
    const result = await this.pool.query(
      'UPDATE jokes SET text = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [joke.text, id]
    );
    return result.rows.length > 0 ? this.mapToJoke(result.rows[0]) : null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.pool.query('DELETE FROM jokes WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }

  private mapToJoke(row: any): Joke {
    return {
      id: row.id,
      text: row.text,
      userId: row.user_id,
      categoryId: row.category_id,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
