export interface IService<T> {
  add(entity: T): Promise<void>;
  addAll(entities: Array<T>): Promise<void>;
  getById(id: number): Promise<T>;
  getAll(): Promise<Array<T>>;
  update(entity: T): Promise<void>;
  delete(entity: T): Promise<void>;
}
