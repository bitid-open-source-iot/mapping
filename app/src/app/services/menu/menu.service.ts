import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LocalstorageService } from './../localstorage/localstorage.service';

@Injectable({
    providedIn: 'root'
})

export class MenuService {

    constructor(private localstorage: LocalstorageService) {};

    public menu:   MatSidenav;
    public opened:  boolean;
    public change: Subject<string> = new Subject();

    public init(menu) {
        this.menu   = menu;
        this.opened = JSON.parse(this.localstorage.get('menu'));
        if (this.opened) {
            this.menu.open();
        };
    };

    public close() {
        this.menu.close();
        this.opened = false;
        this.localstorage.set('menu', false);
    };

    public toggle() {
        this.menu.toggle();
        if (this.menu.opened) {
            this.opened = true;
            this.localstorage.set('menu', true);
        } else {
            this.opened = false;
            this.localstorage.set('menu', false);
        };
    };

    public default() {
        this.localstorage.set('menu', true);
        if (!this.menu.opened) { 
            this.menu.open();
            this.opened = true;
        };
    };

}