import { Router } from '@angular/router';
import { OnInit, Component } from '@angular/core';

@Component({
	selector: 		'app-not-found',
	styleUrls: 		['./not-found.component.scss'],
	templateUrl: 	'./not-found.component.html'
})

export class NotFoundComponent implements OnInit {

	constructor(private router: Router) {};
	
	ngOnInit() {
		this.router.navigate(['/map']);
	};
}