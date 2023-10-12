import { User } from '../../domain/user/user.interface';
import { ProvideSingleton } from '../util/provideSingleton';

export type UserCreationParams = Pick<User, 'email' | 'name' | 'role'>;

@ProvideSingleton(UsersService)
export class UsersService {
	constructor() {}

	public get(id: number, name?: string): User {
		return {
			id,
			email: 'sherlock@holmes',
			name: name ?? 'Sherlock Holmes',
			role: 'Traveler',
		};
	}

	//fake creation to test app
	public create(userCreationParams: UserCreationParams): User {
		return {
			id: Math.floor(Math.random() * 10000), // Random
			...userCreationParams,
		};
	}
}
