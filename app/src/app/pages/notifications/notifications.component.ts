import { MenuService } from '../../services/menu/menu.service';
import { OnInit, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { NotificationsService } from '../../services/notifications/notifications.service';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})

export class NotificationsComponent implements OnInit {

    constructor(public menu: MenuService, private service: NotificationsService) {};

    public loading:          boolean  = false;
    public dataSource:       any      = new MatTableDataSource();
    public displayedColumns: string[] = ['title', 'message', 'serverDate'];

    private async list() {
        this.loading = true;

        const response = await this.service.list({
            'sort': {
                'serverDate': -1
            },
            'appId': [
                '000000000000000000000007',
                '000000000000000000000014'
            ],
            'filter': [
                'appId',
                'title',
                'message',
                'senderId',
                'serverDate'
            ],
            'limit': 100
        });
        
        this.loading = false;

        if (response.ok) { 
            this.dataSource.data = response.result;
        } else {
            this.dataSource.data = [];
        };
    };
    
    ngOnInit() {
        this.list();
    };
}
