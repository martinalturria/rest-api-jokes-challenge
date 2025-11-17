export interface Joke {
  id: number;
  text: string;
  userId: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateJokeDto {
  text: string;
  userId: number;
  categoryId: number;
}

export interface UpdateJokeDto {
  text: string;
}
