import { OnInit, Inject, Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 		'app-table-view',
	styleUrls: 		['./table-view.component.scss'],
	templateUrl: 	'./table-view.component.html'
})

export class TableViewComponent implements OnInit {

	constructor(private dialog: MatDialogRef<TableViewComponent>, @Inject(MAT_DIALOG_DATA) private params: any[]) {};

	public data: any[] = [];

	public close() {
		this.dialog.close();
	};

	ngOnInit() {
		let index 	= 0;
		this.data 	= this.params.map(row => {
			index++;
			return {
				'date': 		new Date(row.deviceDate),
				'order': 		index,
				'inputs': 		row.inputs,
				'latitude': 	row.location.latitude,
				'longitude': 	row.location.longitude,
			};
		});
	};
}