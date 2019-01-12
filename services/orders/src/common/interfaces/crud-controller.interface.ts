import { DeleteResult } from 'typeorm';

export interface CRUDController<C, C_DTO, U_DTO> {
  fetchAll(): Promise<C[]>;
  fetchById(id: number | string): Promise<C>;
  create(c: C_DTO): Promise<C>;
  update(id: number | string, u: U_DTO): Promise<C>;
  remove(id: number | string): Promise<DeleteResult>;
}
