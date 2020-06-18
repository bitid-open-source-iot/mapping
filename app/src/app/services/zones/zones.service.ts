import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './../../services/api/api.service';
import { environment } from './../../../environments/environment';

@Injectable({
	providedIn: 'root'
})

export class ZonesService {

	public changes: Subject<ZoneChanges> = new Subject();

	constructor(private api: ApiService) {};

	public async add(params) {
		const response = await this.api.post(environment.telemetry, '/telemetry/zones/add', params);

		if (response.ok) {
			let zone: Zone = params;
			zone.zoneId = response.result.zoneId;

			this.changes.next({
				'type': 'add',
				'data': zone
			});
		};

		return response;
	};

	public async get(params) {
		return await this.api.post(environment.telemetry, '/telemetry/zones/get', params);
	};

	public async list(params) {
		return await this.api.post(environment.telemetry, '/telemetry/zones/list', params);
	};

	public async share(params) {
		return await this.api.post(environment.telemetry, '/telemetry/zones/share', params);
	};

	public async update(params) {
		return await this.api.post(environment.telemetry, '/telemetry/zones/update', params);
	};

	public async delete(params) {
		const response = await this.api.post(environment.telemetry, '/telemetry/zones/delete', params);

		if (response.ok) {
			this.changes.next({
				'type': 'delete',
				'data': params
			});
		};

		return response;
	};

	public async unsubscribe(params) {
		return await this.api.post(environment.telemetry, '/telemetry/zones/unsubscribe', params);
	};

	public async updatesubscriber(params) {
		return await this.api.post(environment.telemetry, '/telemetry/zones/updatesubscriber', params);
	};
}

export interface Zone {
	'role': 		number;
	'zoneId': 		string;
	'points': 		any[];
	'description': 	any;
}

interface ZoneChanges {
	'type': string;
	'data': any;
}