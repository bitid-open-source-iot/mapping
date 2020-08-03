import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable()

export class NotificationsService {

    constructor(private api: ApiService) {};

    public async list(params) {
        return await this.api.post(environment.alerting, '/alerting/alerts/historical', params);
    };
}