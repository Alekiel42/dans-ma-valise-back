/**
 * User object contains information accross
 * every user in the system regardless of status and role.
 */
export interface User {
	id: number;
	email: string;
	name: string;
	role: 'Admin' | 'Traveler';
}
