import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import config from './mongodb-memory-server-config';
import * as process from 'process';

export = async function globalSetup() {
	if (config.Memory) {
		const instance = await MongoMemoryServer.create();
		const uri = instance.getUri();

		(global as any).__MONGOINSTANCE = instance;
		process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
	} else {
		process.env.MONGO_URI = `mongodb://${config.IP}:${config.Port}`;
	}

	await mongoose.connect(`${process.env.MONGO_URI}/${config.Database}`);
	await mongoose.connection.db.dropDatabase();
	await mongoose.disconnect();
};
