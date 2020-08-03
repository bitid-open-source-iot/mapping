import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ShareComponent } from './../../../components/share/share.component';
import { DevicesService } from './../../../services/devices/devices.service';
import { RemoveComponent } from './../../../components/remove/remove.component';
import { FormErrorService } from './../../../services/form-error/form-error.service';
import { LocalstorageService } from './../../../services/localstorage/localstorage.service';
import { DeviceZonesComponent } from './zones/zones.component';
import { SubscribersComponent } from './../../../components/subscribers/subscribers.component';
import { UnsubscribeComponent } from './../../../components/unsubscribe/unsubscribe.component';
import { DeviceHistoryComponent } from './history/history.component';
import { LocaTrackingSettingsService } from '@loca-tracking/settings';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Input, Component, OnChanges, SimpleChanges, AfterContentInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 		'app-device',
	styleUrls: 		['./device.component.scss'],
	templateUrl: 	'./device.component.html'
})

export class DeviceComponent implements OnChanges, AfterContentInit {

	constructor(private dialog: MatDialog, private toast: ToastrService, private service: DevicesService, private formerror: FormErrorService, private localstorage: LocalstorageService, public locatracking: LocaTrackingSettingsService) {};

	public form: FormGroup = new FormGroup({
        'description': 		new FormControl('', [Validators.required]),
        'organizationOnly': new FormControl('', [Validators.required])
    });
    public errors:   any = {
        'description': 		'',
        'organizationOnly': ''
    };
	public loading:	boolean;

	@Input('device') 	public 	device: 	Device 	= DeviceDefaults;
	@Input('editing') 	public 	editing: 	boolean;

	@Output('update') 	private updateProperties: EventEmitter<any> = new EventEmitter<any>()

	public async SetDeviceIcon(icon, device) {
		this.loading = true;

		const response = await this.service.update({
			'location': 	{
				'icon': icon
			},
			'deviceId': this.device.deviceId
		});

		this.loading = false;

		if (response.ok) {
			this.device.location.icon = icon;
			this.updateProperties.emit({
				'location': {
					'icon': icon
				},
				'deviceId': this.device.deviceId
			});
		};
	};

	public async zones() {
		if (this.device.role >= 2) {
			this.dialog.open(DeviceZonesComponent, {
	            'data': {
	                'deviceId': this.device.deviceId
	            },
	            'panelClass': 'full-screen-dialog'
	        });
        } else {
        	this.toast.info('You have insufficient see or edit this devices zones!');
		};
	};

	public async share() {
		if (this.device.role >= 4) {
			this.dialog.open(ShareComponent, {
	            'data': {
	                'description': this.device.description
	            },
	            'panelClass': 'share-dialog'
	        }).afterClosed().subscribe(result => {
	            if (result) {
	                this.call('share', {
	                	'role': 	result.role,
	                	'email': 	result.email,
	                	'deviceId': this.device.deviceId
	                }, res => {
	                	this.toast.success('User was shared!');
	                }, err => {
	                	this.toast.error('User was not shared!');
	                });
	            };
	        });
        } else {
        	this.toast.info('You have insufficient rights to share this device!');
		};
	};

	public async update() {
		this.loading = true;

		const response = await this.service.update({
			'deviceId': 		this.device.deviceId,
			'description': 		this.form.value.description,
			'organizationOnly': this.device.organizationOnly
		});

		if (response.ok) {
			if (response.result.updated == 1) {
				this.device.description 		= this.form.value.description;
				this.device.organizationOnly 	= this.form.value.organizationOnly;
			};
		};

		this.loading = false;
	};

	public async delete() {
		if (this.device.role >= 5) {
			this.dialog.open(RemoveComponent, {
	            'data': {
	                'description': this.device.description
	            },
	            'panelClass': 'remove-dialog'
	        }).afterClosed().subscribe(result => {
	            if (result) {
	                this.call('delete', {
	                	'deviceId': this.device.deviceId
	                }, res => {
	                	this.toast.success('Device was deleted!');
	                }, err => {
	                	this.toast.error('Device was not deleted!');
	                });
	            };
	        });
		} else {
        	this.toast.info('You have insufficient rights to delete this device!');
		};
	};

	public async history() {
		this.dialog.open(DeviceHistoryComponent, {
            'data': {
                'description': this.device.description
            },
            'panelClass': 'history-dialog'
        }).afterClosed().subscribe(result => {
            if (result) {
                this.historical({
                	'sort': {
                		'date': 1
                	},
                	'date': {
                		'to': 		result.to,
                		'from': 	result.from
                	},
                	'deviceId': this.device.deviceId
                });
            };
        });
	};

	public async subscribers() {
		if (this.device.role >= 4) {
			this.dialog.open(SubscribersComponent, {
	            'data': {
	                'id': 		this.device.deviceId,
	                'type': 	'device',
	                'service': 	this.service
	            },
	            'panelClass': 'subscribers-dialog'
	        });
        } else {
        	this.toast.info('You have insufficient rights to change this devices subscribers!');
		};
	};

	public async unsubscribe() {
		if (this.device.role != 5) {
			this.dialog.open(UnsubscribeComponent, {
	            'data': {
	                'description': this.device.description
	            },
	            'panelClass': 'unsubscribe-dialog'
	        }).afterClosed().subscribe(result => {
	            if (result) {
	                this.call('unsubscribe', {
	                	'email': 	this.localstorage.get('email'),
	                	'deviceId': this.device.deviceId
	                }, res => {
	                	this.toast.success('User was unsubscribed!');
	                }, err => {
	                	this.toast.error('User was not unsubscribed!');
	                });
	            };
	        });
        } else {
        	this.toast.info('You own this device, you cannot unsubscribe yourself!');
		};
	};

	private async historical(params) {
		this.loading = true;

	    const response = await this.service.historical(params);

	    this.loading = false;
	};
	
	public async call(func: string, params: any, done?, error?) {
		this.loading = true;

	    const response = await this.service[func](params);

	    this.loading = false;

		if (response.ok) {
			done(response.result);
	    } else {
	    	error(response.error);
	    };
	};

	ngOnChanges(changes: SimpleChanges) {
		if (changes.device) {
			if (changes.device.currentValue) {
				if (changes.device.currentValue.description) {
					this.form.controls['description'].setValue(changes.device.currentValue.description);
				};
				if (changes.device.currentValue.description) {
					this.form.controls['organizationOnly'].setValue(changes.device.currentValue.organizationOnly);
				};
			};
		};
	};

	ngAfterContentInit() {
		this.form.valueChanges.subscribe((data) => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });
	};
}

interface Device {
	'location': {
		'latitude': 	number;
		'longitude': 	number;
	};
	'location': {
		'icon': 	string;
		'zones': 	any[];
		'enabled': 	boolean;
	};
	'role': 			number;
	'inputs': 			any[];
	'typeId': 			string;
	'deviceId': 		string;
	'lastcomms'?: 		string;
	'description': 		string;
	'organizationOnly': number;
}

const DeviceDefaults = {
	'location': {
		'latitude': 	0,
		'longitude': 	0
	},
	'location': {
		'icon': 	null,
		'zones': 	[],
		'enabled': 	true
	},
	'role': 			0,
	'inputs': 			[],
	'typeId': 			null,
	'deviceId': 		null,
	'lastcomms': 		null,
	'description': 		null,
	'organizationOnly': 0
}