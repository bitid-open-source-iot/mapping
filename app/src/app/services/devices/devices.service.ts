import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './../../services/api/api.service';
import { environment } from './../../../environments/environment';

@Injectable({
	providedIn: 'root'
})

export class DevicesService {

	public changes: Subject<DeviceChanges> = new Subject();

	constructor(private api: ApiService) {};

	public async add(params) {
		return await this.api.post(environment.telemetry, '/telemetry/devices/add', params);
	};

	public async get(params) {
		return await this.api.post(environment.telemetry, '/telemetry/devices/get', params);
	};

	public async list(params) {
		return  await this.api.post(environment.telemetry, '/telemetry/devices/list', params);
	};

	public async share(params) {
		return await this.api.post(environment.telemetry, '/telemetry/devices/share', params);
	};

	public async update(params) {
		return await this.api.post(environment.telemetry, '/telemetry/devices/update', params);
	};

	public async delete(params) {
		return await this.api.post(environment.telemetry, '/telemetry/devices/delete', params);
	};

	public async quickadd(params) {
		return await this.api.post(environment.telemetry, '/telemetry/devices/quickadd', params);
	};

	public async historical(params) {
		const response = await this.api.post(environment.telemetry, '/telemetry/devices/historical', params);

		this.changes.next({
			'type': 'history',
			'data': response
		});

		return response;
	};

	public async unsubscribe(params) {
		return await this.api.post(environment.telemetry, '/telemetry/devices/unsubscribe', params);
	};

	public async updatesubscriber(params) {
		return await this.api.post(environment.telemetry, '/telemetry/devices/updatesubscriber', params);
	};
}

interface DeviceChanges {
	'type': string;
	'data': any;
}