export interface JokeResponseDto {
  joke: string;
}

export interface JokeEntityResponseDto {
  id: number;
  text: string;
  userId: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeleteJokeResponseDto {
  message: string;
}
