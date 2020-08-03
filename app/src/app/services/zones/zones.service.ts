import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class ZonesService {

	public data: any[] = [];

	constructor(private api: ApiService) {};

	public async add(params) {
		return await this.api.post(environment.telemetry, '/telemetry/zones/add', params);
	};

	public async get(params) {
		return await this.api.post(environment.telemetry, '/telemetry/zones/get', params);
	};

	public async list(params) {
		const response = await this.api.post(environment.telemetry, '/telemetry/zones/list', params);

		if (response.ok) {
			this.data = response.result;
		};

		return response;
	};

	public async share(params) {
		return await this.api.post(environment.telemetry, '/telemetry/zones/share', params);
	};

	public async update(params) {
		return await this.api.post(environment.telemetry, '/telemetry/zones/update', params);
	};

	public async delete(params) {
		return await this.api.post(environment.telemetry, '/telemetry/zones/delete', params);
	};

	public async unsubscribe(params) {
		return await this.api.post(environment.telemetry, '/telemetry/zones/unsubscribe', params);
	};

	public async updatesubscriber(params) {
		return await this.api.post(environment.telemetry, '/telemetry/zones/updatesubscriber', params);
	};
}