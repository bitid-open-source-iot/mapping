import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { AuthService } from './services/auth/auth.service';
import { MenuService } from './services/menu/menu.service';
import { environment } from './../environments/environment';
import { TranslateService } from '@bitid/translate';
import { DataSocketService } from './services/data-socket/data-socket.service';
import { User, AccountService } from '@bitid/account';
import { OnInit, ViewChild, Component } from '@angular/core';

@Component({
	selector: 		'app-root',
	styleUrls: 		['./app.component.scss'],
	templateUrl: 	'./app.component.html'
})

export class AppComponent implements OnInit {

	constructor(public menu: MenuService, private auth: AuthService, private account: AccountService, private translate: TranslateService, private socket: DataSocketService, private router: Router) {
		this.account.user.subscribe(async (user: User) => {
			if (typeof(user.language) != "undefined" && user.language != null) {
				this.translate.language.next(user.language);
			};
		});
		
		this.account.get();
	};

	public mode: string;

	@ViewChild('sidemenu', {'static': true}) private sidemenu: MatSidenav;

	public logout() {
    	this.menu.close();
		this.auth.logout();
		this.router.navigate(['/login']);
	};

    ngOnInit() {
        this.menu.change.subscribe((mode: string) => {
        	this.mode = mode;
        });
        
        this.menu.init(this.sidemenu);

		this.socket.connect(environment.websocket, true);
    };
}