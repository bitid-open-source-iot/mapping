import * as moment from 'moment';
import { Animation } from 'src/app/animation';
import { MatDialog } from '@angular/material';
import { MenuService } from './../../services/menu/menu.service';
import { ZonesService } from './../../services/zones/zones.service';
import { ToastrService } from 'ngx-toastr';
import { DevicesService } from './../../services/devices/devices.service';
import { DrawingService } from './../../services/drawing/drawing.service';
import { DataSocketService } from './../../services/data-socket/data-socket.service';
import { AgmMap, AgmPolygon } from '@agm/core';
import { style, animate, trigger, transition } from '@angular/animations';
import { OnInit, ViewChild, Component, ViewChildren } from '@angular/core';
import { SearchComponent } from 'src/app/components/search/search.component';
declare var google: any;

@Component({
	selector: 		'app-map',
	styleUrls: 		['./map.component.scss'],
	templateUrl: 	'./map.component.html',
	animations: [
    	trigger('inOutAnimation', [
    		transition(':enter', [
            	style({
            		'opacity': 	0
            	}),
            	animate('.25s ease-out', style({
            		'opacity': 1
            	}))
          	]),
	        transition(':leave', [
	            style({
	            	'opacity': 	1
	            }),
	            animate('.25s ease-in', style({
	            	'opacity': 	0
	            }))
	      	])
      	])
  	]
})

export class MapComponent implements OnInit {

	constructor(public menu: MenuService, private dialog: MatDialog, private toast: ToastrService, private socket: DataSocketService, private zonesservice: ZonesService, private devicesservice: DevicesService, private drawing: DrawingService) {};

	@ViewChild('map', {'static': true}) private map: AgmMap;

	public zone: 					any 	= null;
	public zones: 					any[] 	= [];
	public center: 					any 	= {'latitude': 0, 'longitude': 0};
	public device: 					any 	= null;
	public devices: 				any[] 	= [];
	public loading: 				boolean;
	public editing: 				boolean;
	public animating: 				boolean;
	public animation: 				any;
	public historical: 				any[] 	= [];
	public HistoryMode: 			boolean;
	public ZoneSelected: 			boolean;
	public TrackerMarker: 			any 	= {
		'visible': 		false,
		'latitude': 	0,
		'longitude': 	0
	};
	public DeviceSelected: 			boolean;
	public AnimationActive: 		boolean;
	public pointMarkersHidden: 		boolean;
	public HistoryLineEnabled: 		boolean = true;
	public HistoryMarkersEnabled: 	boolean = true;

	public GoogleMap: any;

	public search() {
		const dialog = this.dialog.open(SearchComponent, {
			'panelClass': 'search-dialog'
		});

		dialog.afterClosed().subscribe(result => {
			if (result) {
				this.SelectItem(result.type, result);

				if (result.type == 'zone') {
					let north, south, east, west = null;
					result.points.map(point => {
						if (typeof(south) == "undefined") {
							south = parseFloat(point.latitude);
						};
						if (typeof(north) == "undefined") {
							north = parseFloat(point.latitude);
						};
						if (typeof(east) == "undefined") {
							east = parseFloat(point.longitude);
						};
						if (typeof(west) == "undefined") {
							west = parseFloat(point.longitude);
						};
						if (point.latitude > north) {
							north = parseFloat(point.latitude);
						};
						if (point.latitude < south) {
							south = parseFloat(point.latitude);
						};
						if (point.longitude > west) {
							west = parseFloat(point.longitude);
						};
						if (point.longitude < east) {
							east = parseFloat(point.longitude);
						};
					});
					let map: any = this.map;
					map._updateBounds({
						'east':  east,
						'west':  west,
						'south': south,
						'north': north
					}, 16);
				} else if (result.type == 'device') {
					this.center.latitude 	= result.location.latitude;
					this.center.longitude 	= result.location.longitude;
					this.drawing.SmoothZoomIn(16);
				};
			};
		});
	};

	private calccomms() {
		this.devices.map(device => {
			if (device.connection.status == 1) {
				device.lastcomms = moment(device.connection.last).fromNow();
			};
		});
	};

