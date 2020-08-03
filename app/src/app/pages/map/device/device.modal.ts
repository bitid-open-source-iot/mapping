import * as moment from 'moment';
import { Input } from 'src/app/interfaces/input';
import { Device } from 'src/app/interfaces/device';
import { DataSocketService } from 'src/app/services/data-socket/data-socket.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit, Inject, Component, OnDestroy } from '@angular/core';

@Component({
    selector:       'app-device-modal',
    styleUrls:      ['./device.modal.scss'],
    templateUrl:    './device.modal.html'
})

export class DeviceModal implements OnInit, OnDestroy {

    constructor(private dialog: MatDialogRef<DeviceModal>, @Inject(MAT_DIALOG_DATA) public device: Device, private socket: DataSocketService) {};

    public priority:        Input[] = [];
    public expanded:        boolean;
    private subscriptions:  any     = {};

    public toggle() {
        const element = document.getElementById(this.dialog.id);
        this.expanded = !this.expanded;
        if (this.expanded) {
            element.classList.add('expanded')
        } else {
            element.classList.remove('expanded')
        };
    };

    ngOnInit(): void {
        this.priority = this.device.inputs.filter(input => input.priority);

        if (this.priority.length == 0 && this.device.inputs.length > 0) {
            this.priority = this.device.inputs.filter(input => !input.priority).slice(0, (3 - this.priority.length));
        };
        
        this.subscriptions.socket = this.socket.data.subscribe(device => {
            if (device.deviceId == this.device.deviceId) {
                this.device.inputs.map(input => {
                    device.data.map(data => {
                        if (input.inputId == data.inputId) {
                            if (input.type == 'analog') { 
                                input.value = parseFloat(data.value).toFixed(2);
                            } else if (input.type == 'digital') { 
                                input.value = data.value;
                            };
                        };
                    });
                });
                this.device.connection.last = new Date(device.date);
                if (typeof(this.device.signal) != 'undefined' && this.device.signal !== null) {
                    this.device.signal.value = device.signal;
                };
                if (typeof(this.device.battery) != 'undefined' && this.device.battery !== null) {
                    this.device.battery.value = device.battery;
                };
            };
        });

        setInterval(() => {
            if (this.device.connection.status == 1) {
                let last = new Date(this.device.connection.last).getTime();
                if (new Date(last).getFullYear() == 1970) {
                    this.device.lastcomms    = 'device not connected'
                    this.device.commsstatus  = 0;
                    return;
                } else {
                    let current = new Date().getTime();
                    let section;
                    let overflow;

                    switch(this.device.connection.timeout.unit) {
                        case(0): // Minute
                            overflow = this.device.connection.timeout.value * 60000;
                            break;
                        case(1): // Hour
                            overflow = this.device.connection.timeout.value * 3600000;
                            break;
                        case(2): // Day
                            overflow = this.device.connection.timeout.value * 86400000;
                            break;
                        case(3): // Week
                            overflow = this.device.connection.timeout.value * 604800000;
                            break;
                    };

                    section = Math.floor(overflow / 4);

                    if (current <= last + overflow) {
                        this.device.commsstatus   = 3;
                        this.device.lastcomms  = moment(last).fromNow();
                    } else {
                        let buffer: number = current - overflow;
                        if ((buffer - last) <= section) {
                            this.device.commsstatus   = 3;
                            this.device.lastcomms  = moment(last).fromNow();
                        } else if ((buffer - last) <= (section * 2)) {
                            this.device.commsstatus   = 2;
                            this.device.lastcomms  = moment(last).fromNow();
                        } else if ((buffer - last) <= (section * 3)) {
                            this.device.commsstatus   = 1;
                            this.device.lastcomms  = moment(last).fromNow();
                        } else {
                            this.device.commsstatus   = 0;
                            this.device.lastcomms  = 'device comms fail'
                        };
                    };
                };
            } else {
                this.device.lastcomms    = 'device not connected'
                this.device.commsstatus  = 0;
            };
        }, 1000);
    };

    ngOnDestroy(): void {
        this.subscriptions.socket.unsubscribe();
    };
    
}