import * as moment from 'moment';
import { AgmMap } from '@agm/core';
import { Device } from 'src/app/interfaces/device';
import { ObjectId } from 'src/app/id';
import { MatDialog } from '@angular/material/dialog';
import { DeviceModal } from './device/device.modal';
import { SearchComponent } from 'src/app/libs/search/search.component';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

/* --- SERVICES --- */
import { MenuService } from 'src/app/services/menu/menu.service';
import { ZonesService } from 'src/app/services/zones/zones.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { DevicesService } from 'src/app/services/devices/devices.service';
import { QueryModal } from './query/query.modal';
import { MapPointIcon } from 'src/app/point';

declare var google: any;

@Component({
    selector:       'app-map-page',
    styleUrls:      ['./map.page.scss'],
    templateUrl:    './map.page.html'
})

export class MapPage implements OnInit, OnDestroy {

    @ViewChild(AgmMap, {'static': true})            private map:    AgmMap;
    @ViewChild(SearchComponent, {'static': true})   private search: SearchComponent;

    constructor(public menu: MenuService, private toast: ToastService, private route: ActivatedRoute, private dialog: MatDialog, public zones: ZonesService, private router: Router, public devices: DevicesService) {};

    public mode:            string  = 'hand';
    public circles:         any[]   = [];
    public drawing:         any;
    public editing:         boolean;
    public loading:         boolean;
    public history:         any     = {
        'to':           null,
        'data':         [],
        'from':         null,
        'enabled':      false,
        'deviceId':     null,
        'description':  null
    };
    public polygons:        any[]   = [];
    public rectangles:      any[]   = [];
    private DEVICE_DIALOG:  any;
    private subscriptions:  any     = {};
    