	public ToggleModes() {
		this.editing = !this.editing;
	};

	public SetIcons(point) {
        if (point.index == 1) {
            return './assets/flag-start.png';
		} else if (point.index == this.historical.length) {
            return './assets/flag-end.png';
        } else {
            return './assets/circle.png';
        };
	};

	public SetDeviceProperties(event) {
		for (let i = 0; i < this.devices.length; i++) {
			if (this.devices[i].deviceId == event.deviceId) {
				if (typeof(event.mapping) != "undefined") {
					if (typeof(event.mapping.icon) != "undefined") {
						this.devices[i].mapping.icon = event.mapping.icon;
						this.devices[i].iconUrl =  {
							'url': this.devices[i].mapping.icon,
							'scaledSize': {
								'width': 	60,
								'height': 	60
							}
						};
					};
				};
				break;
			};
		};
	};

	private async load() {
		this.loading = true;

		const zones = await this.zonesservice.list({});
		
		if (zones.ok) {
			this.zones = zones.result;
			this.zones.map(zone => {
				zone.visible = true;
				zone.points = zone.points.map(point => {
					return {
						'lat': parseFloat(point.latitude),
						'lng': parseFloat(point.longitude)
					};
				});
			});
		};

		const devices = await this.devicesservice.list({
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
			}
		});

		if (devices.ok) {
			this.devices = devices.result;
			this.devices.map(device => {
				device.visible = true;
				if (typeof(device.mapping.icon) != "undefined") {
					device.iconUrl = {
						'url':         device.mapping.icon,
						'scaledSize': {
							'width': 	60,
							'height': 	60
						}
					};
				} else {
					device.iconUrl = {
						'icon':         google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
						'scale':        5,
						'rotation':     0,
						'fillColor':    '#F44336',
						'fillOpacity':  1,
						'strokeColor':  '#F44336',
						'strokeWeight': 1
					};
				};
				device.inputs.map(input => {
					if (input.type == "analog") { 
						input.value = parseInt(input.value);
					} else if (input.type == "digital") {
						if (input.value == 0) { 
							input.value = input.low;
						} else if (input.value == 1) {
							input.value = input.high;
						} else {
							input.value = '-';
						};
					};
				});
			});
			this.calccomms();
			this.SetMapBounds();
		};

