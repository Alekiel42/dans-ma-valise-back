import { User, UserSummary } from '../../domain/user/user.interface';
import { ProvideSingleton } from '../util/provideSingleton';
import UserModel from '../database/models/user.model';
import HttpError from '../middleware/httpError';

//TODO type is domain here ? verify
export type UserInformationParams = Partial<
	Pick<User, 'email' | 'name' | 'role'>
>;

@ProvideSingleton(UsersService)
export class UsersService {
	constructor() {}

	public async getUsers(): Promise<UserSummary[]> {
		const users = await UserModel.find();
		//TODO only token admin can see list
		return users.map(({ name, _id }) => ({ name, _id }));
	}

	public async getUserById(id: string): Promise<User> {
		const user = await UserModel.findById(id);
		if (!user) {
			throw HttpError.notFound(
				`User is not found.`,
				`UserId not found : ${id}`,
			);
		}
		return user;
	}

	public async deleteUserById(id: string): Promise<void> {
		await UserModel.deleteOne({ _id: id });
		return;
	}

	public async create(
		userCreationParams: UserInformationParams,
	): Promise<User> {
		const user = new UserModel(userCreationParams);
		return await user.save();
	}

	public async update(
		userInformationParams: UserInformationParams,
		id: string,
	): Promise<User> {
		const userToUpdate = await UserModel.findById(id);
		if (!userToUpdate) {
			throw HttpError.notFound(
				`User is not found.`,
				`UserId not found : ${id}`,
			);
		}

		//TODO if token != admin et token != userid => unautho

		Object.assign(userToUpdate, userInformationParams);

		const userUpdated = await userToUpdate.save();
		return userUpdated;
	}
}
