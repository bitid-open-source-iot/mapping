import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { MenuService } from './../../services/menu/menu.service';
import { AuthService } from './../../services/auth/auth.service';
import { MatBottomSheet } from '@angular/material';
import { BrandingService } from '@bitid/branding';
import { OptionsSheetComponent } from './../../components/options-sheet/options-sheet.component';
import { OnInit, Component, HostListener } from '@angular/core';

@Component({
	selector: 		'app-home',
	styleUrls: 		['./home.component.scss'],
	templateUrl: 	'./home.component.html'
})

export class HomeComponent implements OnInit {

	constructor(private sheet: MatBottomSheet, private router: Router, private service: AuthService, private menu: MenuService, private branding: BrandingService) {};

	@HostListener('window:resize', ['$event']) resize(event) {
		this.setColumns();
	};

	public cols: 	number 	= 0;
	public brand: 	any 	= {};
	public pages: 	any[] 	= [
		{
			'role': 	0,
			'icon': 	'map',
			'path': 	'/map',
			'type': 	'route',
			'title': 	'App',
			'scope': 	0
		},
		{
			'role': 	0,
			'icon': 	'store',
			'path': 	'https://shop.bitid.co.za',
			'type': 	'external',
			'title': 	'Store',
			'scope': 	0
		},
		{
			'role': 	0,
			'icon': 	'exit_to_app',
			'path': 	'/login',
			'type': 	'route',
			'title': 	'Sign In',
			'scope': 	0
		},
		{
			'role': 	0,
			'icon': 	'assignment_ind',
			'path': 	'/register',
			'type': 	'route',
			'title': 	'Sign Up',
			'scope': 	0
		}
	];
	public application: 	string 	= environment.appName;
	public authenticated: 	boolean;

	public go(page) {
		switch(page.type) {
			case("route"):
				this.router.navigate([page.path]);
				break;
			case("external"):
				window.open(page.path, '_parent');
				break;
		};
	};

	public link(url) {
		window.open(url, '_blank');
	};

	public open() {
		this.sheet.open(OptionsSheetComponent, {
			'data': {
				'items': 		this.pages,
				'description': 	'Navigate'
			}
		}).afterDismissed().subscribe((option) => {
            if (option) {
            	for (var i = this.pages.length - 1; i >= 0; i--) {
            		if (this.pages[i].path == option.path) {
            			this.go(this.pages[i]);
	            		break;
            		};
            	};
            };
        });
	};

	private setColumns() {
		if (window.innerWidth <= 600) { 
			this.cols = 1;
		} else if (window.innerWidth <= 900) { 
			this.cols = 2;
		} else  {
			this.cols = 3;
		};
	};

	ngOnInit() {
		this.menu.close();
		this.setColumns();

		this.branding.branding.subscribe((brand: any) => {
			this.brand = brand;
		});
	};
}