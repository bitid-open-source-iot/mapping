import { User } from './user';
import { Alert } from './alert';
import { Input } from './input';
import { Field } from './field';
import { Control } from './control';
import { Webhook } from './webhook';

export interface Device {
	'signal'?: {
		'value': 	number;
		'inputId':	string;
	};
	'battery'?: {
		'value': 	number;
		'inputId':	string;
	};
	'location'?: {
		'icon'?:     	any;
		'enabled'?:     boolean;
		'latitude'?: 	number;
		'longitude'?: 	number;
	};
	'connection'?: {
		'last'?: 	any;
		'status'?: 	number;
		'timeout'?: {
			'unit'?: 	number;
			'value'?: 	number;
		};
	};
	'authorization'?: {
		'username'?:	string;
		'password'?:	string;
	};
	'icon'?:                string;
	'role'?:                number;
	'users'?:               User[];
	'fields'?:              Field[];
	'alerts'?:              Alert[];
	'inputs'?:              Input[];
	'typeId'?:              string;
    'zoneId'?:              string[];
	'number'?:              string;
	'barcode'?:             string;
	'localId'?:             string;
	'deviceId'?:            string;
	'reportId'?:            string;
	'systemId'?:            string[];
	'password'?:            string;
	'controls'?:            Control[];
	'webhooks'?:            Webhook[];
	'lastcomms'?:			string;
	'description'?:         string;
	'commsstatus'?:			number;
	'organizationOnly'?:    number;
}