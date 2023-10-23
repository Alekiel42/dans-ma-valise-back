import 'reflect-metadata';
import express, { json, urlencoded } from 'express';
import { RegisterRoutes } from './application/routes/routes';
import errorHandler from './application/middleware/ErrorHandler';

export const app = express();

app.use(
	urlencoded({
		extended: true,
	}),
);
app.use(json());

RegisterRoutes(app);

app.use(errorHandler);
