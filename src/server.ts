require('dotenv').config();
import { app } from './app';
import mongoose from 'mongoose';

const port = process.env.PORT || 3000;

main().catch((err) => console.log(err));

async function main() {
	const mongoURI = process.env.MONGODB_URI;

	if (!mongoURI) {
		throw new Error('Environment variable MONGODB_URI is not defined');
	}

	await mongoose.connect(mongoURI);
	app.listen(port, () =>
		console.log(`Server is listening at http://localhost:${port}`),
	);
}
