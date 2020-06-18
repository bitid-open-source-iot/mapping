import { OnInit, Input, Component } from '@angular/core';

@Component({
	selector: 		'app-section-seporator',
	styleUrls: 		['./section-seporator.component.scss'],
	templateUrl: 	'./section-seporator.component.html'
})

export class SectionSeporatorComponent implements OnInit {

	constructor() {};
	
	@Input('icon') public icon;

	ngOnInit() {};
}