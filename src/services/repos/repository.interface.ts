export interface IRepository<T> {
  getById(id: number): Promise<T>;
  getAll(): Promise<Array<T>>;
  add(entity: T): Promise<void>;
  addAll(entities: Array<T>): Promise<void>;
  delete(entity: T): Promise<void>;
}
