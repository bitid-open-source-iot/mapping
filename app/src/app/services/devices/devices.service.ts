import { Device } from 'src/app/interfaces/device';
import { MapIcon } from 'src/app/icon';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class DevicesService {

	public data: Device[] = [];

	constructor(private api: ApiService) {};

	public async add(params) {
		const response = await this.api.post(environment.telemetry, '/telemetry/devices/add', params);

		if (response.ok) {
		};

		return response;
	};

	public async get(params) {
		const response = await this.api.post(environment.telemetry, '/telemetry/devices/get', params);

		if (response.ok) {};

		return response;
	};

	public async list(params, skip?: boolean) {
		const response = await this.api.post(environment.telemetry, '/telemetry/devices/list', params);

		if (response.ok && !skip) {
			this.data = response.result;
			this.data.map(device => {
				if (typeof(device.icon) != 'undefined' && device.icon !== null && typeof(device.location) != 'undefined' && device.location !== null) {
					device.location.icon = new MapIcon(device.icon);
				};
				if (Array.isArray(device.inputs)) {
					device.inputs.map(input => {
						if (input.type == 'analog') { 
							input.value = parseFloat(input.value).toFixed(2);
						} else if (input.type == 'digital') {
							if (input.value == 0) { 
								input.value = input.digital.low;
							} else if (input.value == 1) {
								input.value = input.digital.high;
							} else {
								input.value = '-';
							};
						};
					});
				};
			});
		};

		return response;
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

	public async historical(params) {
		return await this.api.post(environment.telemetry, '/telemetry/devices/historical', params);
	};

	public async unsubscribe(params) {
		return await this.api.post(environment.telemetry, '/telemetry/devices/unsubscribe', params);
	};

	public async updatesubscriber(params) {
		return await this.api.post(environment.telemetry, '/telemetry/devices/updatesubscriber', params);
	};
}