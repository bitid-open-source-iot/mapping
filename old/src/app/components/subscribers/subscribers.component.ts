import { environment } from '../../../environments/environment';
import { LocalstorageService } from './../../services/localstorage/localstorage.service';
import { OnInit, Inject, ViewChild, Component } from '@angular/core';
import { MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'subscribers',
    templateUrl: './subscribers.component.html',
    styleUrls: ['./subscribers.component.scss']
})

export class SubscribersComponent implements OnInit {
    
    constructor(private dialog: MatDialogRef<SubscribersComponent>, @Inject(MAT_DIALOG_DATA) private data: SubscribersParams, private localstorage: LocalstorageService) {}
    
    public type:                  any    = this.data.type;
    public role:                  number;
    public roles:                 any[]  = environment.roles;
    public email:                 string = '';
    public loading:               boolean;
    public service:               any    = this.data.service;
    public description:           string;
    public displayedColumns:      any[]  = ['email', 'role', 'options'];
    public subscribersDataSource: any    = new MatTableDataSource();
    
    @ViewChild(MatSort, {
        'static': false
    }) sort:  MatSort;
    
    public close() {
        this.dialog.close();
    };
    
    private async get() {
        this.loading = true;

        let params: any = {};

        if (this.type == 'zone') {
            params.filter = [
                'role',
                'users',
                'zoneId',
                'description'
            ];
            params.zoneId = this.data.id;
        };

        if (this.type == 'device') {
            params.filter = [
                'role',
                'users',
                'deviceId',
                'description'
            ];
            params.deviceId = this.data.id;
        };

        const response = await this.service.get(params);
      
        this.loading = false;

        if (response.ok) { 
            if (response.result.role < 4) {
                this.close();
            } else {
                this.role                       = response.result.role;
                this.description                = response.result.description;
                this.subscribersDataSource.data = response.result.users;
            };
        } else {
            this.close();
        };
    };

    public async remove(params) {
        this.loading = true;

        if (this.type == 'zone') {
            params.zoneId = this.data.id;
        };

        if (this.type == 'device') {
            params.deviceId = this.data.id;
        };

        const response = await this.service.unsubscribe(params);
      
        this.loading = false;

        if (response.ok) { 
            for (var i = 0; i < this.subscribersDataSource.data.length; ++i) {
                if (this.subscribersDataSource.data[i].email == params.email) {
                    this.subscribersDataSource.data.splice(i, 1);
                    break;
                };
            };
            this.subscribersDataSource.data = JSON.parse(JSON.stringify(this.subscribersDataSource.data));
        };
    };

    public async updatesubscriber(role, email) {
        this.loading = true;

        let params: any = {
            'role':  role,
            'email': email
        };

        if (this.type == 'zone') {
            params.zoneId = this.data.id;
        };

        if (this.type == 'device') {
            params.deviceId = this.data.id;
        };

        const response = await this.service.updatesubscriber(params);
      
        this.loading = false;
    };

    public editing(user) {
        let allowed: boolean = true;

        if (this.role < 4) {
            allowed = false;
        };

        if (user.role >= this.role) {
            allowed = false;
        };

        if (user.email >= this.email) {
            allowed = false;
        };

        return allowed;
    };

    ngOnInit() {
        this.email = this.localstorage.get('email');
        this.get();
    };
}

interface SubscribersParams {
    'id':      string;
    'type':    string;
    'service': any;
}