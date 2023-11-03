import { UserInformationParams, UsersService } from '../handleUsers.service';
import mongoose from 'mongoose';
import initializeTestDatabase from '../../../../tests-config/setup-database/initializeDatabase';

describe('[SERVICE] UsersService', () => {
	const usersService = new UsersService();

	beforeAll(async () => {
		await initializeTestDatabase();
	});

	afterAll(async () => {
		await mongoose.connection.db.dropDatabase();
		await mongoose.disconnect();
	});

	it('should return a list of users', async () => {
		const usersListExpected = [
			{ name: 'Sherlock Holmes', _id: '6545101ec84f33cdcf3b9341' },
			{ name: 'Sheldon Cooper', _id: '6545101ec84f33cdcf3b9342' },
			{ name: 'Loki', _id: '654510b5e93751c8713948f4' },
		];

		const usersListActual = await usersService.getUsers();

		expect(usersListActual.length).toBe(usersListExpected.length);

		usersListActual.forEach((actualUser, index) => {
			const expectedUser = usersListExpected[index];
			expect(actualUser.name).toBe(expectedUser.name);
			expect(actualUser._id.toString()).toBe(expectedUser._id);
		});
	});

	it('should return a user found by id', async () => {
		const userExpected = {
			name: 'Sherlock Holmes',
			email: 'sherlock@bakerstreet.uk',
			role: 'Admin',
			_id: '6545101ec84f33cdcf3b9341',
		};

		const userActual = await usersService.getUserById(
			'6545101ec84f33cdcf3b9341',
		);

		expect(userActual.name).toEqual(userExpected.name);
		expect(userActual.email).toEqual(userExpected.email);
		expect(userActual.role).toEqual(userExpected.role);
		expect(userActual._id.toString()).toEqual(userExpected._id);
	});

	it('should delete a user', async () => {
		const usersListBeforeDeletion = await usersService.getUsers();
		await usersService.deleteUserById('6545101ec84f33cdcf3b9341');
		const newUsersListActual = await usersService.getUsers();

		const listLengthExpected = usersListBeforeDeletion.length - 1;

		expect(newUsersListActual.length).toEqual(listLengthExpected);
	});

	it('should create a new user', async () => {
		const body = {
			email: 'alexandra@greatdev.fr',
			name: 'Alex',
			role: 'Traveler',
		} as UserInformationParams; //TODO

		const userCreatedExpected = {
			name: 'Alex',
			email: 'alexandra@greatdev.fr',
			role: 'Traveler',
		};

		const userCreatedActual = await usersService.create(body);

		expect(userCreatedExpected.name).toEqual(userCreatedActual.name);
		expect(userCreatedExpected.email).toEqual(userCreatedActual.email);
		expect(userCreatedExpected.role).toEqual(userCreatedActual.role);
	});

	it('should update an existing user', async () => {
		const body = {
			role: 'Admin',
		} as UserInformationParams; //TODO

		const userIdToUpdate = '6545101ec84f33cdcf3b9342';

		const userUpdatedExpected = {
			name: 'Sheldon Cooper',
			email: 'sheldon@pasadena.com',
			role: 'Admin',
		};

		const userUpdatedActual = await usersService.update(body, userIdToUpdate);

		expect(userUpdatedExpected.name).toEqual(userUpdatedActual.name);
		expect(userUpdatedExpected.role).toEqual(userUpdatedActual.role);
	});
});
