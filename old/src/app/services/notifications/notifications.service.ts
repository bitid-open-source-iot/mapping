import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';

@Injectable()

export class NotificationsService {

    constructor(private api: ApiService) {};

    public async list(params) {
        return await this.api.post(environment.alerting, '/alerting/alerts/historical', params);
    };
}