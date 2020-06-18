import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ZonesService } from 'src/app/services/zones/zones.service';
import { DevicesService } from 'src/app/services/devices/devices.service';

@Component({
    selector:     'app-search',
    styleUrls:    ['./search.component.scss'],
    templateUrl:  './search.component.html'
})

export class SearchComponent {
    
	constructor(private dialog: MatDialogRef<SearchComponent>, private zonesservice: ZonesService, private devicesservice: DevicesService) {};
	
	public result: 		any[] = [];
	public loading: 	boolean;
	public finished: 	boolean;
	public description: string;
    
    public close() {
        this.dialog.close(false);
    };

	public submit(option) {
		this.dialog.close(option);
	};
	
    public async search() {
		if (typeof(this.description) == 'undefined' || this.description == '' || this.description == null) {
			this.result = this.result.filter(item => (item.type != 'zone'));
			this.result = this.result.filter(item => (item.type != 'device'));
			return false;
		};

		this.loading 	= true;

		const zones 	= await this.zonesservice.list({
			'filter': [
				'role',
				'points',
				'zoneId',
				'description'
			],
			'description': this.description
		});

		if (zones.ok) {
			this.result = this.result.filter(item => (item.type != 'zone'));

			zones.result.map(zone => {
				zone.type = 'zone';
				this.result.push(zone);
			});
		} else {
			this.result = this.result.filter(item => (item.type != 'zone'));
		};

		const devices 	= await this.devicesservice.list({
			'filter': [
				'role',
				'inputs',
				'mapping',
				'deviceId',
				'location',
				'serverDate',
				'connection',
				'description'
			],
			'mapping': {
				'enabled': true
			},
			'description': this.description
		});

		if (devices.ok) {
			this.result = this.result.filter(item => (item.type != 'device'));

			devices.result.map(device => {
				device.type = 'device';
				this.result.push(device);
			});
		} else {
			this.result = this.result.filter(item => (item.type != 'device'));
		};

		this.loading 	= false;
	};
}