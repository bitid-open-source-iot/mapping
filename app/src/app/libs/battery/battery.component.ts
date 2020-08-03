import { Input, Component, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 		'battery',
	styleUrls: 		['./battery.component.scss'],
	templateUrl: 	'./battery.component.html'
})

export class BatteryComponent implements OnChanges {

    @Input('level') public level: number  = 0;
    
    public stage: string = '';

    constructor() {};

    ngOnChanges(changes: SimpleChanges): void {
        if (typeof(changes.level) != "undefined") {
            if (this.level >= 0 && this.level <= 25) {
                this.stage = 'low';
            } else if (this.level > 25 && this.level <= 50) {
                this.stage = 'medium-low';
            } else if (this.level > 50 && this.level <= 75) {
                this.stage = 'medium-high';
            } else if (this.level > 75 && this.level <= 100) {
                this.stage = 'high';
            };
        };
    };

}