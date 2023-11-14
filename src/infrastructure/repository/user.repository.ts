import { User } from '../../domain/user/user.interface';
import UserModel from './database/models/user.model';
import { ProvideSingleton } from '../../application/util/provideSingleton';
import { IBaseRepository } from './base.repository';
import { UserInformationParams } from '../../application/services/handleUsers.service';

@ProvideSingleton(UserRepositoryImpl)
export class UserRepositoryImpl implements IBaseRepository<User> {
	constructor(private userModel: typeof UserModel) {}

	async getAll(): Promise<User[]> {
		const users = await this.userModel.find();
		return users;
	}

	async getById(id: string): Promise<User | null> {
		const user = await UserModel.findById(id);
		return user;
	}

	async create(userInformation: UserInformationParams): Promise<User> {
		const user = new UserModel(userInformation);
		return await user.save();
	}

	async update(user: User): Promise<User> {
		const userToUpdate = new UserModel(user);
		return await userToUpdate.save();
	}

	async delete(id: string): Promise<void> {
		await UserModel.deleteOne({ _id: id });
		return;
	}
}
