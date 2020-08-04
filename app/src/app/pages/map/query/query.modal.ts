import * as moment from 'moment';
import { Device } from 'src/app/interfaces/device';
import { ToastService } from 'src/app/services/toast/toast.service';
import { DevicesService } from 'src/app/services/devices/devices.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit, Inject, Component, OnDestroy } from '@angular/core';

@Component({
    selector:       'app-query-modal',
    styleUrls:      ['./query.modal.scss'],
    templateUrl:    './query.modal.html'
})

export class QueryModal implements OnInit, OnDestroy {

    constructor(private dialog: MatDialogRef<QueryModal>, @Inject(MAT_DIALOG_DATA) public query: any, private toast: ToastService, private service: DevicesService, private formerror: FormErrorService) {};

    public form:            FormGroup = new FormGroup({
        'to':       new FormControl(moment().format('YYYY-MM-DD'), [Validators.required]),
        'from':     new FormControl(moment().format('YYYY-MM-DD'), [Validators.required]),
        'deviceId': new FormControl(null, [Validators.required])
    });
    public errors:          any     = {
        'to':       '',
        'from':     '',
        'deviceId': ''
    };
    public devices:         Device[] = [];
    public loading:         boolean;
    private subscriptions:  any     = {};

    public close() {
        this.dialog.close(false);
    };
    
    public submit() {
        this.form.value.to = new Date(this.form.value.to);
        this.form.value.to.setHours(23);
        this.form.value.to.setMinutes(59);
        this.form.value.to.setMilliseconds(59);
        this.form.value.from = new Date(this.form.value.from);
        this.form.value.from.setHours(0);
        this.form.value.from.setMinutes(0);
        this.form.value.from.setMilliseconds(0);
        this.dialog.close({
            'to':       this.form.value.to,
            'from':     this.form.value.from,
            'deviceId': this.form.value.deviceId
        });
    };

    private async list() {
        this.loading = true;

        const response = await this.service.list({
            'filter': [
                'deviceId',
                'description'
            ],
            'location': {
                'enabled': true
            }
        }, true);

        if (response.ok) {
            this.devices = response.result;
        } else {
            this.toast.error('no devices found');
        };

        this.loading = false;
    };

    ngOnInit(): void {
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });

        this.list();
    };

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
    };
    
}