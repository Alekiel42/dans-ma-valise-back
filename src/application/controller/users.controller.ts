import {
	Body,
	Controller,
	Get,
	Path,
	Post,
	Query,
	Route,
	SuccessResponse,
	Example,
} from 'tsoa';
import { inject } from 'inversify';
import { User } from '../../domain/user/user.interface';
import {
	UserCreationParams,
	UsersService,
} from '../services/handleUsers.service';
import { ProvideSingleton } from '../util/provideSingleton';

interface ResponseContent {
	content: User;
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
	 * Retrieve the details of an existing user
	 * @summary GetUser : get user's details from id
	 * @param userId The user's identifier
	 * @param name Provide a username to display
	 * @returns {User} Success : return user's details
	 * */
	@Example<ResponseContent>({
		content: {
			id: 42,
			email: 'sherlock@bakerstreet.uk',
			name: 'Sherlock Holmes',
			role: 'Admin',
		},
	})
	@Get('{userId}')
	public async getUser(
		@Path() userId: number,
		@Query() name?: string,
	): Promise<ResponseContent> {
		return {
			content: this.usersService.get(userId, name),
		};
	}

	/**
	 * Create a new user
	 * @summary CreateUser : create a new user
	 * @param {UserCreationParams} requestBody
	 * @returns {Promise<void>} Success : no data is return
	 * */
	@SuccessResponse('201', 'Created')
	@Post()
	public async createUser(
		@Body() requestBody: UserCreationParams,
	): Promise<void> {
		this.setStatus(201);
		this.usersService.create(requestBody);
		return;
	}
}
