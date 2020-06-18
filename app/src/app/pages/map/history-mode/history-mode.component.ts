import { MatDialog } from '@angular/material';
import { TableViewComponent } from './table-view/table-view.component';
import { Input, Output, OnChanges, Component, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
	selector: 		'app-history-mode',
	styleUrls: 		['./history-mode.component.scss'],
	templateUrl: 	'./history-mode.component.html'
})

export class HistoryModeComponent implements OnChanges {

	@Input('options') 		public options: 	any = {
		'lines': 		true,
		'points': 		true
	};;
	@Input('data') 			public data: 		any[];
	@Input('animating') 	public animating: 	boolean = false;
	@Input('description') 	public description: string;

	@Output('close') 		private dismiss = new EventEmitter();
	@Output('lines') 		private lines 	= new EventEmitter();
	@Output('points') 		private points 	= new EventEmitter();
	@Output('animate') 		private animate = new EventEmitter();

	constructor(private dialog: MatDialog) {};

	public close() {
		this.dismiss.emit();
	};

	public animation() {
		this.animating = !this.animating;
		this.animate.emit(this.animating);
	};

	public OpenTable() {
		this.dialog.open(TableViewComponent, {
			'data': 		this.data,
			'panelClass': 	'full-screen-dialog'
		});
	};

	public ToggleLines() {
		this.options.lines = !this.options.lines;
		this.lines.emit(this.options.lines);
	};

	public TogglePoints() {
		this.options.points = !this.options.points;
		this.points.emit(this.options.points);
	};

	ngOnChanges(changes: SimpleChanges) {
		if (changes.animating) {
			this.options.animation = changes.animating.currentValue;
		};
	};
}