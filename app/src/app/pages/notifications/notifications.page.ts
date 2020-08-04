import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/menu/menu.service';
import { SearchComponent } from 'src/app/libs/search/search.component';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterNotificationsDialog } from './filter/filter.dialog';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector:       'app-notifications',
    styleUrls:      ['./notifications.page.scss'],
    templateUrl:    './notifications.page.html',
})

export class NotificationsPage implements OnInit, OnDestroy {

    @ViewChild(SearchComponent, {'static': true}) private search: SearchComponent;

    constructor(public menu: MenuService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private service: NotificationsService) {};
    
    public sort:            any     = {
        'key':      'date',
        'reverse':  true
    };
    public limit:           number  = 500;
    public filter:          string  = '';
    public loading:         boolean;
    public notifications:   any[]   = [];
    private subscriptions:  any     = {};

    private async list() {
        this.loading = true;

        const response = await this.service.list({
            'filter': [
                'date',
                'title',
                'message'
            ],
            'appId': [
                '000000000000000000000002',
                '000000000000000000000014'
            ],
            'sort': {
                [this.sort.key]: (this.sort.reverse ? -1 : 1)
            },
            'limit': this.limit
        });

        this.loading = false;

        if (response.ok) {
            this.notifications = response.result;
        };
    };

    public async OpenFilter() {
        const dialog = await this.dialog.open(FilterNotificationsDialog, {
            'data': {
                'sort':     this.sort,
                'limit':    this.limit
            },
            'panelClass': 'filter-dialog'
        });
        
        await dialog.afterClosed().subscribe(async result => {
            if (result) {
                this.sort   = result.sort;
                this.limit  = result.limit;
                this.list();
            };
        });
    };

    ngOnInit(): void {
        this.subscriptions.params = this.route.queryParams.subscribe(params => {
            if (typeof(params.search) != "undefined" && params.search !== null && params.search !== '') {
                this.filter = params.search;
            };
        });

        this.subscriptions.search = this.search.change.subscribe(value => {
            this.filter = value;
            if (typeof(value) != "undefined" && value !== null && value !== '') {
                this.router.navigate(['/notifications'], {
                    'queryParams': {
                        'search': value
                    }
                });
            } else {
                this.router.navigate(['/notifications'], {
                    'queryParams': {}
                });
            };
        });

        this.list();
    };

    ngOnDestroy(): void {
        this.subscriptions.params.unsubscribe();
        this.subscriptions.search.unsubscribe();
    };

}