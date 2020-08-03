import { User } from './user';

export interface Group {
	'role'?:                number;
	'users'?:               User[];
	'groupId'?:            	string;
	'description'?:         string;
	'organizationOnly'?:    number;
}