import { MatDialog } from '@angular/material';
import { ZonesService } from './../../../services/zones/zones.service';
import { ToastrService } from 'ngx-toastr';
import { ShareComponent } from './../../../components/share/share.component';
import { RemoveComponent } from './../../../components/remove/remove.component';
import { FormErrorService } from './../../../services/form-error/form-error.service';
import { LocalstorageService } from './../../../services/localstorage/localstorage.service';
import { SubscribersComponent } from './../../../components/subscribers/subscribers.component';
import { UnsubscribeComponent } from './../../../components/unsubscribe/unsubscribe.component';
import { LocaTrackingSettingsService } from '@loca-tracking/settings';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Input, Component, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';

@Component({
	selector: 		'app-zone',
	styleUrls: 		['./zone.component.scss'],
	templateUrl: 	'./zone.component.html'
})

export class ZoneComponent implements OnChanges, AfterContentInit {

	constructor(private dialog: MatDialog, private toast: ToastrService, private service: ZonesService, private formerror: FormErrorService, private localstorage: LocalstorageService, public locatracking: LocaTrackingSettingsService) {};

	public form: FormGroup = new FormGroup({
        'description': 		new FormControl('', [Validators.required]),
        'organizationOnly': new FormControl('', [Validators.required])
    });
    public errors:   any = {
        'description': 		'',
        'organizationOnly': ''
    };
	public loading:	boolean;

	@Input('zone') 		public 	zone: 		Zone 	= ZoneDefaults;
	@Input('editing') 	public 	editing: 	boolean;

	public async share() {
		if (this.zone.role >= 4) {
			this.dialog.open(ShareComponent, {
	            'data': {
	                'description': this.zone.description
	            },
	            'panelClass': 'share-dialog'
	        }).afterClosed().subscribe(result => {
	            if (result) {
	                this.call('share', {
	                	'role': 	result.role,
	                	'email': 	result.email,
	                	'zoneId': this.zone.zoneId
	                }, res => {
	                	this.toast.success('User was shared!');
	                }, err => {
	                	this.toast.error('User was not shared!');
	                });
	            };
	        });
        } else {
        	this.toast.info('You have insufficient rights to share this zone!');
		};
	};

	public async update() {
		this.loading = true;

		const response = await this.service.update({
			'zoneId': 		this.zone.zoneId,
			'description': 		this.form.value.description,
			'organizationOnly': this.zone.organizationOnly
		});

		if (response.ok) {
			if (response.result.updated == 1) {
				this.zone.description 		= this.form.value.description;
				this.zone.organizationOnly 	= this.form.value.organizationOnly;
			};
		};

		this.loading = false;
	};

	public async delete() {
		if (this.zone.role >= 5) {
			this.dialog.open(RemoveComponent, {
	            'data': {
	                'description': this.zone.description
	            },
	            'panelClass': 'remove-dialog'
	        }).afterClosed().subscribe(result => {
	            if (result) {
	                this.call('delete', {
	                	'zoneId': this.zone.zoneId
	                }, res => {
	                	this.toast.success('Zone was deleted!');
	                }, err => {
	                	this.toast.error('Zone was not deleted!');
	                });
	            };
	        });
		} else {
        	this.toast.info('You have insufficient rights to delete this zone!');
		};
	};

	public async subscribers() {
		if (this.zone.role >= 4) {
			this.dialog.open(SubscribersComponent, {
	            'data': {
	                'id': 		this.zone.zoneId,
	                'type': 	'zone',
	                'service': 	this.service
	            },
	            'panelClass': 'subscribers-dialog'
	        });
        } else {
        	this.toast.info('You have insufficient rights to change this zones subscribers!');
		};
	};

	public async unsubscribe() {
		if (this.zone.role != 5) {
			this.dialog.open(UnsubscribeComponent, {
	            'data': {
	                'description': this.zone.description
	            },
	            'panelClass': 'unsubscribe-dialog'
	        }).afterClosed().subscribe(result => {
	            if (result) {
	                this.call('unsubscribe', {
	                	'email': 	this.localstorage.get('email'),
	                	'zoneId': this.zone.zoneId
	                }, res => {
	                	this.toast.success('User was unsubscribed!');
	                }, err => {
	                	this.toast.error('User was not unsubscribed!');
	                });
	            };
	        });
        } else {
        	this.toast.info('You own this zone, you cannot unsubscribe yourself!');
		};
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
		if (changes.zone) {
			if (changes.zone.currentValue) {
				if (changes.zone.currentValue.description) {
					this.form.controls['description'].setValue(changes.zone.currentValue.description);
				};
				if (changes.zone.currentValue.description) {
					this.form.controls['organizationOnly'].setValue(changes.zone.currentValue.organizationOnly);
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

interface Zone {
	'role': 			number;
	'zoneId': 			string;
	'description': 		string;
	'organizationOnly': number;
}

const ZoneDefaults = {
	'role': 			0,
	'zoneId': 			null,
	'description': 		null,
	'organizationOnly': 0
}