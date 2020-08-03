import * as moment from 'moment';
import { AgmMap } from '@agm/core';
import { Device } from 'src/app/interfaces/device';
import { MatDialog } from '@angular/material/dialog';
import { DeviceModal } from './device/device.modal';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

/* --- SERVICES --- */
import { MenuService } from 'src/app/services/menu/menu.service';
import { ZonesService } from 'src/app/services/zones/zones.service';
import { DevicesService } from 'src/app/services/devices/devices.service';
import { SearchComponent } from 'src/app/libs/search/search.component';

declare var google: any;

@Component({
    selector:       'app-map-page',
    styleUrls:      ['./map.page.scss'],
    templateUrl:    './map.page.html'
})

export class MapPage implements OnInit, OnDestroy {

    @ViewChild(AgmMap, {'static': true})            private map:    AgmMap;
    @ViewChild(SearchComponent, {'static': true})   private search: SearchComponent;

    constructor(public menu: MenuService, private route: ActivatedRoute, private dialog: MatDialog, public zones: ZonesService, private router: Router, public devices: DevicesService) {};

    public mode:            string  = 'hand';
    public drawing:         any;
    public editing:         boolean;
    public loading:         boolean;
    private DEVICE_DIALOG:  any;
    private subscriptions:  any     = {};
    
    private async list() {
        this.loading = true;

        await this.zones.list({
            'filter': [
                'role',
                'points',
                'zoneId',
                'description'
            ]
        });

        await this.devices.list({
            'filter': [
                'icon',
                'role',
                'data',
                'inputs',
                'signal',
                'battery',
                'deviceId',
                'location',
                'connection',
                'description'
            ],
            'location': {
                'enabled': true
            }
        });

        this.loading = false;
    };

    public async ToggleEditor() {
        this.editing = !this.editing;
        if (!this.editing) {
            this.mode = 'hand';
        };
        this.router.navigate(['/map'], {
            'queryParams': {
                'mode':     this.mode,
                'editing':  this.editing
            }
        });
    };

    public async ViewZone(zone: any) {};

    public async ToggleDrawingMode(event) {
        this.mode = event.value;

        this.router.navigate(['/map'], {
            'queryParams': {
                'mode':     this.mode,
                'editing':  this.editing
            }
        });

        switch(this.mode) {
            case('hand'):
                break;
            case('circle'):
                break;
            case('polygon'):
                break;
            case('rectangle'):
                break;
        };
    };

    public async ViewDevice(device: Device) {
        if (this.DEVICE_DIALOG) {
            if (device.deviceId != this.DEVICE_DIALOG.id) {
                this.DEVICE_DIALOG.close();
                delete this.DEVICE_DIALOG;
            } else {
                return false;
            };
        };

        this.DEVICE_DIALOG = await this.dialog.open(DeviceModal, {
            'id':           device.deviceId,
            'data':         device,
            'panelClass':   'device-modal',
            'hasBackdrop':  false
        });
    };

    public async ZoneDragEnd($event, zone) {};

    public async ZoneDragStart($event, zone) {};

    public async ZonePathsChange($event, zone) {};

    ngOnInit(): void {
        this.map.minZoom            = 3;
        this.map.panControl         = false;
        this.map.streetViewControl  = false;

        this.subscriptions.search = this.search.change.subscribe(search => {});

        this.subscriptions.params = this.route.queryParams.subscribe(params => {
            if (typeof(params.mode) != 'undefined' && params.mode !== null) {
                this.mode = params.mode;
            };
            if (typeof(params.editing) != 'undefined' && params.editing !== null) {
                this.editing = JSON.parse(params.editing);
            };
        });

        this.subscriptions.mapclick = this.map.mapClick.subscribe(event => {
            if (this.DEVICE_DIALOG) {
                this.DEVICE_DIALOG.close();
                delete this.DEVICE_DIALOG;
            };
        });

        this.list();
        
        setInterval(() => {
            this.devices.data.map(device => {
                if (device.connection.status == 1) {
                    let last = new Date(device.connection.last).getTime();
                    if (new Date(last).getFullYear() == 1970) {
                        device.lastcomms    = 'device not connected'
                        device.commsstatus  = 0;
                        return;
                    } else {
                        let current = new Date().getTime();
                        let section;
                        let overflow;

                        switch(device.connection.timeout.unit) {
                            case(0): // Minute
                                overflow = device.connection.timeout.value * 60000;
                                break;
                            case(1): // Hour
                                overflow = device.connection.timeout.value * 3600000;
                                break;
                            case(2): // Day
                                overflow = device.connection.timeout.value * 86400000;
                                break;
                            case(3): // Week
                                overflow = device.connection.timeout.value * 604800000;
                                break;
                        };

                        section = Math.floor(overflow / 4);

                        if (current <= last + overflow) {
                            device.commsstatus   = 3;
                            device.lastcomms  = moment(last).fromNow();
                        } else {
                            let buffer: number = current - overflow;
                            if ((buffer - last) <= section) {
                                device.commsstatus   = 3;
                                device.lastcomms  = moment(last).fromNow();
                            } else if ((buffer - last) <= (section * 2)) {
                                device.commsstatus   = 2;
                                device.lastcomms  = moment(last).fromNow();
                            } else if ((buffer - last) <= (section * 3)) {
                                device.commsstatus   = 1;
                                device.lastcomms  = moment(last).fromNow();
                            } else {
                                device.commsstatus   = 0;
                                device.lastcomms  = 'device comms fail'
                            };
                        };
                    };
                } else {
                    device.lastcomms    = 'device not connected'
                    device.commsstatus  = 0;
                };
            });
        }, 1000);
    };

    ngOnDestroy(): void {
        this.subscriptions.search.unsubscribe();
        this.subscriptions.params.unsubscribe();
        this.subscriptions.mapclick.unsubscribe();
    };

}