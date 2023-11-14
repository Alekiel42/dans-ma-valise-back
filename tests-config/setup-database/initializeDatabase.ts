import mongoose from 'mongoose';
import UserModel from '../../src/infrastructure/repository/database/models/user.model';
import userData from './datasets/users.json';

export default async function initializeTestDatabase() {
	if (!process.env.MONGO_URI) {
		throw new Error('MONGO_URI is not defined in test environment variables.');
	}
	await mongoose.connect(process.env.MONGO_URI);

	await UserModel.insertMany(userData);
}
