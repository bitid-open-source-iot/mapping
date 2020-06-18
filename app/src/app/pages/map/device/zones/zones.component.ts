import { ZonesService }  from './../../../../services/zones/zones.service';
import { ToastrService } from 'ngx-toastr';
import { DevicesService }  from './../../../../services/devices/devices.service';
import { DeviceZoneEditorComponent }  from './editor/editor.component';
import { Inject, OnInit, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

@Component({
    selector:     'app-device-zones',
    styleUrls:    ['./zones.component.scss'],
    templateUrl:  './zones.component.html'
})

export class DeviceZonesComponent implements OnInit {
    
    constructor(private dailog: MatDialog, private current: MatDialogRef<DeviceZonesComponent>, @Inject(MAT_DIALOG_DATA) private data: DeviceZonesParams, private toast: ToastrService, private service: DevicesService, private zonesservice: ZonesService) {};
    
    public role: 				number;
    public zones: 				any 		= new MatTableDataSource();
    public config: 				any[] 		= [];
    public loading: 			boolean;
    public description: 		string;
    public displayedColumns: 	string[] 	= ['description', 'unlink'];

    public link() {
        let zones: any[] = [];

        this.config.map(item => {
            let tmp:   any     = item;
            let found: boolean = false;
            tmp.selected       = false;
            
            this.zones.data.map(zone => {
                if (zone.zoneId == item.zoneId) {
                    found = true;
                };
            });

            if (found) {
                tmp.selected = true;
            };

            zones.push(tmp);
        });

        this.dailog.open(DeviceZoneEditorComponent, {
            'data': {
                'mode':  'add',
                'zones': zones
            }
        }).afterClosed().subscribe(result => {
            if (result) {
                this.zones.data.push({
                    'zoneId': result.zoneId
                });

                this.zones.data = JSON.parse(JSON.stringify(this.zones.data));

                this.update('Zone was linked to device!', 'Zone failed to link zone to device!');
            };
        });
    };
    
    public close() {
        this.current.close();
    };

    public edit(zone) {
        let zones: any[] = [];

        this.config.map(item => {
            let tmp:   any     = item;
            let found: boolean = false;
            tmp.selected       = false;
            
            this.zones.data.map(zone => {
                if (zone.zoneId == item.zoneId) {
                    found = true;
                };
            });

            if (found) {
                tmp.selected = true;
            };

            zones.push(tmp);
        });

        this.dailog.open(DeviceZoneEditorComponent, {
            'data': {
                'mode':  'add',
                'zones': zones
            }
        }).afterClosed().subscribe(result => {
            if (result) {
                this.zones.data.push({
                    'zoneId': result.zoneId
                });
        
                this.zones.data = JSON.parse(JSON.stringify(this.zones.data));

                this.update('Zone was linked to device!', 'Zone failed to link zone to device!');
            };
        });
    };

    public unlink(zone) {
        for (var i = this.zones.data.length - 1; i >= 0; i--) {
            if (this.zones.data[i].zoneId == zone.zoneId) {
                this.zones.data.splice(i, 1);
                break;
            };
        };

        this.zones.data = JSON.parse(JSON.stringify(this.zones.data));

        this.update('Zone was unlinked', 'Zone failed to unlink');
    };

    private async get() {
    	this.loading = true;

        const config = await this.zonesservice.list({
            'filter': [
                'zoneId',
                'description'
            ]
        });

        if (config.ok) {
            this.config = config.result;
        } else {
            this.config = [];
        };

        const device = await this.service.get({
        	'filter': [
        		'role',
        		'mapping',
        		'deviceId',
        		'description'
        	],
        	'deviceId': this.data.deviceId
        });

    	this.loading = false;

        if (device.ok) {
        	this.role 			= device.result.role;
        	this.zones.data 	= device.result.mapping.zones;
        	this.description 	= device.result.description;
        } else {
        	this.zones.data = [];
        };
    };

    private async update(success: string, failed: string) {
        this.loading = true;

        const response = await this.service.update({
            'mapping': {
                'zones': this.zones.data
            },
            'deviceId': this.data.deviceId
        });

        this.loading = false;

        if (response.ok) { 
            this.toast.success(success);
        } else {
            this.toast.error(failed);
        };
    };

    public GetDescription(zoneId: string) {
        let found:         boolean = false;
        let description:   string  = 'You are not shared to this zone!';

    	this.config.map(o => {
    		if (o.zoneId == zoneId) {
                found       = true;
    			description = o.description;
    		};
    	});

        if (!found) {
            this.zones.data.map(zone => {
                if (zone.zoneId == zoneId) {
                    zone.disabled = true;
                };
            });
        };

        return description;
    };

    ngOnInit() {
    	this.get();
    };
}

export interface DeviceZonesParams {
    'deviceId': string;
}