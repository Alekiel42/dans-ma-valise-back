import { User, UserSummary } from '../../domain/user/user.interface';
import { ProvideSingleton } from '../util/provideSingleton';
import HttpError from '../middleware/httpError';
import { inject } from 'inversify';
import { UserRepositoryImpl } from '../../infrastructure/repository/user.repository';

//TODO type is domain here ? verify
export type UserInformationParams = Partial<
	Pick<User, 'email' | 'name' | 'role'>
>;

export type UserCreationParams = Pick<User, 'email' | 'name' | 'role'>;

@ProvideSingleton(UsersService)
export class UsersService {
	constructor(
		@inject(UserRepositoryImpl)
		private readonly userRepository: UserRepositoryImpl,
	) {}

	public async getUsers(): Promise<UserSummary[]> {
		const users = await this.userRepository.getAll();
		//TODO only token admin can see list
		return users.map(({ name, _id }) => ({ name, _id }));
	}

	public async getUserById(id: string): Promise<User> {
		const user = await this.userRepository.getById(id);
		if (!user) {
			throw HttpError.notFound(
				`User is not found.`,
				`UserId not found : ${id}`,
			);
		}
		return user;
	}

	public async deleteUserById(id: string): Promise<void> {
		return this.userRepository.delete(id);
	}

	public async create(
		userCreationParams: UserInformationParams,
	): Promise<User> {
		return await this.userRepository.create(userCreationParams);
	}

	public async update(
		userInformationParams: UserInformationParams,
		id: string,
	): Promise<User> {
		const userToUpdate = await this.userRepository.getById(id);

		if (!userToUpdate) {
			throw HttpError.notFound(
				`User is not found.`,
				`UserId not found : ${id}`,
			);
		}

		//TODO if token != admin et token != userid => unautho

		Object.assign(userToUpdate, userInformationParams);

		return await this.userRepository.update(userToUpdate);
	}
}