    private async list() {
        this.loading = true;

        const zones = await this.zones.list({
            'filter': [
                'role',
                'type',
                'bounds',
                'zoneId',
                'description'
            ]
        });
        
        if (zones.ok) {
            this.circles = this.zones.data.filter(o => o.type == 'circle');
            this.polygons = this.zones.data.filter(o => o.type == 'polygon');
            this.rectangles = this.zones.data.filter(o => o.type == 'rectangle');
        };

        const devices = await this.devices.list({
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

    public async ViewHistory() {
        this.router.navigate(['/map'], {
            'queryParams': {
                'mode':     'hand',
                'editing':  false
            }
        });
        this.drawing.setDrawingMode(null);

        const dialog = this.dialog.open(QueryModal, {
            'panelClass': 'device-history'
        });

        await dialog.afterClosed().subscribe(async params => {
            if (params) {
                this.loading = true;

                // const response = await this.devices.historical({
                //     'filter': [
                //         'deviceDate',
                //         'location.latitude',
                //         'location.longitude'
                //     ],
                //     // 'sort': {
                //     //     'deviceDate': 1
                //     // },
                //     'to':       params.to,
                //     'from':     params.from,
                //     'limit':    10000,
                //     'deviceId': params.deviceId
                // });

                this.history.to         = params.to;
                this.history.from       = params.from;
                this.history.deviceId   = params.deviceId;

                for (let i = 0; i < this.devices.data.length; i++) {
                    if (this.devices.data[i].deviceId == params.deviceId) {
                        this.history.description = this.devices.data[i].description;
                        break;
                    };
                };

                // if (response.ok) {
                    let data: any[] = [
                        {
                            'location': {
                                'latitude':     0,
                                'longitude':    0
                            }
                        },
                        {
                            'location': {
                                'latitude':     1,
                                'longitude':    1
                            }
                        },
                        {
                            'location': {
                                'latitude':     2,
                                'longitude':    2.5
                            }
                        }
                    ];

                    // response.result.sort((a, b) => {
                    //     if (a.location.latitude != b.location.latitude && a.location.longitude != b.location.longitude) {
                    //         data.push(b);
                    //     };
                    // });

                    for (let i = 0; i < data.length; i++) {
                        data[i].icon        = new MapPointIcon(i + 1);
                        data[i].position    = (i + 1);
                    };

                    this.history.data       = data;
                    this.history.enabled    = true;
                // } else {
                //     this.toast.error('no history found for selected dates');
                // };

                this.loading = false;
            };
        });
    };

    public async CloseHistory() {
        this.history.data       = [];
        this.history.enabled    = false;
    };

    public async ToggleEditor() {
        this.editing = !this.editing;
        if (!this.editing) {
            this.mode = 'hand';
            this.drawing.setDrawingMode(null);
        };
        this.router.navigate(['/map'], {
            'queryParams': {
                'mode':     this.mode,
                'editing':  this.editing
            }
        });
    };

    public async ViewZone(zone: any) {
        console.log('viewing not available for ', zone.description)
    };

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
				this.drawing.setDrawingMode(null);
                break;
            case('circle'):
				this.drawing.setDrawingMode(google.maps.drawing.OverlayType.CIRCLE);
                break;
            case('polygon'):
				this.drawing.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
                break;
            case('rectangle'):
				this.drawing.setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE);
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

    public async PolygonDragEnd($event, zone) {
        zone.dragEnd = {
			'lat': $event.latLng.lat(),
			'lng': $event.latLng.lng()
		};
		let change = {
			'lat': zone.dragStart.lat - zone.dragEnd.lat,
			'lng': zone.dragStart.lng - zone.dragEnd.lng
        };
        
		let position = [];
        
        zone.position.map(point => {
            position.push({
                'lat': point.lat - change.lat,
                'lng': point.lng - change.lng
            });
        });
        
        zone.position = position;
        
        this.loading = true;

        const response = await this.zones.update({
            'type':     'polygon',
            'zoneId':   zone.zoneId,
            'position': zone.position
        });

        if (response.ok) {
            this.toast.success('zone was updated');
        } else {
            this.toast.error('zone failed to updated');
        };
        
        this.loading = false;
    };

    public async PolygonDragStart($event, zone) {
        zone.dragStart = {
            'lat': $event.latLng.lat(),
            'lng': $event.latLng.lng()
        };
    };

    public async PolygonPathsChange($event, zone) {
        this.loading = true;

        zone.position = $event.newArr[0];
        
        const response = await this.zones.update({
			'type':     'polygon',
			'zoneId':   zone.zoneId,
			'position': zone.position
		});

        if (response.ok) {
            this.toast.success('zone was updated');
        } else {
            this.toast.error('zone failed to updated');
        };
        
        this.loading = false;
    };

    public async CircleCenterChange(center, zone) {
        this.loading = true;

        zone.position.latitude  = center.latitude
        zone.position.longitude = center.longitude

        const response = await this.zones.update({
            'type':     'circle',
            'zoneId':   zone.zoneId,
            'position': zone.position
        });

        if (response.ok) {
            this.toast.success('zone was updated');
        } else {
            this.toast.error('zone failed to updated');
        };
        
        this.loading = false;
    };

    public async CircleRadiusChange(radius, zone) {
        this.loading = true;

        zone.position.radius = radius;

        const response = await this.zones.update({
            'type':     'circle',
            'zoneId':   zone.zoneId,
            'position': zone.position
        });

        if (response.ok) {
            this.toast.success('zone was updated');
        } else {
            this.toast.error('zone failed to updated');
        };

        this.loading = false;
    };

    public async RectangleMouseUp($event, zone) {
        zone.holding = false;
    };

    public async RectangleMouseDown($event, zone) {
        zone.holding = true;
    };

    public async RectangleBoundsChange(bounds, zone) {
        if (!zone.holding) {
            this.loading = true;

            zone.position.east  = bounds.east;
            zone.position.west  = bounds.west;
            zone.position.south = bounds.south;
            zone.position.north = bounds.north;

            const response = await this.zones.update({
                'type':     'rectangle',
                'zoneId':   zone.zoneId,
                'position': zone.position
            });

            if (response.ok) {
                this.toast.success('zone was updated');
            } else {
                this.toast.error('zone failed to updated');
            };

            this.loading = false;
        };
    };

    ngOnInit(): void {
        this.map.minZoom            = 3;
        this.map.panControl         = false;
        this.map.streetViewControl  = false;

        this.subscriptions.map = this.map.mapReady.subscribe(map => {
            this.drawing = new google.maps.drawing.DrawingManager({
                'drawingControl': false,
                'drawingControlOptions': {
                    'drawingModes': [
                        'circle',
                        'polygon',
                        'rectangle'
                    ]
                },
                'circleOptions': {
                    'editable':     true,
                    'draggable':    true,
                    'fillOpacity':  0.5,
                    'strokeWeight': 0.5
                },
                'polygonOptions': {
                    'editable':     true,
                    'draggable':    true,
                    'fillOpacity':  0.5,
                    'strokeWeight': 0.5
                },
                'rectangleOptions': {
                    'editable':     true,
                    'draggable':    true,
                    'fillOpacity':  0.5,
                    'strokeWeight': 0.5
                },
                'drawingMode': null
            });

            this.drawing.setMap(map);

            switch(this.mode) {
                case('hand'):
                    this.drawing.setDrawingMode(null);
                    break;
                case('circle'):
                    this.drawing.setDrawingMode(google.maps.drawing.OverlayType.CIRCLE);
                    break;
                case('polygon'):
                    this.drawing.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
                    break;
                case('rectangle'):
                    this.drawing.setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE);
                    break;
            };

            google.maps.event.addListener(this.drawing, 'circlecomplete', async (circle) => {
                let zone: any = {
                    'position': {
                        'radius':       circle.radius,
                        'latitude':     circle.center.lat(),
                        'longitude':    circle.center.lng()
                    },
                    'role':             5,
                    'type':             'circle',
                    'description':      ObjectId(),
                    'organizationOnly': 0
                };

                this.loading = true;

                const response = await this.zones.add(zone);

                circle.setMap(null);

                if (response.ok) {
                    this.ToggleDrawingMode({
                        'value': 'hand'
                    });

                    zone.zoneId = response.result.zoneId;

                    this.circles.push(zone);
                };

                this.loading = false;
            });

            google.maps.event.addListener(this.drawing, 'polygoncomplete', async (polygon) => {
                let zone: any = {
                    'role':             5,
                    'type':             'polygon',
                    'position':         [],
                    'description':      ObjectId(),
                    'organizationOnly': 0
                };

                for (let i = 0; i < polygon.getPath().length; i++) {
                    zone.position.push({
                        'lat':  polygon.getPath().getAt(i).lat(),
                        'lng':  polygon.getPath().getAt(i).lng()
                    });
                };

                this.loading = true;

                const response = await this.zones.add(zone);

                polygon.setMap(null);

                if (response.ok) {
                    this.ToggleDrawingMode({
                        'value': 'hand'
                    });

                    zone.zoneId = response.result.zoneId;

                    this.polygons.push(zone);
                };

                this.loading = false;
            });

            google.maps.event.addListener(this.drawing, 'rectanglecomplete', async (rectangle) => {
                let zone: any = {
                    'position': {
                        'east':     rectangle.getBounds().getNorthEast().lng(),
                        'west':     rectangle.getBounds().getSouthWest().lng(),
                        'north':    rectangle.getBounds().getNorthEast().lat(),
                        'south':    rectangle.getBounds().getSouthWest().lat()
                    },
                    'role':             5,
                    'type':             'rectangle',
                    'description':      ObjectId(),
                    'organizationOnly': 0
                };

                this.loading = true;

                const response = await this.zones.add(zone);

                rectangle.setMap(null);

                if (response.ok) {
                    this.ToggleDrawingMode({
                        'value': 'hand'
                    });

                    zone.zoneId = response.result.zoneId;

                    this.rectangles.push(zone);
                };

                this.loading = false;
            });
        });

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
        this.subscriptions.map.unsubscribe();
        this.subscriptions.search.unsubscribe();
        this.subscriptions.params.unsubscribe();
        this.subscriptions.mapclick.unsubscribe();
    };

}