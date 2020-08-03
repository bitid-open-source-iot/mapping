import { DrawingService } from './../../../services/drawing/drawing.service';
import { Input, OnInit, Component, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 		'app-drawing-mode',
	styleUrls: 		['./drawing-mode.component.scss'],
	templateUrl: 	'./drawing-mode.component.html'
})

export class DrawingModeComponent implements OnInit, OnChanges {

	constructor(private drawing: DrawingService) {};
	
	@Input('editing') public editing: boolean;

	public mode: string;

	public change(event) {
		this.drawing.SetMode(event.value);
	};

	ngOnInit() {
		this.drawing.mode.subscribe(mode => {
			if (mode) {
				this.mode = mode;
			};
		});
	};

	ngOnChanges(changes: SimpleChanges) {
		if (changes.editing) {
			if (typeof(changes.editing.currentValue) != "undefined") {
				if (!changes.editing.currentValue) { 
					this.drawing.SetMode('hand');
				};
			};
		};
	};
};