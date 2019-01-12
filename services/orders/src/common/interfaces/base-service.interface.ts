import { DeleteResult } from 'typeorm';

export interface BaseService<T, C, U> {
  findAll(): Promise<T[]>;
  findById(id: number | string): Promise<T>;
  create(c: C): Promise<T>;
  updateById(id: number | string, u: U): Promise<T>;
  removeById(id: number | string): Promise<DeleteResult>;
}
