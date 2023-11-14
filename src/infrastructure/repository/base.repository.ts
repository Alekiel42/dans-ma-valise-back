export interface IBaseRepository<T> {
	getAll(): Promise<T[]>;
	getById(id: string): Promise<T | null>;
	create(item: T): Promise<T>;
	update(item: T): Promise<T | null>;
	delete(id: string): Promise<void>;
}