		this.loading = false;
	};

	private async SetMapBounds() {
        let minLatitude:     number;
        let maxLatitude:     number;
        let minLongitude:     number;
        let maxLongitude:     number;

        this.devices.map(device => {
            if (typeof(device.location) != "undefined") {
                if (typeof(minLatitude) == "undefined") {
                    minLatitude = parseFloat(device.location.latitude);
                };
                if (typeof(maxLatitude) == "undefined") {
                    maxLatitude = parseFloat(device.location.latitude);
                };
                if (typeof(minLongitude) == "undefined") {
                    minLongitude = parseFloat(device.location.longitude);
                };
                if (typeof(maxLongitude) == "undefined") {
                    maxLongitude = parseFloat(device.location.longitude);
                };
                if (device.location.latitude > maxLatitude) {
                    maxLatitude = parseFloat(device.location.latitude);
                };
                if (device.location.latitude < minLatitude) {
                    minLatitude = parseFloat(device.location.latitude);
                };
                if (device.location.longitude > maxLongitude) {
                    maxLongitude = parseFloat(device.location.longitude);
                };
                if (device.location.longitude < minLongitude) {
                    minLongitude = parseFloat(device.location.longitude);
                };
            };
        });
		let map: any = this.map;
        map._updateBounds({
            'east':  minLongitude,
            'west':  maxLongitude,
            'south': minLatitude,
            'north': maxLatitude
        }, 15);
    };

    public GetPointThatCanShow() {
        let historical = [];

        if (this.pointMarkersHidden) {
            if (this.historical.length > 0) {
                historical.push(this.historical[0]);
                if (this.historical.length > 1) {
                    historical.push(this.historical[this.historical.length - 1]);
                };
            };
        } else {
            historical = this.historical;
        };

        return historical;
    };

    public async cancelhistory() {
		if (this.animation) {
			this.animation.stop();
		};
    	this.editing 		= false;
    	this.HistoryMode 	= false;
    	this.ZoneSelected	= false;
		this.DeviceSelected	= true;

		this.devices.map(device => {
			device.visible = true;
		});

		this.historical = [];

		this.SetMapBounds();
    };

    public async enablehistory(data) {
    	this.editing 		= false;
    	this.HistoryMode 	= true;
    	this.ZoneSelected	= false;
		this.DeviceSelected	= false;

		this.devices.map(device => {
			device.visible = false;
		});

		this.historical = data.filter(point => {
		    if (typeof(point.location) != "undefined") {
		        return point;
		    };
		});
		let index = 1;
		this.historical.map(point => {
		    point.index  = JSON.stringify(index);
		    index++
		});

		let minLatitude:     number;
        let maxLatitude:     number;
        let minLongitude:     number;
        let maxLongitude:     number;

        this.historical.map(point => {
            if (typeof(point.location) != "undefined") {
                if (typeof(minLatitude) == "undefined") {
                    minLatitude = parseFloat(point.location.latitude);
                };
                if (typeof(maxLatitude) == "undefined") {
                    maxLatitude = parseFloat(point.location.latitude);
                };
                if (typeof(minLongitude) == "undefined") {
                    minLongitude = parseFloat(point.location.longitude);
                };
                if (typeof(maxLongitude) == "undefined") {
                    maxLongitude = parseFloat(point.location.longitude);
                };
                if (point.location.latitude > maxLatitude) {
                    maxLatitude = parseFloat(point.location.latitude);
                };
                if (point.location.latitude < minLatitude) {
                    minLatitude = parseFloat(point.location.latitude);
                };
                if (point.location.longitude > maxLongitude) {
                    maxLongitude = parseFloat(point.location.longitude);
                };
                if (point.location.longitude < minLongitude) {
                    minLongitude = parseFloat(point.location.longitude);
                };
            };
        });
		let map: any = this.map;
        map._updateBounds({
            'east':  minLongitude,
            'west':  maxLongitude,
            'south': minLatitude,
            'north': maxLatitude
        }, 15);
    };

    private heading(current, latest) {
        let direction: number =  google.maps.geometry.spherical.computeHeading(new google.maps.LatLng(current.latitude, current.longitude), new google.maps.LatLng(latest.latitude, latest.longitude));
        
        if (direction < 0) { 
            direction += 360;
        };
        
        return direction;
    };

	public async ZoneDragEnd(event, zone) {
		zone.dragEnd = {
			'lat': event.latLng.lat(),
			'lng': event.latLng.lng()
		};
		let change = {
			'lat': zone.dragStart.lat - zone.dragEnd.lat,
			'lng': zone.dragStart.lng - zone.dragEnd.lng
		};
		for (var i = this.zones.length - 1; i >= 0; i--) {
			if (this.zones[i].zoneId == zone.zoneId) {
				let points = [];
				
				this.zones[i].points.map(point => {
					points.push({
						'lat': point.lat - change.lat,
						'lng': point.lng - change.lng
					});
				});
				const response = await this.zonesservice.update({
					'zoneId': zone.zoneId,
					'points': points.map(point => {
						return {
							'latitude': 	point.lat,
							'longitude': 	point.lng
						};
					})
				});
				break;
			};
		};
	};

	public async ZoneDragStart(event, zone) {
		for (var i = this.zones.length - 1; i >= 0; i--) {
			if (this.zones[i].zoneId == zone.zoneId) {
				this.zones[i].dragStart = {
					'lat': event.latLng.lat(),
					'lng': event.latLng.lng()
				};
				break;
			};
		};
	};

	public async ZonePathsChange(event, zone) {
		let points 		= event.newArr[0];
		const response 	= await this.zonesservice.update({
			'zoneId': zone.zoneId,
			'points': points.map(point => {
				return {
					'latitude': 	point.lat,
					'longitude': 	point.lng
				};
			})
		});
	};

	public animate(enabled: boolean) {
		if (enabled) {
			if (!this.AnimationActive) {
				this.animating = true;
				let coords = this.historical.map(point => {
					return {
						'lat': point.location.latitude, 
						'lng': point.location.longitude
					};
				});
	
				let marker = new google.maps.Marker({
					'icon': {
						'path':         google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
						'scale':        5,
						'rotation':     0,
						'fillColor':    '#F44336',
						'fillOpacity':  1,
						'strokeColor':  '#F44336',
						'strokeWeight': 1
					},
					'map': 		this.GoogleMap,
					'position': new google.maps.LatLng(coords[0].lat, coords[0].lng)
				});
	
				this.animation = new Animation(marker, coords, {
					'speed': 5000
				}, (res) => {
					if (res.running) {
						this.AnimationActive = true;
					} else {
						this.animating 			= false;
						marker.setMap(null);
						this.AnimationActive 	= false;
					};
				});
			
				this.animation.start();
			} else {
				this.animating = false;
				this.animation.restart();
			};
		} else {
			if (this.AnimationActive) {
				this.animating = false;
				this.animation.pause();
			};
		};
	};

	public SelectItem(type: string, props: any) {
		if (type == 'zone') { 
			this.zone 			= props;
			this.device 		= null;
			this.ZoneSelected 	= true;
			this.DeviceSelected = false;
		} else {
			this.zone 			= null;
			this.device 		= props;
			this.ZoneSelected 	= false;
			this.DeviceSelected = true;
		};
	};

	public ToggleHistoryLines(enabled: boolean) {
		this.HistoryLineEnabled = enabled;
	};

	public ToggleHistoryPoints(enabled: boolean) {
		this.HistoryMarkersEnabled = enabled;
	};

	ngOnInit() {
		this.load();

		setInterval(() => this.calccomms(), 1000);
		
		this.map.zoom 				= 4;
		this.map.fitBoundsPadding 	= 10;
		this.map.mapReady.subscribe(map => {
			this.GoogleMap = map;

			this.drawing.init(map, ["polygon"]);
		});

		this.map.mapClick.subscribe(event => {
			if (!this.HistoryMode) {
				this.zone 			= null;
				this.device 		= null;
				this.ZoneSelected 	= false;
				this.DeviceSelected = false;
			};
		});

		this.socket.data.subscribe(result => {
            for (var i = this.devices.length - 1; i >= 0; i--) {
                if (this.devices[i].deviceId == result.deviceId) {
                    this.devices[i].date = new Date(result.date);
                    this.devices[i].inputs.map(input => {
                        result.data.map(item => {
                            if (input.inputId == item.inputId) {
                                if (input.type == "analog") {
                                    input.value = parseInt(item.value);
                                } else if (input.type == "digital") {
                                    input.value = item.value;
                                };
                            };
                        });
                    });

                    if (typeof(result.location) != "undefined") {
                        this.devices[i].iconUrl.rotation   = this.heading(this.devices[i].location, result.location);
                        this.devices[i].iconUrl            = JSON.parse(JSON.stringify(this.devices[i].iconUrl));
                        this.devices[i].location.latitude  = result.location.latitude;
                        this.devices[i].location.longitude = result.location.longitude;
                    };
                    break;
                };
            };
        });

        this.drawing.changes.subscribe(change => {
        	switch (change.type) {
        		case("add"):
    				this.loading = true;
        			break;
        		default:
        			break;
        	};
        });

        this.zonesservice.changes.subscribe(change => {
        	switch (change.type) {
        		case("add"):
        			change.data.points = change.data.points.map(point => {
						return {
							'lat': point.latitude,
							'lng': point.longitude
						};
					})

        			this.zones.push(change.data);

    				this.loading = false;

    				this.toast.success('Zone was added!');
        			break;

        		case("delete"):
        			for (var i = this.zones.length - 1; i >= 0; i--) {
        				if (this.zones[i].zoneId == change.data.zoneId) {
        					this.zones.splice(i, 1);
        					break;
        				};
        			};
        			break;
        		default:
        			break;
        	};
        });

        this.devicesservice.changes.subscribe(change => {
        	switch (change.type) {
        		case("history"):
	        		if (change.data.ok) {
	        			this.enablehistory(change.data.result);
			        } else {
			        	this.toast.info('There was an issue getting your devices data!');
					};
        			break;
        	};
        });
	};
}