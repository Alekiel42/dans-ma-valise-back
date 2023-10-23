import {
	Body,
	Controller,
	Get,
	Path,
	Post,
	Route,
	SuccessResponse,
	Response,
	Example,
	Delete,
	Put,
} from 'tsoa';
import { inject } from 'inversify';
import { User, UserSummary } from '../../domain/user/user.interface';
import {
	UserInformationParams,
	UsersService,
} from '../services/handleUsers.service';
import { ProvideSingleton } from '../util/provideSingleton';

interface ResponseUserContent {
	content: User;
}

interface ResponseAllUsersContent {
	content: UserSummary[];
}

@Route('/dans-ma-valise/api/v1/users')
@ProvideSingleton(UsersController)
export class UsersController extends Controller {
	constructor(
		@inject(UsersService) private readonly usersService: UsersService,
	) {
		super();
	}

	/**
	 *  List of users with basic information
	 * @summary Get all users
	 * @returns {UserSummary[]} Success : return user's details
	 * */
	@Example({
		content: [
			{
				_id: 'b45654b7845',
				name: 'Sherlock Holmes',
			},
			{
				_id: 'b45654b7845',
				name: 'Cher Watson',
			},
		],
	})
	@Get('')
	@SuccessResponse('200', 'All users are found')
	public async getAllUsers(): Promise<ResponseAllUsersContent> {
		const users = await this.usersService.getUsers();
		return {
			content: users,
		};
	}

	/**
	 * Retrieve the details of an existing user from id
	 * @summary Get user
	 * @param userId The user's identifier
	 * @returns {ResponseUserContent} Success : return user's details
	 * */
	@Example<ResponseUserContent>({
		content: {
			_id: 'b45654b7845',
			email: 'sherlock@bakerstreet.uk',
			name: 'Sherlock Holmes',
			role: 'Admin',
		},
	})
	@Get('{userId}')
	@SuccessResponse('200', 'User found')
	@Response('404', 'User is not found')
	public async getUser(@Path() userId: string): Promise<ResponseUserContent> {
		const user = await this.usersService.getUserById(userId);
		return {
			content: user,
		};
	}

	/**
	 * Create a new user
	 * @summary Create user
	 * @param {UserInformationParams} requestBody - The user information to create (required)
	 * @returns {Promise<ResponseUserContent>} Success : return user created details
	 * */
	@SuccessResponse('201', 'Created')
	@Post()
	public async createUser(
		@Body() requestBody: UserInformationParams,
	): Promise<ResponseUserContent> {
		this.setStatus(201);
		const userCreated = await this.usersService.create(requestBody);
		return {
			content: userCreated,
		};
	}

	/**
	 * Delete a user
	 * @summary Delete user based on their ID
	 * @param userId The user's identifier
	 * @returns {void} Success : The user has been successfully deleted
	 * */
	@SuccessResponse('204', 'No Content: The user has been successfully deleted')
	@Delete('{userId}')
	public async deleteUser(@Path() userId: string): Promise<void> {
		await this.usersService.deleteUserById(userId);
		this.setStatus(204);
		return;
	}

	/**
	 * Update an existing user found by id
	 * @summary Update user
	 * @param {UserInformationParams} requestBody
	 * @param userId The user's identifier
	 * @returns {Promise<ResponseUserContent>} Success : return user updated details
	 * */
	@SuccessResponse('200', 'User was successfully updated')
	@Response('404', 'User is not found')
	@Put('{userId}')
	public async updateUser(
		@Body() requestBody: UserInformationParams,
		@Path() userId: string,
	): Promise<ResponseUserContent> {
		this.setStatus(200);
		const userUpdated = await this.usersService.update(requestBody, userId);
		return {
			content: userUpdated,
		};
	}
}
