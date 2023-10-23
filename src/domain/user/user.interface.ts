/**
 * User object contains information accross
 * every user in the system regardless of status and role.
 */
export interface User {
	/**
	 * Mongoose Id : 24-character hexadecimal values
	 * @example "abf37c895e6d120ab3f9c7e1
	 */
	_id: string;
	email: string;
	name: string;
	role: 'Admin' | 'Traveler';
}

/**
 * User object with basic information
 */
export interface UserSummary {
	/**
	 * Mongoose Id : 24-character hexadecimal values
	 * @example "abf37c895e6d120ab3f9c7e1"
	 */
	_id: string;
	name: string;
}
