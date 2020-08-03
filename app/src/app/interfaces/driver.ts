import { User } from './user';

export interface Driver {
	'ws'?: {
		'port'?:  	number;
		'enabled'?:	boolean;
	};
	'tcp'?: {
		'port'?:  	number;
		'host'?:    string;
		'enabled'?:	boolean;
	};
	'mqtt'?: {
		'url'?:     	string;
		'host'?:    	string;
		'port'?:  		number;
		'topic'?:   	string;
		'enabled'?:		boolean;
		'username'?:	string;
		'password'?:	string;
	};
	'role'?:                number;
	'file'?:				string;
	'users'?:               User[];
	'enabled'?:				boolean;
	'driverId'?:			string;
	'systemId'?:			string[];
	'serverDate'?:			any;
	'description'?:  		string;
	'organizationOnly'?:    number;
}