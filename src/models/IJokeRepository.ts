import { Joke, CreateJokeDto, UpdateJokeDto } from './Joke';

export interface IJokeRepository {
  findAll(): Promise<Joke[]>;
  findById(id: number): Promise<Joke | null>;
  findByUserId(userId: number): Promise<Joke[]>;
  findByCategoryId(categoryId: number): Promise<Joke[]>;
  findByUserIdAndCategoryId(userId: number, categoryId: number): Promise<Joke[]>;
  create(joke: CreateJokeDto): Promise<Joke>;
  update(id: number, joke: UpdateJokeDto): Promise<Joke | null>;
  delete(id: number): Promise<boolean>;
}
