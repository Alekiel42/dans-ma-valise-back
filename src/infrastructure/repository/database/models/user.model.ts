import mongoose from 'mongoose';
import { User } from '../../../../domain/user/user.interface';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	role: { type: String, enum: ['Admin', 'Traveler'], required: true },
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
