export interface IService<T> {
  add(entity: T): Promise<T>;
  addAll(entities: Array<T>): Promise<void>;
  getById(id: number): Promise<T>;
  getAll(): Promise<Array<T>>;
  update(entity: T): Promise<T>;
  delete(entity: T): Promise<void>;
}
