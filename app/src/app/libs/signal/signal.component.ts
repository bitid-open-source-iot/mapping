import { Input, Component, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector:       'signal',
    styleUrls:      ['./signal.component.scss'],
    templateUrl:    './signal.component.html'
})

export class SignalComponent implements OnChanges {

    @Input('strength') public strength:    number  = 0;
    
    public stage: string = '';

    constructor() {};

    ngOnChanges(changes: SimpleChanges): void {
        if (typeof(changes.strength) != "undefined") {
            if (this.strength >= 0 && this.strength <= 20) {
                this.stage = 'low';
            } else if (this.strength > 20 && this.strength <= 40) {
                this.stage = 'medium-low';
            } else if (this.strength > 40 && this.strength <= 60) {
                this.stage = 'medium';
            } else if (this.strength > 60 && this.strength <= 80) {
                this.stage = 'medium-high';
            } else if (this.strength > 80 && this.strength <= 100) {
                this.stage = 'high';
            };
        };
    };

}