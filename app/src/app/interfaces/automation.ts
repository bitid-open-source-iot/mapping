import { User } from './user';

export interface Automation {
    'role'?:                number;
	'users'?:               User[];
	'description'?:         string;
    'automationId'?:        string;
	'organizationOnly'?:    number;
}