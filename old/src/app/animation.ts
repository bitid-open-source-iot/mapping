declare const google: any;

export class Animation {

    private delay:      number      = 10;
    private speed:      number      = DEFAULT_OPTIONS.speed;
    private state:      string      = 'stopped';
    private target:     number      = 0;
    private points:     Location[]  = [];
    private marker:     any         = null;
    private complete:   Function;

    constructor(marker, points, options, complete) {
        this.points     = points;
        this.marker     = marker;
        this.complete   = complete;

        if (typeof(options) != "undefined" && typeof(options) == "object") {
            if (typeof(options.speed) != "undefined") {
                this.speed = options.speed;
            };
        };
    };

    public stop() {
        this.complete({
            'running': false
        });

        this.state  = 'stopped';
        this.target = 1;
    };

    public start() {
        this.complete({
            'running': true
        });

        this.state  = 'running';
        this.target = 1;

        this.goToPoint();
    };

    public pause() {
        this.state  = 'stopped';
    };

    public restart() {
        this.complete({
            'running': true
        });

        this.state  = 'running';

        this.goToPoint();
    };
        
    public goToPoint() {
        if (this.state == 'running') {
            let lat         = this.marker.position.lat();
            let lng         = this.marker.position.lng();
            let curr        = new google.maps.LatLng(lat, lng);
            let step        = (this.speed * 1000 * this.delay) / 3600000; // in meters
            let dest        = new google.maps.LatLng(this.points[this.target].lat, this.points[this.target].lng);
            let heading     = google.maps.geometry.spherical.computeHeading(curr, dest);
            let distance    = google.maps.geometry.spherical.computeDistanceBetween(dest, this.marker.position); // in meters
            let numStep     = distance / step;
            let i           = 0;
            let deltaLat    = (this.points[this.target].lat - lat) / numStep;
            let deltaLng    = (this.points[this.target].lng - lng) / numStep;

            if (heading < 0) { 
                heading += 360;
            };

            this.marker.setIcon({
                'path':         google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                'scale':        5,
                'rotation':     heading,
                'fillColor':    '#F44336',
                'fillOpacity':  1,
                'strokeColor':  '#F44336',
                'strokeWeight': 1
            });
            
            this.moveMarker(lat, deltaLat, lng, deltaLng, i, step, distance, dest);
        };
    };

    public moveMarker(lat, deltaLat, lng, deltaLng, i, step, distance, dest) {
        if (this.state == 'running') {
            lat += deltaLat;
            lng += deltaLng;
            i   += step;

            if (i < distance) {
                this.marker.setPosition(new google.maps.LatLng(lat, lng));
                setTimeout(() => this.moveMarker(lat, deltaLat, lng, deltaLng, i, step, distance, dest), this.delay);
            } else {
                this.marker.setPosition(dest);
                this.target++;
                
                if (this.target == this.points.length) {
                    this.target = 0;
                    this.complete({
                        'running': false
                    });
                    this.state = 'stopped';
                    return;
                };
                
                setTimeout(() => this.goToPoint(), this.delay);
            };
        };
    };
}

export const DEFAULT_OPTIONS = {
    'speed': 50
};

export interface Options {
    'speed'?: number;
}

interface Location {
    'lat':   number;
    'lng':  number;
}