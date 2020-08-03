import { User } from './user';

export interface System {
	'role'?:                number;
	'users'?:               User[];
	'systemId'?:            string;
	'description'?:         string;
	'organizationOnly'?:    number;
}