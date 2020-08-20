import { MatSidenav } from '@angular/material/sidenav';
import { MenuService } from './services/menu/menu.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SplashScreen } from './splashscreen/splashscreen.component';
import { AccountService } from './services/account/account.service';
import { HistoryService } from './services/history/history.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DataSocketService } from './services/data-socket/data-socket.service';
import { OnInit, Component, ViewChild } from '@angular/core';

@Component({
    selector:       'app-root',
    styleUrls:      ['./app.component.scss'],
    templateUrl:    './app.component.html'
})

export class AppComponent implements OnInit {

    @ViewChild(MatSidenav, {'static': true})    private sidenav:        MatSidenav;
    @ViewChild(SplashScreen, {'static': true})  private splashscreen:   SplashScreen;

    constructor(public menu: MenuService, private socket: DataSocketService, private history: HistoryService, private account: AccountService, private sanitizer: DomSanitizer, private registry: MatIconRegistry) {
        this.registry.addSvgIcon('edit', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/edit.svg'));
        this.registry.addSvgIcon('drag', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/drag.svg'));
        this.registry.addSvgIcon('close', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/close.svg'));
        this.registry.addSvgIcon('signal', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/signal.svg'));
        this.registry.addSvgIcon('search', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/search.svg'));
        this.registry.addSvgIcon('history', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/history.svg'));
        this.registry.addSvgIcon('battery', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/battery.svg'));
        this.registry.addSvgIcon('zoom-in', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/zoom-in.svg'));
        this.registry.addSvgIcon('zoom-out', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/zoom-out.svg'));
        this.registry.addSvgIcon('draw-rect', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/draw-rect.svg'));
        this.registry.addSvgIcon('draw-poly', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/draw-poly.svg'));
        this.registry.addSvgIcon('draw-circle', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/draw-circle.svg'));
    };

    public user:            any = {};
    public language:        string;
    public authenticated:   boolean;

    public logout() {
        this.menu.close();
        this.account.logout();
    };
    
    private async initialize() {
        await this.splashscreen.show();

        await this.history.init();
        await this.menu.init(this.sidenav);
        await this.account.validate();

        await this.splashscreen.hide();
    };

    ngOnInit() : void {
        this.account.user.subscribe(async user => {
            if (user) {
                this.user = user;
            };
        });

        this.account.authenticated.subscribe(async authenticated => {
            this.authenticated = authenticated;
            if (authenticated) {
                await this.account.load();
                await this.socket.connect();
            };
        });

        this.initialize();
    };
    
}