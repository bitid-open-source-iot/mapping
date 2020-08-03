import { Injectable } from '@angular/core';
import { Zone, ZonesService } from './../../services/zones/zones.service';
import { Subject, BehaviorSubject } from 'rxjs';
declare const google: any;

@Injectable({
	providedIn: 'root'
})

export class DrawingService {

	constructor(private zonesservice: ZonesService) {};

	public mode: 		BehaviorSubject<string> = new BehaviorSubject("hand");
	public changes: 	Subject<DrawingChanges> = new Subject();
	
	private map: 		any;
	private manager: 	any;

	public init(map: any, modes: string[]) {
		this.map = map;
		const options = {
			'drawingControl': false,
			'drawingControlOptions': {
				'drawingModes': modes
			},
			'circleOptions': {
                'editable':     true,
                'draggable':    true,
                'fillColor':    '#3F51B5',
                'fillOpacity':  0.7,
                'strokeWeight': 0.5
            },
			'polygonOptions': {
                'editable':     true,
                'draggable':    true,
                'fillColor':    '#3F51B5',
                'fillOpacity':  0.7,
                'strokeWeight': 0.5
            },
			'drawingMode': null
		};

		this.manager = new google.maps.drawing.DrawingManager(options);
		this.manager.setMap(map);

		google.maps.event.addListener(this.manager, 'polygoncomplete', (poly) => {


            this.SetMode('hand');
            
            let path        = poly.getPath();
            let coordinates = [];

            for (let i = 0; i < path.length; i++) {
                coordinates.push({
                    'latitude': 	path.getAt(i).lat(),
                    'longitude': 	path.getAt(i).lng()
                });
            };

            poly.setMap(null);

            let zone = {
                'points':           coordinates,
                'description':      'New Zone - ' + new Date(),
                'organizationOnly': 0
            };
            
            this.changes.next({
				'type': 'add',
				'data': zone
			});

            this.zonesservice.add(zone);
        });
	};

	public SetMode(mode: string) {
		switch(mode) {
			case("hand"):
				this.manager.setDrawingMode(null);
				break;
			case("circle"):
				this.manager.setDrawingMode(google.maps.drawing.OverlayType.CIRCLE);
				break;
			case("polygon"):
				this.manager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
				break;
		};
		this.mode.next(mode);
	};

	public SmoothZoomIn(max: number) {
		this.map.setZoom(max);
	};
}

interface DrawingChanges {
	'type': string;
	'data': any;
}